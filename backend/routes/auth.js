// All routes related to user registration and authentication are defined here
const { Router } = require('express');
const router = Router();

//import user controller
const { signupUser, loginUser, getUserProfile } = require('../controllers/authController');


// Route for user signup
router.post('/signup', signupUser);

// Route for user login
router.post('/login', loginUser);

// Route for user profile
router.get('/profile', getUserProfile);
router.get("/", (req, res) => res.send("Hello World"))

module.exports = router;
