const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  reason: { 
    type: String,
    required: true 
  },
  date: { 
    type: Date,
    required: true 
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

