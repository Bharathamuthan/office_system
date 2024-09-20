
const Task = require('../Model/taskmodel');
const taskSchema = require('../Validation/taskvalidation');
 
const createTask = async (req, res) => {
  try {
    
    const { error, value } = taskSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task(value);
    await task.save();
    res.status(201).json({ message: 'create the task successful',task});
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// const updateTask = async (req, res) => { 
//   try {
//     // Validate request body using Joi
//     const { error, value } = taskSchema.validate(req.body);
//     // console.log('Validation Error:', error.details[0].message);
//     if (error) return res.status(400).send(error.details[0].message);

//     // console.log('Task ID:', req.params.id);
//     // console.log('Validated Data:', value);

//     // Update task using validated data
//     const task = await Task.findByIdAndUpdate(req.params.id, value, { new: true });
//     // console.log('Task not found for ID:', req.params.id);
//     if (!task) return res.status(404).send('Task not found');
//     res.json(task);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };
const updateTask = async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Validation Error', details: error.details[0].message });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, value, { new: true });

    if (!task) {
      // If task not found, return 404
      return res.status(404).json({ message: 'Task not found' });
    }

    // Send updated task as JSON response
    res.json({ message: 'Update successful', task });
  } catch (err) {
    // Catch any other errors and return 500
    res.status(500).json({ message: 'Update Failed', error: err.message });
  }
};

module.exports = {
  createTask,
  updateTask
};