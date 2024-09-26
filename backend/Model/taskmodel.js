const mongoose = require('mongoose');
// Mongoose Task schema definition
const taskSchema = new mongoose.Schema(
  {
    adminid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Ensures that adminId is provided
    },
    title: {
      type: String,
      required: true, // Ensures that title is provided
      trim: true, // Removes leading and trailing whitespace
    },
    description: {
      type: String,
      trim: true, // Removes leading and trailing whitespace
    },
    assignedto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['not started', 'in progress', 'completed'],
      default: 'not started',
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Add indexes for commonly queried fields
taskSchema.index({ adminId: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
    
module.exports = mongoose.model('Task', taskSchema);