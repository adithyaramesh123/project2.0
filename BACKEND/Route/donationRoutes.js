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

/* ---------------- Models ---------------- */
const Donation = require("../model/donations");
const NeededItem = require("../model/neededItems");
const User = require("../model/User"); // If you have user model

/* ============================================================
   1️⃣ MONEY DONATION (Stripe)
============================================================ */
router.post("/money", async (req, res) => {
  try {
    const stripeInstance = getStripe();
    if (!stripeInstance)
      return res.status(500).json({ error: "Stripe not configured" });

    const { amount, userId, stripeToken } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ error: "Invalid amount" });

    // Create payment intent
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
      metadata: { userId },
    });

    // Confirm payment
    const confirmedPayment = await stripeInstance.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: stripeToken }
    );

    // Save donation
    const donation = new Donation({
      userId,
      type: "Money",
      amount,
      stripePaymentId: confirmedPayment.id,
    });

    await donation.save();

    res.json({ success: true, paymentId: confirmedPayment.id });
  } catch (error) {
    console.error("💳 Money Donation Error:", error.message);
    res.status(400).json({ error: error.message });
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
router.get("/items", async (req, res) => {
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
router.get("/admin/items", async (req, res) => {
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
router.get("/admin/donations", async (req, res) => {
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

/* ⭐ Summary stats */
router.get("/admin/stats", async (req, res) => {
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

/* ⭐ Monthly money chart */
router.get("/admin/analytics/money", async (req, res) => {
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

/* ⭐ Item category chart */
router.get("/admin/analytics/items", async (req, res) => {
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

/* ⭐ Recent donations */
router.get("/admin/recent-donations", async (req, res) => {
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

/* ============================================================
   EXPORT ROUTER
============================================================ */
module.exports = router;
