const Task = require('../Model/taskmodel');


const createTask = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    const { title, description, assignedTo } = req.body;
    const task = new Task({
      adminId: req.user.userId,
      title,
      description,
      assignedTo
    });
    await task.save();
    res.status(201).send('Task created');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('adminId', 'name').populate('assignedTo', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(400).send(err.message);
  }  
};
module.exports = {
    createTask,
    getTasks 
}
