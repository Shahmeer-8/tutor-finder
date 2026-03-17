const { Request } = require('../models');

/**
 * Create a request
 * @param {Object} requestBody
 * @returns {Promise<Request>}
 */
const createRequest = async (requestBody) => {
  return Request.create(requestBody);
};

/**
 * Get request by id
 * @param {ObjectId} id
 * @returns {Promise<Request>}
 */
const getRequestById = async (id) => {
  return Request.findById(id).populate('course tutor student');
};

/**
 * Update request by id
 * @param {ObjectId} requestId
 * @param {Object} updateBody
 * @returns {Promise<Request>}
 */
const updateRequestById = async (requestId, updateBody) => {
  const request = await Request.findById(requestId);
  if (!request) {
    return null;
  }
  Object.assign(request, updateBody);
  await request.save();
  return request;
};

/**
 * Delete request by id
 * @param {ObjectId} requestId
 * @returns {Promise<Request>}
 */
const deleteRequestById = async (requestId) => {
  const request = await Request.findById(requestId);
  if (!request) {
    return null;
  }
  await request.deleteOne();
  return request;
};

/**
 * Get all requests for a student
 * @param {ObjectId} studentId
 * @returns {Promise<Array<Request>>}
 */
const getRequestsByStudent = async (studentId) => {
  return Request.find({ student: studentId }).populate('course tutor');
};

/**
 * Get all requests for a tutor
 * @param {ObjectId} tutorId
 * @returns {Promise<Array<Request>>}
 */
const getRequestsByTutor = async (tutorId) => {
  return Request.find({ tutor: tutorId }).populate('course student');
};

/**
 * Find requests by student and subject (through course)
 * @param {ObjectId} studentId
 * @param {string} subject
 * @returns {Promise<Array<Request>>}
 */
const getStudentRequestsBySubject = async (studentId, subject) => {
  // First find requests by student, then filter by course subject
  const requests = await Request.find({ student: studentId, status: { $in: ['pending', 'approved', 'trial'] } })
    .populate({
      path: 'course',
      match: { subject: { $regex: new RegExp(`^${subject}$`, 'i') } }
    });
  
  // Filter out requests where course didn't match the subject
  return requests.filter(req => req.course !== null);
};

/**
 * Reject other pending requests for the same student and subject
 * @param {ObjectId} studentId
 * @param {string} subject
 * @param {ObjectId} excludeRequestId
 */
const rejectOtherRequests = async (studentId, subject, excludeRequestId) => {
  const requestsToReject = await getStudentRequestsBySubject(studentId, subject);
  
  const idsToReject = requestsToReject
    .filter(req => req._id.toString() !== excludeRequestId.toString() && req.status === 'pending')
    .map(req => req._id);

  if (idsToReject.length > 0) {
    await Request.updateMany(
      { _id: { $in: idsToReject } },
      { $set: { status: 'rejected' } }
    );
  }
};

module.exports = {
  createRequest,
  getRequestById,
  updateRequestById,
  deleteRequestById,
  getRequestsByStudent,
  getRequestsByTutor,
  getStudentRequestsBySubject,
  rejectOtherRequests
};
