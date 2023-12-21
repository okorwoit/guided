const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ // Simple regex to validate email format
  },
  password: { type: String, required: true }, // Hash passwords before storing them
  role: { 
    type: String, 
    required: true, 
    enum: ['Student', 'Mentor', 'Admin'] // Enum to enforce role values
  },
  bio: { type: String },
  profilePicture: { type: String },
  expertise: { type: String },
  interests: [{ type: String }],
  mentoringOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MentoringOpportunity' }],
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
