const express = require('express');
const taskController = require('../Controller/taskcontroller');
//const authenticate = require('../middleware/authendicate');

const router = express.Router();

router.post('/create',  taskController.createTask);
router.put('/update/:id',  taskController.updateTask);

module.exports = router;