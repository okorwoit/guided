const express = require('express');
const router = express.Router();

// Import the User model
// const User = require('../models/Users');

// Import the MentoringOpportunity model
// const MentoringOpportunity = require('../models/MentoringOpportunity');

// Import the admin controller 
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

// Import the mentoring controller
const {
  getAllMentoringOpportunities,
  getMentoringOpportunityById,
  createMentoringOpportunity,
  updateMentoringOpportunity,
  deleteMentoringOpportunity,
} = require('../controllers/mentoringController');

// Add a user
router.post('/', createUser);

// View all users
router.get('/', getAllUsers); 

// Modify a user
router.patch('/:userId', updateUser); 

// Delete a user
router.delete('/:userId', deleteUser); 

// View all mentoring opportunities
router.get('/', getAllMentoringOpportunities); 

// View a specific mentoring opportunity
router.get('/:opportunityId', getMentoringOpportunityById);

// Add a mentoring opportunity
router.post('/', createMentoringOpportunity); 

// Route to modify a mentoring opportunity
router.patch('/:opportunityId', updateMentoringOpportunity);

// Delete a mentoring opportunity
router.delete('/:opportunityId', deleteMentoringOpportunity); 

module.exports = router;
