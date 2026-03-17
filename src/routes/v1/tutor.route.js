const express = require('express');
const { tutorController } = require('../../controllers');

const router = express.Router();

router.get('/search', tutorController.searchTutors);

module.exports = router;
