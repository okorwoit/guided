// Import necessary data models (e.g., User and MentoringOpportunity models)
const User = require('../models/Users'); 
const MentoringOpportunity = require('../models/MentoringOpportunity'); 


// Function to add a user (admin)
const createUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
  
    try {
      // Check if user with email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with email already exists' });
      }
  
      // Create new user
      const user = new User({ firstName, lastName, email, password, role });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Function to view all users (admin)
const getAllUsers = async (req, res) => {
    try {
      // Find all users
      const users = await User.find();
  
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to modify a user (admin)
  const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
  
      await user.save();
  
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to delete a user (admin)
  const deleteUser = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete user
      await user.remove();
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to view all mentoring opportunities (users)
  const getAllMentoringOpportunities = async (req, res) => {
    try {
      // Find all mentoring opportunities
      const mentoringOpportunities = await MentoringOpportunity.find();
  
      res.status(200).json({ mentoringOpportunities });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  // Function to view a specific mentoring opportunity (users)
  const getMentoringOpportunityById = async (req, res) => {
    const mentoringOpportunityId = req.params.id;
  
    try {
      // Find mentoring opportunity by ID
      const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
      if (!mentoringOpportunity) {
        return res.status(404).json({ message: 'Mentoring opportunity not found' });
      }
  
      res.status(200).json({ mentoringOpportunity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to add a mentoring opportunity (users)
  const createMentoringOpportunity = async (req, res) => {
    const { title, description, mentor, mentee } = req.body;
  
    try {
      // Create new mentoring opportunity
      const mentoringOpportunity = new MentoringOpportunity({ title, description, mentor, mentee });
      await mentoringOpportunity.save();
  
      res.status(201).json({ message: 'Mentoring opportunity created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to modify a mentoring opportunity (users)
  const updateMentoringOpportunity = async (req, res) => {
    const mentoringOpportunityId = req.params.id;
    const { title, description, mentor, mentee } = req.body;
  
    try {
      // Find mentoring opportunity by ID
      const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
      if (!mentoringOpportunity) {
        return res.status(404).json({ message: 'Mentoring opportunity not found' });
      }
  
      // Update mentoring opportunity fields
      mentoringOpportunity.title = title || mentoringOpportunity.title;
      mentoringOpportunity.description = description || mentoringOpportunity.description;
      mentoringOpportunity.mentor = mentor || mentoringOpportunity.mentor;
      mentoringOpportunity.mentee = mentee || mentoringOpportunity.mentee;
  
      await mentoringOpportunity.save();
  
      res.status(200).json({ message: 'Mentoring opportunity updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Function to delete a mentoring opportunity (users)
  const deleteMentoringOpportunity = async (req, res) => {
    const mentoringOpportunityId = req.params.id;
  
    try {
      // Find mentoring opportunity by ID
      const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
      if (!mentoringOpportunity) {
        return res.status(404).json({ message: 'Mentoring opportunity not found' });
      }
  
      // Delete mentoring opportunity
      await mentoringOpportunity.remove();
  
      res.status(200).json({ message: 'Mentoring opportunity deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllMentoringOpportunities,
    getMentoringOpportunityById,
    createMentoringOpportunity,
    updateMentoringOpportunity,
    deleteMentoringOpportunity,
  };
  