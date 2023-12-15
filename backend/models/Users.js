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
  password: { type: String, required: true }, // Remember to hash passwords before storing them
  role: { 
    type: String, 
    required: true, 
    enum: ['Student', 'Mentor', 'Admin'] // Enum to enforce role values
  },
  bio: { type: String },
  profilePicture: { type: String },
  skills: [{ type: String }],
  interests: [{ type: String }],
  mentoringOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MentoringOpportunity' }],
});

const User = mongoose.model('Users', userSchema);

module.exports = User;










// //Here, will define the schema for users.
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }, // You should hash passwords before storing them
//   role: { type: String, required: true }, // Student, Mentor, Admin, etc.
//   bio: { type: String },
//   profilePicture: { type: String },
//   skills: [{ type: String }],
//   interests: [{ type: String }],
//   mentoringOpportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MentoringOpportunity' }],
// });


// // Create the User model
// const User = mongoose.model('Users', userSchema);

// module.exports = User;
