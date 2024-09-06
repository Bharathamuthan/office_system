const express = require('express');
const leaveController = require('../Controller/leavecontroller');
//const authenticate = require('../middleware/authendicate');

const router = express.Router();

router.post('/request',  leaveController.requestLeave);
router.get('/requests',  leaveController.getRequests);
router.post('/approve/:id',  leaveController.approveRequest);
router.post('/reject/:id',  leaveController.rejectRequest);

module.exports = router;
