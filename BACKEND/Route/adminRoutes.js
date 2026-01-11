// var express=require('express');
// var router=express.Router();
// var aModel=require('../model/Admin');

// router.post('/',(req,res)=>{
//     try {
//         aModel(req.body).save();
//         res.send("admin added successfully")
//     } catch (error) {
//      res.send(error)   
//     }
// })
// //api to get
// router.get('/Admin',async(req,res)=>{
//     try {
//         var data=await aModel.find();
//         res.send(data)
//     } catch (error) {
//         res.send(error)
        
//     }
// })

// module.exports=router;

const express = require('express');
const router = express.Router();
const NeededItem = require('../model/neededItems');
const Organization = require('../model/Organization');
const OrganizationRequest = require('../model/OrganizationRequest');
const Donation = require('../model/donations');

// Middleware for admin auth (basic example)
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  // Verify JWT here (use jsonwebtoken.verify)
  next();
};

// GET /api/admin/items - List items
router.get('/items', auth, async (req, res) => {
  const items = await NeededItem.find({}).sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/admin/items - Add item
router.post('/items', auth, async (req, res) => {
  const { name, description, quantityNeeded, category } = req.body;
  const item = new NeededItem({ name, description, quantityNeeded, category });
  await item.save();
  res.json({ success: true, item });
});

// PUT /api/admin/items/:id - Update item
router.put('/items/:id', auth, async (req, res) => {
  const { name, description, quantityNeeded, category } = req.body;
  const item = await NeededItem.findByIdAndUpdate(req.params.id, { name, description, quantityNeeded, category }, { new: true });
  res.json({ success: true, item });
});

// DELETE /api/admin/items/:id - Delete item
router.delete('/items/:id', auth, async (req, res) => {
  await NeededItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;

// ---------------- Organization Management ----------------
// GET /api/admin/organizations - list organizations (optionally filter by status)
router.get('/organizations', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const orgs = await Organization.find(filter).sort({ createdAt: -1 });
    res.json(orgs);
  } catch (err) {
    console.error('Fetch organizations error', err);
    res.status(500).json({ error: 'Failed to fetch organizations' });
  }
});

// POST /api/admin/organizations - create organization
router.post('/organizations', auth, async (req, res) => {
  try {
    const { name, contactEmail, location, password } = req.body;
    const org = new Organization({ name, contactEmail, location, password });
    await org.save();
    res.json({ success: true, org });
  } catch (err) {
    console.error('Create organization error', err);
    res.status(500).json({ error: 'Failed to create organization' });
  }
});

// PATCH /api/admin/organizations/status/:id - update status
router.patch('/organizations/status/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Organization.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, organization: updated });
  } catch (err) {
    console.error('Update organization status error', err);
    res.status(500).json({ error: 'Failed to update organization status' });
  }
});

