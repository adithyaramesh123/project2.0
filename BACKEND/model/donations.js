// var mongoose=require('mongoose');
// var adminschema = mongoose.Schema({
//     money: { type: String, default: '' },
//     sanitary: { type: Number, default: 0 },
//     clothes: { type: Number, default: 0 },
//     food: { type: Number, default: 0 },
//     drinks: { type: Number, default: 0 },
//     stationary: { type: Number, default: 0 }
// });
// var aModel=mongoose.model("admin",adminschema);
// module.exports=aModel;

// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//     money: { type: String, default: '' },
//     sanitary: { type: Number, default: 0 },
//     clothes: { type: Number, default: 0 },
//     food: { type: Number, default: 0 },
//     drinks: { type: Number, default: 0 },
//     stationary: { type: Number, default: 0 }
// });

// module.exports =
//     mongoose.models.Donation || mongoose.model("Donation", donationSchema);


const mongoose = require('mongoose');

// Sub-schema for each donated item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const donationSchema = new mongoose.Schema({
  // Changed to String so "testUser" works in dev
  userId: { type: String },

  type: { type: String, enum: ['Money', 'Item'], required: true },

  // Money donation
  amount: { type: Number },
  stripePaymentId: { type: String },
  razorpayPaymentId: { type: String },
  razorpayOrderId: { type: String },
  razorpaySignature: { type: String },

  // Item donation (supports MULTIPLE items)
  itemDetails: { type: [itemSchema], default: [] },

  // Optional notes + address
  notes: { type: String },
  address: { type: String },

  status: { type: String, default: 'Pending' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null },
  assignedRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrganizationRequest', default: null },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
