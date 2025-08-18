const mongoose = require('mongoose');

const TutorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subjects: [{ type: String, required: true }], // Current assigned subjects
  originalSubjects: [{ type: String, required: true }], // Original subjects from application
  description: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tutor', TutorSchema);