const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tutorService } = require('../services');

const searchTutors = catchAsync(async (req, res) => {
  const filters = {
    city: req.query.city,
    subject: req.query.subject,
    mode: req.query.mode,
    classOrGrade: req.query.classOrGrade,
    maxFee: req.query.maxFee,
    verificationStatus: req.query.verificationStatus
  };

  const options = {
    limit: req.query.limit ? parseInt(req.query.limit) : 10,
    page: req.query.page ? parseInt(req.query.page) : 1
  };

  const result = await tutorService.searchTutors(filters, options);
  res.status(httpStatus.OK).send(result);
});

module.exports = {
  searchTutors
};
