const tutorRepository = require('../repositories/tutor.repository');

/**
 * Search and rank tutors
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const searchTutors = async (filter, options) => {
  return tutorRepository.searchTutors(filter, options);
};

module.exports = {
  searchTutors
};
