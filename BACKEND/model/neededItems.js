const mongoose = require('mongoose');

const neededItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantityNeeded: { type: Number, default: 0 },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  category: { type: String, enum: ['Clothes', 'Food', 'Sanitary', 'Drinks', 'Stationary', 'Other'], default: 'Other' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NeededItem', neededItemSchema);