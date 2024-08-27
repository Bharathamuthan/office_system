const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true // Ensures that userId is provided
  },
  reason: { 
    type: String,
    required: true // Ensures that reason is provided
  },
  date: { 
    type: Date,
    required: true // Ensures that date is provided
  },
  description: String,
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending'
  },
  adminComment: String
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Add indexes for commonly queried fields
leaveRequestSchema.index({ userId: 1 });
leaveRequestSchema.index({ status: 1 });

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);

