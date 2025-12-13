const mongoose = require('mongoose');

const requestItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const organizationRequestSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  items: { type: [requestItemSchema], default: [] },
  status: { type: String, enum: ['Pending', 'Approved', 'Assigned', 'Rejected'], default: 'Pending' },
  assignedDonationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrganizationRequest', organizationRequestSchema);
