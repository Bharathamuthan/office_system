const express = require('express');
 
const registercontroller = require('../Controller/registercontroller')
//const authendicate = require('../middleware/authendicate');
const router = express.Router();

// Route to create a new employee
router.post('/user', registercontroller.createUser);

// Route to get all employees
router.get('/', registercontroller.getAllUsers);

// Route to get a single employee by ID
router.get('/:id', registercontroller.getUserById);

// Route to update an employee by ID
router.put('/:id', registercontroller.updateUser);

// Route to delete an employee by ID
router.delete('/:id', registercontroller.deleteUser);

// Route to log in an employee
router.post('/login', registercontroller.loginUser);

module.exports = router;