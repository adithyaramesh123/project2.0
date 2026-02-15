const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String },
  password: { type: String },
  // location: { type: String }, // Old string location
  address: { type: String }, // Human readable address
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [longitude, latitude]
  },
  coverageRadius: { type: Number, default: 5000 }, // in meters (default 5km)
  status: { type: String, enum: ['Pending', 'Active', 'Inactive'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

organizationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Organization', organizationSchema);
