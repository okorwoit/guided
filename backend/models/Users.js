//Here, will define the schema for users.
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // You should hash passwords before storing them
  role: { type: String, required: true }, // Student, Mentor, Admin, etc.
  bio: { type: String },
  profilePicture: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  mentoringOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MentoringOpportunity' }],
});


// Create the User model
const User = mongoose.model('Users', userSchema);

module.exports = User;
