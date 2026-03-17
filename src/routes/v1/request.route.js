const express = require('express');
const auth = require('../../middlewares/auth');
const requestController = require('../../controllers/request.controller');

const router = express.Router();

// Routes for Students
router.post('/', auth('student'), requestController.createRequest);
router.patch('/:requestId', auth('student'), requestController.updateRequest);
router.delete('/:requestId', auth('student'), requestController.deleteRequest);

// Routes for Tutors
router.patch('/:requestId/approve', auth('tutor'), requestController.approveRequest);
router.patch('/:requestId/reject', auth('tutor'), requestController.rejectRequest);

// General Routes
router.get('/', auth(), requestController.getMyRequests);
router.get('/:requestId', auth(), requestController.getRequest);

module.exports = router;
