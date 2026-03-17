const { TutorProfile, Course } = require('../models');

/**
 * Search and rank tutors
 * @param {Object} filters
 * @param {Object} options
 * @returns {Promise<Object>}
 */
const searchTutors = async (filters, options = { limit: 10, page: 1 }) => {
  const { limit, page } = options;
  const skip = (page - 1) * limit;

  // 1. Base match on TutorProfile
  const profileMatch = {};
  
  if (filters.city) {
    profileMatch.cities = { $regex: new RegExp(filters.city, 'i') };
  }
  
  // They must be verified to show up in search generally, unless looking for pending
  if (filters.verificationStatus) {
    profileMatch.verificationStatus = filters.verificationStatus;
  } else {
    profileMatch.verificationStatus = 'verified'; // Default to only verified tutors
  }

  // 2. Prepare pipeline
  const pipeline = [];

  // Match profiles first
  pipeline.push({ $match: profileMatch });

  // Lookup the actual User data (for name, etc)
  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'userData'
    }
  });
  pipeline.push({ $unwind: '$userData' });

  // Exclude blocked users
  pipeline.push({ $match: { 'userData.isBlocked': false } });

  // Lookup their courses
  pipeline.push({
    $lookup: {
      from: 'courses',
      localField: 'user',
      foreignField: 'tutor',
      as: 'courses'
    }
  });

  // If searching by subject, mode, or class, we need to filter out tutors who don't have matching courses
  if (filters.subject || filters.mode || filters.classOrGrade || filters.maxFee) {
    pipeline.push({
      $addFields: {
        matchingCourses: {
          $filter: {
            input: '$courses',
            as: 'course',
            cond: {
              $and: [
                { $eq: ['$$course.isDeleted', false] },
                filters.subject ? { $regexMatch: { input: '$$course.subject', regex: new RegExp(filters.subject, 'i') } } : true,
                filters.mode ? { $eq: ['$$course.mode', filters.mode] } : true,
                filters.classOrGrade ? { $regexMatch: { input: '$$course.classOrGrade', regex: new RegExp(filters.classOrGrade, 'i') } } : true,
                filters.maxFee ? { $lte: ['$$course.fee', parseInt(filters.maxFee)] } : true
              ]
            }
          }
        }
      }
    });

    // Only keep tutors that have at least one matching course
    pipeline.push({ $match: { 'matchingCourses.0': { $exists: true } } });
  }

  // Find minimum fee among their courses (used for ranking based on price)
  pipeline.push({
    $addFields: {
      minFee: {
        $min: {
          $map: {
            input: {
              $filter: {
                input: '$courses',
                as: 'c',
                cond: { $eq: ['$$c.isDeleted', false] }
              }
            },
            as: 'c',
            in: '$$c.fee'
          }
        }
      }
    }
  });

  // Calculate the ranking score
  // Formula weights:
  // Featured (Admin flag): +100 points
  // Rating (1-5): * 10 (Max 50 points)
  // Review Count: + (Count * 0.5) (Small boost for activity)
  // Verification: verified=+20 points
  // Price: Inverse relationship (cheaper gets slight boost) - just using a simple inverse proxy (1000/fee)
  pipeline.push({
    $addFields: {
      rankingScore: {
        $add: [
          { $cond: [{ $eq: ['$featured', true] }, 100, 0] },
          { $multiply: ['$rating', 10] },
          { $multiply: ['$reviewCount', 0.5] },
          { $cond: [{ $eq: ['$verificationStatus', 'verified'] }, 20, 0] },
          // Add a small boost for lower minimum fees (if minFee exists and > 0)
          { 
            $cond: [
              { $and: [{ $gt: ['$minFee', 0] }, { $ne: ['$minFee', null] }] },
              { $min: [{ $divide: [1000, '$minFee'] }, 15] }, // Cap price boost at 15 points
              0
            ]
          }
        ]
      }
    }
  });

  // Sort by ranking score descending
  pipeline.push({ $sort: { rankingScore: -1 } });

  // Pagination
  // We need to branch here to get both total count and paginated results
  const facetPipeline = [
    {
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: skip }, { $limit: parseInt(limit) }]
      }
    }
  ];

  pipeline.push(...facetPipeline);

  const result = await TutorProfile.aggregate(pipeline);

  const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
  const data = result[0].data;

  // Clean up output
  const formattedData = data.map(tutor => ({
    id: tutor._id,
    userId: tutor.userData._id,
    name: tutor.userData.name,
    email: tutor.userData.email,
    rating: tutor.rating,
    reviewCount: tutor.reviewCount,
    cities: tutor.cities,
    subjects: tutor.subjects,
    featured: tutor.featured,
    minFee: tutor.minFee,
    rankingScore: tutor.rankingScore, // Included for debugging/visibility
    coursesCount: tutor.courses.length
  }));

  return {
    results: formattedData,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
    totalResults: total
  };
};

module.exports = {
  searchTutors
};
