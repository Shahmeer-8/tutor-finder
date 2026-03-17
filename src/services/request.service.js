const httpStatus = require('http-status');
const requestRepository = require('../repositories/request.repository');
const { Course } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

/**
 * Create a request (Student sends a request)
 * @param {Object} requestBody
 * @returns {Promise<Request>}
 */
const createRequest = async (requestBody) => {
  const { student, course: courseId } = requestBody;
  
  // Get course to know the subject
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // Set the tutor implicitly from the course
  requestBody.tutor = course.tutor;

  // Rule 1: Student can send max 3 requests per subject
  const activeRequests = await requestRepository.getStudentRequestsBySubject(student, course.subject);
  if (activeRequests.length >= 3) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Maximum limit of 3 requests reached for subject: ${course.subject}`);
  }

  // Ensure student isn't requesting the same course twice while pending/trial
  const alreadyRequested = activeRequests.some(req => req.course._id.toString() === courseId.toString());
  if (alreadyRequested) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have already sent a request for this specific course');
  }

  return requestRepository.createRequest(requestBody);
};

/**
 * Update a request (Only before approval)
 * @param {ObjectId} requestId
 * @param {Object} updateBody
 * @param {ObjectId} userId (To ensure only the student who created it can update it)
 * @returns {Promise<Request>}
 */
const updateRequest = async (requestId, updateBody, userId) => {
  const request = await requestRepository.getRequestById(requestId);
  
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }

  // Rule 6: Student can update/delete request only before approval (status === 'pending')
  if (request.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot update a request that has already been processed');
  }

  if (request.student._id.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to update this request');
  }

  // Only allow updating message
  const allowedUpdates = { message: updateBody.message };

  return requestRepository.updateRequestById(requestId, allowedUpdates);
};

/**
 * Delete a request (Only before approval)
 * @param {ObjectId} requestId
 * @param {ObjectId} userId
 * @returns {Promise<Request>}
 */
const deleteRequest = async (requestId, userId) => {
  const request = await requestRepository.getRequestById(requestId);
  
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }

  // Rule 6: Only before approval
  if (request.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot delete a request that has already been processed');
  }

  if (request.student._id.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to delete this request');
  }

  return requestRepository.deleteRequestById(requestId);
};

/**
 * Tutor approves a request
 * @param {ObjectId} requestId
 * @param {ObjectId} tutorId
 * @returns {Promise<Request>}
 */
const approveRequest = async (requestId, tutorId) => {
  const request = await requestRepository.getRequestById(requestId);
  
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }

  if (request.tutor._id.toString() !== tutorId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to approve this request');
  }

  if (request.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, `Cannot approve a request with status: ${request.status}`);
  }

  // Rule 4: Trial Starts when tutor approves. Lasts exactly 48 hours.
  const trialStartDate = moment().toDate();
  const trialEndDate = moment().add(48, 'hours').toDate();

  const updatedRequest = await requestRepository.updateRequestById(requestId, {
    status: 'trial', // pending -> trial (approving initiates trial)
    trialStartDate,
    trialEndDate
  });

  // Rule 2: When one tutor approves, other requests for the same subject are auto-rejected
  await requestRepository.rejectOtherRequests(request.student._id, request.course.subject, requestId);

  return updatedRequest;
};

/**
 * Tutor rejects a request
 * @param {ObjectId} requestId
 * @param {ObjectId} tutorId
 * @returns {Promise<Request>}
 */
const rejectRequest = async (requestId, tutorId) => {
  const request = await requestRepository.getRequestById(requestId);
  
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }

  if (request.tutor._id.toString() !== tutorId.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to reject this request');
  }

  if (request.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending requests can be rejected');
  }

  return requestRepository.updateRequestById(requestId, { status: 'rejected' });
};

/**
 * Complete a trial (Move to payment phase)
 * This could be called by a cron job or manually
 * @param {ObjectId} requestId
 * @returns {Promise<Request>}
 */
const completeTrial = async (requestId) => {
  const request = await requestRepository.getRequestById(requestId);
  
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }

  if (request.status !== 'trial') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Request is not in trial phase');
  }

  // Rule 4: After expiry, move to payment phase (status 'completed' means trial complete, ready for payment)
  return requestRepository.updateRequestById(requestId, { status: 'completed' });
};

module.exports = {
  createRequest,
  updateRequest,
  deleteRequest,
  approveRequest,
  rejectRequest,
  completeTrial
};