// PATCH /api/admin/organizations/:id - update organization fields (e.g., password)
router.patch('/organizations/:id', auth, async (req, res) => {
  try {
    const allowed = ['name', 'contactEmail', 'location', 'password', 'status'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const updated = await Organization.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json({ success: true, organization: updated });
  } catch (err) {
    console.error('Update organization error', err);
    res.status(500).json({ error: 'Failed to update organization' });
  }
});

// GET /api/admin/requests - list all organization requests
router.get('/requests', auth, async (req, res) => {
  try {
    const requests = await OrganizationRequest.find({}).sort({ createdAt: -1 }).populate('organizationId').populate('assignedDonationId');
    // Normalize response: ensure there's an `organizationName` for the frontend to display
    const normalized = requests.map(r => {
      const obj = r.toObject ? r.toObject() : r;
      const org = obj.organizationId;
      const organizationName = org ? (typeof org === 'object' ? (org.name || org.contactEmail || String(org._id || '')) : String(org)) : 'Unknown';
      return { ...obj, organizationName };
    });
    res.json(normalized);
  } catch (err) {
    console.error('Fetch requests error', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// PATCH /api/admin/requests/status/:id - update request status
router.patch('/requests/status/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await OrganizationRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, request: updated });
  } catch (err) {
    console.error('Update request status error', err);
    res.status(500).json({ error: 'Failed to update request status' });
  }
});

// PATCH /api/admin/requests/assign-donation/:requestId - assign a donation to a request (whole donation)
router.patch('/requests/assign-donation/:requestId', auth, async (req, res) => {
  try {
    const { donationId } = req.body;
    if (!donationId) return res.status(400).json({ error: 'donationId is required' });

    const request = await OrganizationRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    if (donation.type !== 'Item') return res.status(400).json({ error: 'Donation must be an item type' });
    if (!donation.status || donation.status !== 'Approved') return res.status(400).json({ error: 'Donation must be Approved to assign' });

    // Assign donation to organization and request
    donation.organization = request.organizationId;
    donation.assignedRequestId = request._id;
    donation.status = 'Assigned';
    await donation.save();

    request.assignedDonationId = donation._id;
    request.status = 'Assigned';
    await request.save();

    res.json({ success: true, request, donation });
  } catch (err) {
    console.error('Assign donation to request error', err);
    res.status(500).json({ error: 'Failed to assign donation to request' });
  }
});

// PATCH /api/admin/requests/assign-item/:requestId - assign specific item(s) from a donation to a request
router.patch('/requests/assign-item/:requestId', auth, async (req, res) => {
  try {
    const { donationId, itemIndex, quantity } = req.body;
    if (!donationId) return res.status(400).json({ error: 'donationId is required' });
    if (typeof itemIndex !== 'number') return res.status(400).json({ error: 'itemIndex (number) is required' });
    const qty = Number(quantity) || 0;
    if (!qty || qty <= 0) return res.status(400).json({ error: 'quantity must be a positive number' });

    const request = await OrganizationRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    if (donation.type !== 'Item') return res.status(400).json({ error: 'Donation must be an item type' });
    if (!donation.status || !['Approved','PartiallyAssigned'].includes(donation.status)) return res.status(400).json({ error: 'Donation must be Approved to assign items' });

    const item = donation.itemDetails && donation.itemDetails[itemIndex];
    if (!item) return res.status(400).json({ error: 'Item not found at provided index' });
    if (item.quantity < qty) return res.status(400).json({ error: 'Not enough quantity available in donation' });

    // Capture item name BEFORE mutating the donation
    const itemName = item.name;

    // Deduct quantity from donation item
    item.quantity -= qty;
    // If quantity goes to zero, remove the item
    if (item.quantity <= 0) donation.itemDetails.splice(itemIndex, 1);

    // Update donation status
    if (!donation.itemDetails || donation.itemDetails.length === 0) {
      donation.status = 'Assigned';
    } else {
      donation.status = 'PartiallyAssigned';
    }

    await donation.save();

    // Add assignedItems entry to request
    request.assignedItems = request.assignedItems || [];
    request.assignedItems.push({ donationId: donation._id, name: req.body.name || itemName, quantity: qty });

    // Determine whether the request is fully satisfied or partially
    const needed = {};
    (request.items || []).forEach(it => { needed[it.name] = (needed[it.name] || 0) + it.quantity; });
    const assigned = {};
    (request.assignedItems || []).forEach(it => { assigned[it.name] = (assigned[it.name] || 0) + it.quantity; });

    let allSatisfied = true;
    let anyAssigned = false;
    for (const name of Object.keys(needed)) {
      const needQty = needed[name] || 0;
      const assignedQty = assigned[name] || 0;
      if (assignedQty > 0) anyAssigned = true;
      if (assignedQty < needQty) allSatisfied = false;
    }
    if (!anyAssigned) {
      // no change
    } else if (allSatisfied) request.status = 'Assigned';
    else request.status = 'PartiallyAssigned';

    await request.save();

    res.json({ success: true, request, donation });
  } catch (err) {
    console.error('Assign item to request error', err);
    res.status(500).json({ error: 'Failed to assign item to request' });
  }
});

// GET /api/admin/organizations/:id - get organization details and its requests
router.get('/organizations/:id', auth, async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);
    if (!org) return res.status(404).json({ error: 'Organization not found' });

    const requests = await OrganizationRequest.find({ organizationId: org._id }).sort({ createdAt: -1 }).populate('assignedDonationId');

    res.json({ organization: org, requests });
  } catch (err) {
    console.error('Fetch organization details error', err);
    res.status(500).json({ error: 'Failed to fetch organization details' });
  }
});