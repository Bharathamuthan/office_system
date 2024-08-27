const express = require('express');
const taskController = require('../Controller/taskcontroller');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, taskController.createTask);
router.get('/tasks', authenticate, taskController.getTasks);

module.exports = router;
