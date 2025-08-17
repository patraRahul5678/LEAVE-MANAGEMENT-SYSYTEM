const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Leave = require('../models/Leave');

// Add employee (admin)
router.post('/employee/add', auth('admin'), async (req, res) => {
  try {
    const { name, email, department, joiningDate, leaveBalance = 20, password = 'password123' } = req.body;
    if (!name || !email || !joiningDate) return res.status(400).json({ msg: 'name, email, joiningDate required' });
    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User with this email exists' });
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = new User({ name, email, department, joiningDate, leaveBalance, password: hashed, role: 'employee' });
    await user.save();
    res.json({ msg: 'Employee added', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List employees
router.get('/employees', auth('admin'), async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password').sort({ name: 1 });
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List pending leaves
router.get('/leaves/pending', auth('admin'), async (req, res) => {
  try {
    const leaves = await Leave.find({ status: 'pending' }).populate('employeeId', 'name email department joiningDate');
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Approve leave
router.put('/leave/:id/approve', auth('admin'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });
    if (leave.status !== 'pending') return res.status(400).json({ msg: 'Leave already processed' });
    const employee = await User.findById(leave.employeeId);
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });
    if (employee.leaveBalance < leave.days) return res.status(400).json({ msg: 'Employee does not have enough balance' });
    employee.leaveBalance -= leave.days;
    await employee.save();
    leave.status = 'approved';
    await leave.save();
    res.json({ msg: 'Leave approved', leave });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Reject leave
router.put('/leave/:id/reject', auth('admin'), async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ msg: 'Leave not found' });
    if (leave.status !== 'pending') return res.status(400).json({ msg: 'Leave already processed' });
    leave.status = 'rejected';
    await leave.save();
    res.json({ msg: 'Leave rejected', leave });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
