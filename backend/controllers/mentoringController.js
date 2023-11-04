// Here, we will handle all mentoring-related functionalities
// Import necessary models 
const MentoringOpportunity = require('../models/MentoringOpportunity')

// Controller function to create a mentoring opportunity
const createMentoringOpportunity = async (req, res) => {
  const { title, description, category, mentor, student, duration } = req.body;

  try {
    // Create new mentoring opportunity
    const mentoringOpportunity = new MentoringOpportunity({ title, description, category, mentor, student, duration });
    await mentoringOpportunity.save();

    res.status(201).json({ message: 'Mentoring opportunity created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Controller function to update a mentoring opportunity
const updateMentoringOpportunity = async (req, res) => {
  const mentoringOpportunityId = req.params.opportunityId;
  const { title, description, date, duration, status } = req.body;

  try {
    // Find mentoring opportunity by ID
    const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
    if (!mentoringOpportunity) {
      return res.status(404).json({ message: 'Mentoring opportunity not found' });
    }

    // Update mentoring opportunity fields
    mentoringOpportunity.title = title || mentoringOpportunity.title;
    mentoringOpportunity.description = description || mentoringOpportunity.description;
    mentoringOpportunity.date = date || mentoringOpportunity.date;
    mentoringOpportunity.duration = duration || mentoringOpportunity.duration;
    mentoringOpportunity.status = status || mentoringOpportunity.status;

    await mentoringOpportunity.save();

    res.status(200).json({ message: 'Mentoring opportunity updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to delete a mentoring opportunity
// const deleteMentoringOpportunity = async (req, res) => {
//   const mentoringOpportunityId = req.params.opportunityId;
//
//   try {
//     // Find mentoring opportunity by ID
//     const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
//     if (!mentoringOpportunity) {
//       return res.status(404).json({ message: 'Mentoring opportunity not found' });
//     }
//
//     // Delete mentoring opportunity
//     await mentoringOpportunity.remove();
//
//     res.status(200).json({ message: 'Mentoring opportunity deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const deleteMentoringOpportunity = async (req, res) => {
  const mentoringOpportunityId = req.params.opportunityId;

  try {
    // Find mentoring opportunity by ID
    const mentoringOpportunity = await MentoringOpportunity.findById(mentoringOpportunityId);
    if (!mentoringOpportunity) {
      return res.status(404).json({ message: 'Mentoring opportunity not found' });
    }

    // Delete mentoring opportunity using deleteOne
    const result = await mentoringOpportunity.deleteOne();
    if (result.ok === 1) {
      res.status(200).json({ message: 'Mentoring opportunity deleted successfully' });
    } else {
      throw new Error('Failed to delete mentoring opportunity');
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = {
  deleteMentoringOpportunity
};


// Controller function to get all mentoring opportunities
const getAllMentoringOpportunities = async (req, res) => {
  try {
    // Find all mentoring opportunities
    const mentoringOpportunities = await MentoringOpportunity.find();
    console.log(mentoringOpportunities)

    res.status(200).json({ mentoringOpportunities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get a specific mentoring opportunity by ID
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

module.exports = {
  createMentoringOpportunity,
  updateMentoringOpportunity,
  deleteMentoringOpportunity,
  getAllMentoringOpportunities,
  getMentoringOpportunityById,
};
