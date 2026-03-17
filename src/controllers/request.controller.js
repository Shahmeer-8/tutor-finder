const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { requestService } = require('../services');
const requestRepository = require('../repositories/request.repository');

const createRequest = catchAsync(async (req, res) => {
  const requestBody = {
    ...req.body,
    student: req.user._id,
  };
  const request = await requestService.createRequest(requestBody);
  res.status(httpStatus.CREATED).send({ request });
});

const getMyRequests = catchAsync(async (req, res) => {
  let requests = [];
  if (req.user.role === 'student') {
    requests = await requestRepository.getRequestsByStudent(req.user._id);
  } else if (req.user.role === 'tutor') {
    requests = await requestRepository.getRequestsByTutor(req.user._id);
  }
  res.send({ requests });
});

const getRequest = catchAsync(async (req, res) => {
  const request = await requestRepository.getRequestById(req.params.requestId);
  if (!request) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'Request not found' });
    return;
  }
  // Optional: check if the user is authorized to view this request (must be the student or tutor)
  if (request.student._id.toString() !== req.user._id.toString() && request.tutor._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(httpStatus.FORBIDDEN).send({ message: 'Forbidden' });
    return;
  }
  res.send({ request });
});

const updateRequest = catchAsync(async (req, res) => {
  const request = await requestService.updateRequest(req.params.requestId, req.body, req.user._id);
  res.send({ request });
});

const deleteRequest = catchAsync(async (req, res) => {
  await requestService.deleteRequest(req.params.requestId, req.user._id);
  res.status(httpStatus.NO_CONTENT).send();
});

const approveRequest = catchAsync(async (req, res) => {
  const request = await requestService.approveRequest(req.params.requestId, req.user._id);
  res.send({ request });
});

const rejectRequest = catchAsync(async (req, res) => {
  const request = await requestService.rejectRequest(req.params.requestId, req.user._id);
  res.send({ request });
});

module.exports = {
  createRequest,
  getMyRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  approveRequest,
  rejectRequest
};
