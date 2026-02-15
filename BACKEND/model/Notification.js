const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['DonationAlert', 'System'], default: 'DonationAlert' },
    relatedDonationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
    donorName: { type: String },
    pickupAddress: { type: String },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
