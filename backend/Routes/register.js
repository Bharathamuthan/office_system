const express = require('express');
 
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser } = 
require('../Controller/registercontroller');
const router = express.Router();

// Route to create a new employee
router.post('/register', createUser);

// Route to get all employees
router.get('/', getAllUsers);

// Route to get a single employee by ID
router.get('/:id', getUserById);

// Route to update an employee by ID
router.put('/:id', updateUser);

// Route to delete an employee by ID
router.delete('/:id', deleteUser);

// Route to log in an employee
router.post('/login', loginUser);

module.exports = router;
