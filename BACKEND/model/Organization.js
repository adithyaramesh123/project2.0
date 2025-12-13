const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String },
  password: { type: String },
  location: { type: String },
  status: { type: String, enum: ['Pending', 'Active', 'Inactive'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Organization', organizationSchema);
