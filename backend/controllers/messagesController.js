const Message = require('../models/Messages')

// Controller function to send a message
const sendMessage = async (req, res) => {
    const { sender, recipient, content } = req.body;
  
    try {
      // Create new message
      const message = new Message({ sender, recipient, content });
      await message.save();
  
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Controller function to retrieve messages
const retrieveMessages = async (req, res) => {
    const { sender, recipient } = req.query;
  
    try {
      // Find messages by sender and recipient
      const messages = await Message.find({ sender, recipient });
  
      res.status(200).json({ messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
  sendMessage,
  retrieveMessages,
};