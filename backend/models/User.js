const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Not required for login, only for signup
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false, // Optional but helpful for reset
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
