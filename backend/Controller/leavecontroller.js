const LeaveRequest = require('../Model/leavemodel');
const { leaveRequestSchema, requestIdSchema } = require('../validation');

const requestLeave = async (req, res) => {
  try {
    // Validate request body
    const { error } = leaveRequestSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { reason, date, description } = req.body;
    const leaveRequest = new LeaveRequest({
      userId: req.user.userId,
      reason,
      date,
      description
    });
    await leaveRequest.save(); 
    res.status(201).send('Leave request sent');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getRequests = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    const requests = await LeaveRequest.find().populate('userId', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const approveRequest = async (req, res) => {
  try {
    // Validate request parameters
    const { error } = requestIdSchema.validate({ id: req.params.id });
    if (error) return res.status(400).send(error.details[0].message);

    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(leaveRequest);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const rejectRequest = async (req, res) => {
  try {
    // Validate request parameters
    const { error } = requestIdSchema.validate({ id: req.params.id });
    if (error) return res.status(400).send(error.details[0].message);

    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(leaveRequest);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  requestLeave,
  getRequests,
  approveRequest,
  rejectRequest
};
