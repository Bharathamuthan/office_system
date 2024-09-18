const express = require('express');
 
const authcontroller = require('../Controller/authcontroller')
//const authendicate = require('../middleware/authendicate');
const router = express.Router();

// Route to create a new employee
router.post('/register', authcontroller.createUser);

// Route to get all employees
router.get('/', authcontroller.getAllUsers);

// Route to get a single employee by ID
router.get('/:id', authcontroller.getUserById);

// Route to update an employee by ID
router.put('/:id', authcontroller.updateUser);

// Route to delete an employee by ID
router.delete('/:id', authcontroller.deleteUser);

// Route to log in an employee
router.post('/login', authcontroller.loginUser);

module.exports = router;