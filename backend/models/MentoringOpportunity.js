// const mongoose = require('mongoose');
// const { Schema } = mongoose;
//
// const mentoringOpportunitySchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//   student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
//   duration: { type: Number, required: true },
//   status: { type: String, enum: ['open', 'closed'], default: 'open' },
// });
//
// // Create the MentoringOpportunity model
// const MentoringOpportunity = mongoose.model('MentoringOpportunity', mentoringOpportunitySchema);
//
// module.exports = MentoringOpportunity;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const mentoringOpportunitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  mentor: { type: String },
  student: { type: String },
  duration: { type: Number, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
});

// Create the MentoringOpportunity model
const MentoringOpportunity = mongoose.model('MentoringOpportunity', mentoringOpportunitySchema);

module.exports = MentoringOpportunity;
