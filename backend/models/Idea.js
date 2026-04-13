const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for now since frontend might not be strictly passing headers yet
  },
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  analysis: {
    type: Object, // We will store the entire JSON response from Gemini here
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Idea', ideaSchema);
