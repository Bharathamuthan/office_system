const Task = require('../Model/taskmodel');
const taskSchema = require('../Validation/taskvalidation'); // Adjust path as necessary

const createTask = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create new task using validated data
    const task = new Task(value);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const updateTask = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update task using validated data
    const task = await Task.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  createTask,
  updateTask
};
