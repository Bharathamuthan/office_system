const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const registerRoutes = require('../backend/Routes/register')
const leaveRoutes = require('../backend/Routes/leave');
const taskRoutes = require('../backend/Routes/task');
const authenticate = require('../backend/middleware/authenticate');

const app = express();
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Use Routes
app.use('/register',authenticate, registerRoutes)
app.use('/leave', authenticate, leaveRoutes);
app.use('/task', authenticate, taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
