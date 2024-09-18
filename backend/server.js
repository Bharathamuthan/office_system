const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();   
const jwt = require('jsonwebtoken');
const authRoutes = require('./Routes/auth');
const leaveRoutes = require('../backend/Routes/leave');
const taskRoutes = require('../backend/Routes/task');
const authMiddleware = require('../backend/middleware/authendicate');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, ) 
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use Routes
app.use('/officesystem',authRoutes)
app.use('/leave',  leaveRoutes);
app.use('/task',  taskRoutes); 

app.use('/protected-route', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});