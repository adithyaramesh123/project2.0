const mongoose = require('mongoose');

const neededItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantityNeeded: { type: Number, default: 0 },
  category: { type: String, enum: ['Clothing', 'Food', 'Books', 'Electronics', 'Other'], default: 'Other' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NeededItem', neededItemSchema);