const express = require('express');
const router = express.Router();
const Organization = require('../model/Organization');

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
