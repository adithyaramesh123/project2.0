const express = require("express");
const router = express.Router();

/* ---------------- Stripe Init (Lazy Load) ---------------- */
let stripe;
function getStripe() {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.error("❌ Missing STRIPE_SECRET_KEY");
      return null;
    }
    stripe = require("stripe")(key);
  }
  return stripe;
}

/* ---------------- Razorpay Init (Lazy Load) ---------------- */
const crypto = require('crypto');
let razorpayInstance;
function getRazorpay() {
  if (!razorpayInstance) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error('❌ Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
      return null;
    }
    const Razorpay = require('razorpay');
    razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  return razorpayInstance;
}

/* ---------------- Models ---------------- */
const Donation = require("../model/donations");
// Simple middleware to protect admin routes (similar to adminRoutes.js)
const adminAuth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  next();
};
const mongoose = require('mongoose');
const Organization = require('../model/Organization');
const OrganizationRequest = require('../model/OrganizationRequest');
const NeededItem = require("../model/neededItems");
const User = require("../model/User");

/* ============================================================
   1️⃣ MONEY DONATION (Razorpay)
   POST /api/donations/money - creates a Razorpay order and returns order info for client checkout
   POST /api/donations/money/verify - verify payment signature and record donation
============================================================ */
router.post('/money', async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || Number(amount) <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const razorpay = getRazorpay();
    if (!razorpay) return res.status(500).json({ error: 'Razorpay not configured' });

    // Razorpay expects amount in paise (integer)
    const amountPaise = Math.round(Number(amount) * 100);

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    });

    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('Razorpay order creation error', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.post('/money/verify', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, userId } = req.body;
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) return res.status(400).json({ error: 'Missing payment verification fields' });

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) return res.status(500).json({ error: 'Razorpay secret not configured' });

    const generatedSignature = crypto.createHmac('sha256', keySecret).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');

    if (generatedSignature !== razorpay_signature) {
      console.error('Invalid Razorpay signature', { generatedSignature, razorpay_signature });
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Save donation (amount is expected in paise)
    const donation = new Donation({
      userId: userId || 'testUser',
      type: 'Money',
      amount: amount ? Number(amount) / 100 : undefined,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      status: 'Completed',
    });

    await donation.save();

    res.json({ success: true, donationId: donation._id });
  } catch (err) {
    console.error('Razorpay verification error', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

/* ============================================================
   2️⃣ MULTI-ITEM DONATION
============================================================ */
router.post("/item", async (req, res) => {
  try {
    const { userId, items, notes, address } = req.body;

    if (!address)
      return res.status(400).json({ error: "Pickup address required" });

    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: "At least one item required" });

    const donation = new Donation({
      userId,
      type: "Item",
      itemDetails: items,
      notes,
      address,
    });

    await donation.save();

    res.json({ success: true, donationId: donation._id });
  } catch (error) {
    console.error("📦 Item Donation Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

/* ============================================================
   3️⃣ GET NEEDED ITEMS FOR DONATION PAGE
============================================================ */
router.get("/items", async (_req, res) => {
  try {
    const items = await NeededItem.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error("📋 Fetch Items Error:", error.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

/* ============================================================
   4️⃣ ADMIN — GET ALL NEEDED ITEMS
============================================================ */
router.get("/admin/items", async (_req, res) => {
  try {
    const items = await NeededItem.find({}).sort({ createdAt: -1 });
    res.json(items.filter((i) => i && i._id));
  } catch (error) {
    console.error("📋 Admin Items Error:", error.message);
    res.status(500).json({ error: "Failed to fetch admin items" });
  }
});

/* ============================================================
   5️⃣ ADMIN — CREATE NEEDED ITEM
============================================================ */
router.post("/admin/items", async (req, res) => {
  try {
    const newItem = new NeededItem(req.body);
    await newItem.save();
    res.json({ success: true, item: newItem });
  } catch (error) {
    console.error("❌ Admin Create Item Error:", error.message);
    res.status(500).json({ error: "Failed to add item" });
  }
});

/* ============================================================
   6️⃣ ADMIN — UPDATE NEEDED ITEM
============================================================ */
router.put("/admin/items/:id", async (req, res) => {
  try {
    const updated = await NeededItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, item: updated });
  } catch (error) {
    console.error("❌ Admin Update Error:", error.message);
    res.status(500).json({ error: "Failed to update item" });
  }
});

/* ============================================================
   7️⃣ ADMIN — DELETE NEEDED ITEM
============================================================ */
router.delete("/admin/items/:id", async (req, res) => {
  try {
    await NeededItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Admin Delete Error:", error.message);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

/* ============================================================
   8️⃣ USER — DONATION HISTORY
============================================================ */
router.get("/history/:userId", async (req, res) => {
  try {
    const history = await Donation.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (error) {
    console.error("📜 Donation History Error:", error.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

/* ============================================================
   9️⃣ ADMIN — ALL DONATIONS (Money + Items)
============================================================ */
router.get("/admin/donations", async (_req, res) => {
  try {
    const all = await Donation.find({}).sort({ createdAt: -1 });
    res.json(all);
  } catch (error) {
    console.error("📜 Admin Donation List Error:", error.message);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

/* ============================================================
   🔟 ADMIN — DASHBOARD ANALYTICS
============================================================ */
router.get("/admin/stats", async (_req, res) => {
  try {
    const users = await User.countDocuments();
    const donations = await Donation.find({});

    const totalAmount = donations
      .filter((d) => d.type === "Money")
      .reduce((sum, d) => sum + d.amount, 0);

    const topDonor = await Donation.aggregate([
      { $match: { type: "Money" } },
      { $group: { _id: "$userId", amount: { $sum: "$amount" } } },
      { $sort: { amount: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      users,
      donations: donations.length,
      totalAmount,
      topDonor: topDonor.length ? topDonor[0] : null,
    });
  } catch (error) {
    console.error("📊 Stats Error:", error.message);
    res.status(500).json({ error: "Failed to load stats" });
  }
});

router.get("/admin/analytics/money", async (_req, res) => {
  try {
    const result = await Donation.aggregate([
      { $match: { type: "Money" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed money analytics" });
  }
});

router.get("/admin/analytics/items", async (_req, res) => {
  try {
    const result = await Donation.aggregate([
      { $match: { type: "Item" } },
      { $unwind: "$itemDetails" },
      {
        $group: {
          _id: "$itemDetails.name",
          total: { $sum: "$itemDetails.quantity" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed item analytics" });
  }
});

router.get("/admin/recent-donations", async (_req, res) => {
  try {
    const recent = await Donation.find({})
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(recent);
  } catch (error) {
    res.status(500).json({ error: "Failed recent donations" });
  }
});

/* ============================================================
   1️⃣2️⃣ ADMIN — UNASSIGNED ITEM DONATIONS
   Returns item donations that are approved but not yet assigned
============================================================ */
router.get('/admin/unassigned-items', adminAuth, async (_req, res) => {
  try {
    const unassigned = await Donation.find({ type: 'Item', status: 'Approved', organization: null }).sort({ createdAt: -1 });
    res.json(unassigned);
  } catch (err) {
    console.error('Unassigned items fetch error', err);
    res.status(500).json({ error: 'Failed to fetch unassigned items' });
  }
});

// Organization endpoints for wanted-items and assigned pickups
// POST /api/wanted-items - organization creates a request for an item
router.post('/wanted-items', async (req, res) => {
  try {
    const { organizationId, itemName, quantity } = req.body;
    if (!organizationId || !itemName) return res.status(400).json({ error: 'organizationId and itemName required' });
    if (!mongoose.Types.ObjectId.isValid(organizationId)) return res.status(400).json({ error: 'Invalid organizationId' });

    const org = await Organization.findById(organizationId);
    if (!org) return res.status(404).json({ error: 'Organization not found' });

    const newReq = await OrganizationRequest.create({
      organizationId,
      items: [{ name: itemName, quantity: quantity || 1 }],
    });

    res.json({ success: true, request: newReq });
  } catch (err) {
    console.error('Create wanted-item request error', err);
    res.status(500).json({ error: 'Failed to create request' });
  }
});

// GET /api/wanted-items?organizationId=... - list requests for an organization
router.get('/wanted-items', async (req, res) => {
  try {
    const { organizationId } = req.query;
    if (!organizationId) return res.status(400).json({ error: 'organizationId query param required' });
    if (!mongoose.Types.ObjectId.isValid(organizationId)) return res.status(400).json({ error: 'Invalid organizationId' });
    const list = await OrganizationRequest.find({ organizationId }).sort({ createdAt: -1 }).populate('assignedDonationId');
    res.json(list);
  } catch (err) {
    console.error('Fetch wanted-items error', err);
    res.status(500).json({ error: 'Failed to fetch wanted items' });
  }
});

// DELETE /api/wanted-items/:id - organization cancels their request
router.delete('/wanted-items/:id', async (req, res) => {
  try {
    const orgId = req.query.organizationId || req.body.organizationId;
    if (!orgId) return res.status(400).json({ error: 'organizationId required' });
    if (!mongoose.Types.ObjectId.isValid(orgId)) return res.status(400).json({ error: 'Invalid organizationId' });

    const requestDoc = await OrganizationRequest.findById(req.params.id);
    if (!requestDoc) return res.status(404).json({ error: 'Request not found' });
    if (String(requestDoc.organizationId) !== String(orgId)) return res.status(403).json({ error: 'Not authorized to cancel this request' });

    // Only allow cancelling if still pending or rejected (not already assigned/approved)
    if (!['Pending', 'Rejected'].includes(requestDoc.status)) {
      return res.status(400).json({ error: 'Only Pending or Rejected requests can be cancelled' });
    }

    await OrganizationRequest.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Cancel wanted-item error', err);
    res.status(500).json({ error: 'Failed to cancel request' });
  }
});

// GET /api/assigned-pickups?organizationId=... - list assigned pickups for an organization
router.get('/assigned-pickups', async (req, res) => {
  try {
    const { organizationId } = req.query;
    if (!organizationId) return res.status(400).json({ error: 'organizationId query param required' });
    if (!mongoose.Types.ObjectId.isValid(organizationId)) return res.status(400).json({ error: 'Invalid organizationId' });
    const list = await OrganizationRequest.find({ organizationId, assignedDonationId: { $ne: null } }).populate({ path: 'assignedDonationId', select: '-__v', populate: { path: 'userId', select: 'ename' } });

    // Map to include donorName for convenience
    const mapped = list.map(r => {
      const donation = r.assignedDonationId;
      const donorName = donation && donation.userId ? donation.userId.ename || donation.userId : null;
      return {
        id: r._id,
        requestId: r._id,
        items: r.items,
        status: r.status,
        assignedDonation: donation,
        donorName,
        createdAt: r.createdAt,
      };
    });
    res.json(mapped);
  } catch (err) {
    console.error('Fetch assigned pickups error', err);
    res.status(500).json({ error: 'Failed to fetch assigned pickups' });
  }
});

// PATCH /api/requests/:id/status - organization updates the status of its request (e.g., mark as Picked)
router.patch('/requests/:id/status', async (req, res) => {
  try {
    const { status, organizationId } = req.body;
    if (!status) return res.status(400).json({ error: 'status is required' });
    if (!organizationId) return res.status(400).json({ error: 'organizationId is required' });
    if (!mongoose.Types.ObjectId.isValid(organizationId)) return res.status(400).json({ error: 'Invalid organizationId' });

    const request = await OrganizationRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (String(request.organizationId) !== String(organizationId)) return res.status(403).json({ error: 'Not authorized to update this request' });

    // Only allow marking as Picked if a donation was assigned and current status is Assigned
    if (status === 'Picked') {
      if (!request.assignedDonationId) return res.status(400).json({ error: 'No donation has been assigned to this request' });
      if (request.status !== 'Assigned') return res.status(400).json({ error: 'Request must be Assigned to mark as Picked' });
      request.status = 'Picked';
      await request.save();
      return res.json({ success: true, request });
    }

    // For safety, do not allow other status changes here
    return res.status(400).json({ error: 'Unsupported status update' });
  } catch (err) {
    console.error('Update request status (org) error', err);
    res.status(500).json({ error: 'Failed to update request status' });
  }
});

/* ============================================================
   1️⃣3️⃣ ADMIN — ASSIGN ITEM DONATION TO ORGANIZATION
   Sets the donation.organization and updates status to 'Assigned'
============================================================ */
router.patch('/admin/assign/:id', adminAuth, async (req, res) => {
  try {
    const { organizationId } = req.body;
    if (!organizationId) return res.status(400).json({ error: 'organizationId is required' });

    const org = await Organization.findById(organizationId);
    if (!org) return res.status(404).json({ error: 'Organization not found' });

    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    if (donation.type !== 'Item') return res.status(400).json({ error: 'Only item donations can be assigned' });
    if (donation.status !== 'Approved') return res.status(400).json({ error: 'Donation must be Approved to assign' });

    const updated = await Donation.findByIdAndUpdate(req.params.id, { organization: organizationId, status: 'Assigned' }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Donation not found' });

    res.json({ success: true, donation: updated });
  } catch (err) {
    console.error('Assign donation error', err);
    res.status(500).json({ error: 'Failed to assign donation' });
  }
});

/* ============================================================
   1️⃣1️⃣ ADMIN — APPROVE / REJECT DONATIONS
============================================================ */
router.put("/admin/approve/:id", async (req, res) => {
  try {
    await Donation.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.json({ success: true });
  } catch (error) {
    console.error("Approve Error:", error.message);
    res.status(500).json({ error: "Failed to approve donation" });
  }
});

router.put("/admin/reject/:id", async (req, res) => {
  try {
    await Donation.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.json({ success: true });
  } catch (error) {
    console.error("Reject Error:", error.message);
    res.status(500).json({ error: "Failed to reject donation" });
  }
});

module.exports = router;
