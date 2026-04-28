const express = require('express');
const router = express.Router();
const Stylist = require('../models/Stylist');

// GET all stylists (populate their services)
router.get('/', async (req, res) => {
  try {
    const stylists = await Stylist.find()
      .populate('services')
      .sort({ createdAt: -1 });
    res.json(stylists);
  } catch (err) {
    console.error('Error fetching stylists:', err);
    res.status(500).json({ error: 'Failed to fetch stylists' });
  }
});

module.exports = router;