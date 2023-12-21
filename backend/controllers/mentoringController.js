const MentoringOpportunity = require('../models/MentoringOpportunity')

const createMentoringOpportunity = async (req, res, next) => {
  const { title, description, category, mentor, student, duration } = req.body;

  try {
    const mentoringOpportunity = new MentoringOpportunity({ title, description, category, mentor, student, duration });
    await mentoringOpportunity.save();

    res.status(201).json({ message: 'Mentoring opportunity created successfully' });
  } catch (error) {
    next(error);
  }
};

const updateMentoringOpportunity = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, date, duration, status, mentor, student } = req.body;

  try {
    console.log("IIIIII", id)
    const mentoringOpportunity = await MentoringOpportunity.findById(id);
    if (!mentoringOpportunity) {
      return res.status(404).json({ message: 'Mentoring opportunity not found' });
    }

    mentoringOpportunity.title = title || mentoringOpportunity.title;
    mentoringOpportunity.description = description || mentoringOpportunity.description;
    mentoringOpportunity.date = date || mentoringOpportunity.date;
    mentoringOpportunity.duration = duration || mentoringOpportunity.duration;
    mentoringOpportunity.status = status || mentoringOpportunity.status;

    mentoringOpportunity.mentor = mentor || mentoringOpportunity.mentor;


    await mentoringOpportunity.save();

    res.status(200).json({ message: 'Mentoring opportunity updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteMentoringOpportunity = async (req, res) => {
  const { id } = req.params;

  try {
    const mentoringOpportunity = await MentoringOpportunity.findById(id);
    if (!mentoringOpportunity) {
      return res.status(404).json({ message: 'Mentoring opportunity not found' });
    }

    const result = await mentoringOpportunity.deleteOne();
    res.status(200).json({ message: 'Mentoring opportunity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllMentoringOpportunities = async (req, res, next) => {
  try {
    // Find all mentoring opportunities
    const mentoringOpportunities = await MentoringOpportunity.find();

    res.status(200).json({ mentoringOpportunities });
  } catch (error) {
    next(error);
  }
};

const getMentoringOpportunityById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find mentoring opportunity by ID
    const mentoringOpportunity = await MentoringOpportunity.findById(id);
    if (!mentoringOpportunity) {
      return res.status(404).json({ message: 'Mentoring opportunity not found' });
    }

    res.status(200).json({ mentoringOpportunity });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMentoringOpportunity,
  updateMentoringOpportunity,
  deleteMentoringOpportunity,
  getAllMentoringOpportunities,
  getMentoringOpportunityById,
};
