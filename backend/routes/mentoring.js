// All routes related to managing mentoring opportunities,such as creating, updating, and deleting them, are defined here
const { Router } = require('express');
const router = Router();

// Import the MentoringOpportunity model
const MentoringOpportunity = require('../models/MentoringOpportunity');

// Import the mentoring controller 
const {
  createMentoringOpportunity,
  updateMentoringOpportunity,
  deleteMentoringOpportunity,
  getAllMentoringOpportunities,
  getMentoringOpportunityById,
} = require('../controllers/mentoringController');

// Route to create a mentoring opportunity
router.post('/create', createMentoringOpportunity);

// Route to update a mentoring opportunity
router.patch('/:opportunityId', updateMentoringOpportunity);

// Route to delete a mentoring opportunity
router.delete('/:opportunityId', deleteMentoringOpportunity);

// Route to get all mentoring opportunities
router.get('/', getAllMentoringOpportunities);

// Route to get a specific mentoring opportunity by ID
router.get('/:opportunityId', getMentoringOpportunityById);

module.exports = router;
