const { Router } = require('express');
const router = Router();

// Import the communication controller
const {
  sendMessage,
  retrieveMessages,
  retrieveConversation,
} = require('../controllers/messagesController');

// Route to send a message
router.post('/', sendMessage);

// Route to retrieve all messages
router.get('/', retrieveMessages);

// Route to retrieve all messages between two users
router.get('/conversation', retrieveConversation);

module.exports = router;










// const { Router } = require('express');
// const router = Router();

// // Import the Message model
// // const Message = require('../models/Messages');

// // Import the communication controller
// const {
//   sendMessage,
//   retrieveMessages,
// } = require('../controllers/messagesController');

// // Route to send a message
// router.post('/', sendMessage);

// // Route to retrieve messages
// router.get('/', retrieveMessages);

// module.exports = router;