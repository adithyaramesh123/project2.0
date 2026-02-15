const express = require('express');
const router = express.Router();
const Organization = require('../model/Organization');
const Notification = require('../model/Notification');
const OrganizationRequest = require('../model/OrganizationRequest'); // Assuming this exists or will be needed

// PUT /api/organizations/:id/location - Update organization location & radius
router.put('/:id/location', async (req, res) => {
  try {
    const { latitude, longitude, radius, address } = req.body;
    if (!latitude || !longitude) return res.status(400).json({ error: 'Coordinates required' });

    const org = await Organization.findByIdAndUpdate(req.params.id, {
      location: { type: 'Point', coordinates: [longitude, latitude] },
      coverageRadius: radius || 5000,
      address: address
    }, { new: true });

    res.json({ success: true, organization: org });
  } catch (err) {
    console.error('Update location error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/organizations/:id/notifications - Get notifications for an organization
router.get('/:id/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ organizationId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/organizations/notifications/:id/read - Mark notification as read
router.put('/notifications/:id/read', async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/organizations/requests/nearby - Get organization requests near a user (lat, lng)
router.get('/requests/nearby', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ error: 'Latitude and Longitude required' });

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // 1. Find organizations accessible from this user location (User is inside Org's radius)
    // Query: Organization's location is near User? NO.
    // Query: User's location is within Organization's coverageRadius?
    // This is tricky with standard $near.
    // Easier approach: Find organizations near the user, then filter by their radius.
    // OR: Use $geoIntersects if we stored coverage as a Polygon (Circle), but we stored Point + Radius.

    // Efficient approach:
    // Find all active organizations. (If dataset is huge, this needs optimization, but for now it's fine)
    // Filter in code: distance(user, org) <= org.coverageRadius

    const organizations = await Organization.find({ status: 'Active' });

    const nearbyOrgIds = organizations.filter(org => {
      if (!org.location || !org.location.coordinates) return false;
      const [orgLng, orgLat] = org.location.coordinates;
      const distance = getDistanceFromLatLonInKm(userLat, userLng, orgLat, orgLng) * 1000; // in meters
      return distance <= (org.coverageRadius || 5000);
    }).map(o => o._id);

    // 2. Find Pending requests from these organizations
    const requests = await OrganizationRequest.find({
      organizationId: { $in: nearbyOrgIds },
      status: 'Pending'
    }).populate('organizationId', 'name address location contactEmail');

    res.json(requests);
  } catch (err) {
    console.error("Nearby requests error", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper function for distance
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// GET /api/organizations/map-data - Get all active organizations for map display
router.get('/map-data', async (req, res) => {
  try {
    const orgs = await Organization.find({ status: 'Active' })
      .select('location coverageRadius name address contactEmail');
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/organizations/login - organization login
router.post('/login', async (req, res) => {
  try {
    const { contactEmail, password } = req.body;
    if (!contactEmail || !password) return res.status(400).json({ error: 'contactEmail and password required' });
    const org = await Organization.findOne({ contactEmail });
    if (!org) return res.status(404).json({ error: 'Organization not found' });
    if (org.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ success: true, organization: org });
  } catch (err) {
    console.error('Organization login error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
