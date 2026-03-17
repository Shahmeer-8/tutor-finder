const express = require('express');
const auth = require('../../middlewares/auth');
const { reviewController } = require('../../controllers');

const router = express.Router();

// Get reviews for a specific tutor (publicly accessible or just logged in users)
router.get('/tutor/:tutorId', reviewController.getTutorReviews);

// Add a review (must be an authenticated student)
router.post('/', auth('student'), reviewController.addReview);

module.exports = router;
