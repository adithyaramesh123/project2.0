const mongoose = require('mongoose');

const neededItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantityNeeded: { type: Number, default: 0 },
  category: { type: String, enum: ['Clothes', 'Food', 'Sanitary', 'Drinks','Stationary'], default: 'Other' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NeededItem', neededItemSchema);