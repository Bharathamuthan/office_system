const express = require('express');
const leaveController = require('../Controller/leavecontroller');
const authenticate = require('../middleware/authendicate');

const router = express.Router();

router.post('/request', authenticate, leaveController.requestLeave);
router.get('/requests', authenticate, leaveController.getRequests);
router.post('/approve/:id', authenticate, leaveController.approveRequest);
router.post('/reject/:id', authenticate, leaveController.rejectRequest);

module.exports = router;
