const express = require('express');
const taskController = require('../Controller/taskcontroller');
//const authenticate = require('../middleware/authendicate');

const router = express.Router();

router.post('/create',  taskController.createTask);
router.get('/tasks',  taskController.getTasks);

module.exports = router;