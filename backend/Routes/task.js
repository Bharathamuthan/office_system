const express = require('express');
const taskController = require('../Controller/taskcontroller');


const router = express.Router();

router.post('/create',  taskController.createTask);
router.get('/tasks',  taskController.updateTask);

module.exports = router;