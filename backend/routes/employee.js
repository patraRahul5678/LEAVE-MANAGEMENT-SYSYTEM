const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Leave = require('../models/Leave');

// Apply for leave (employee)
router.post('/leave/apply', auth('employee'), async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    if (!startDate || !endDate) return res.status(400).json({ msg: 'Start and end date required' });
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return res.status(400).json({ msg: 'End date must be after start date' });

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const employee = req.user; // set in auth
    if (!employee.joiningDate) return res.status(400).json({ msg: 'Joining date not set for employee' });
    if (start < new Date(employee.joiningDate)) return res.status(400).json({ msg: 'Cannot apply for leave before joining date' });
    if (days > employee.leaveBalance) return res.status(400).json({ msg: 'Not enough leave balance' });

    // Check overlapping leaves for this employee (pending or approved)
    const overlap = await Leave.findOne({ employeeId: employee._id, status: { $in: ['pending','approved'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });
    if (overlap) return res.status(400).json({ msg: 'Overlapping leave exists' });

    const leave = new Leave({ employeeId: employee._id, startDate: start, endDate: end, reason, days });
    await leave.save();
    res.json(leave);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get my leaves
router.get('/leave/my', auth('employee'), async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get my balance
router.get('/leave/balance', auth('employee'), async (req, res) => {
  res.json({ leaveBalance: req.user.leaveBalance });
});

module.exports = router;
