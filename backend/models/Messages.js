const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;