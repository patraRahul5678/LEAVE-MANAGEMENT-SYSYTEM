const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  department: { type: String },
  joiningDate: { type: Date },
  leaveBalance: { type: Number, default: 20 }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
