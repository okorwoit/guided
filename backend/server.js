// Initialize the Express framework and configure routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mentoringRoutes = require("./routes/mentoring");

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173", 'https://cron-job.org']
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || origin == undefined) {
            callback(null, true)
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


app.use(cors(corsOptions));

//Set up middleware to handle different kinds of requests
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/mentoring", mentoringRoutes);


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


