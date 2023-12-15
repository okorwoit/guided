const express = require('express');
const router = express.Router();


// Import the admin controller 
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getMentors,
  getStudents
} = require('../controllers/usersController');

// Import the mentoring controller
const {
  getAllMentoringOpportunities,
  getMentoringOpportunityById,
  createMentoringOpportunity,
  updateMentoringOpportunity,
  deleteMentoringOpportunity,
} = require('../controllers/mentoringController');


// ****************** Admin routes ****************** //

// Add a user
router.post('/', createUser);

// View all users
router.get('/', getAllUsers); 

// Modify a user
router.put('/:id', updateUser); 

// Delete a user
router.delete('/:id', deleteUser); 



// View all mentors and students
router.get('/mentors', getMentors);
router.get('/students', getStudents);

// ****************** Mentoring routes ****************** //


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
