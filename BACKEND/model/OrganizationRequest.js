const mongoose = require('mongoose');

const requestItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const organizationRequestSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  items: { type: [requestItemSchema], default: [] },
  // Added 'PartiallyAssigned' & 'Accepted' statuses so organizations can accept or partially receive assigned donations
  status: { type: String, enum: ['Pending', 'Approved', 'Assigned', 'PartiallyAssigned', 'Accepted', 'Rejected'], default: 'Pending' },
  assignedDonationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', default: null },
  // assignedItems allow attaching specific donation items (donationId + item name + quantity) to a request
  assignedItems: { type: [{ donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }, name: String, quantity: Number }], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrganizationRequest', organizationRequestSchema);
