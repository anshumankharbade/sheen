const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Stylist = require('../models/Stylist');
const Booking = require('../models/Booking');

router.post('/verify', (req, res) => {
  const { token } = req.body;
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }
  if (token === expected) {
    res.json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});

// Admin auth middleware – token from environment variable
const adminAuth = (req, res, next) => {
  const token = req.headers['admin-token'];
  const expectedToken = process.env.ADMIN_TOKEN;
  if (!expectedToken) {
    console.error('ADMIN_TOKEN not set in environment');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  if (token === expectedToken) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply auth to all admin routes
router.use(adminAuth);

// ========== SERVICES ==========
// GET all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// POST create service
router.post('/services', async (req, res) => {
  try {
    const { name, duration, price, description, image } = req.body;
    // Basic validation
    if (!name || !duration || !price) {
      return res.status(400).json({ error: 'Name, duration and price are required' });
    }
    const service = new Service({ name, duration, price, description, image });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT update service
router.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE service
router.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// ========== STYLISTS ==========
// GET all stylists (with populated services)
router.get('/stylists', async (req, res) => {
  try {
    const stylists = await Stylist.find().populate('services').sort({ createdAt: -1 });
    res.json(stylists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stylists' });
  }
});

// POST create stylist
router.post('/stylists', async (req, res) => {
  try {
    const { name, bio, image, services } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const stylist = new Stylist({ name, bio, image, services: services || [] });
    await stylist.save();
    res.status(201).json(stylist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create stylist' });
  }
});

// PUT update stylist
router.put('/stylists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stylist = await Stylist.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!stylist) {
      return res.status(404).json({ error: 'Stylist not found' });
    }
    res.json(stylist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update stylist' });
  }
});

// DELETE stylist
router.delete('/stylists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stylist = await Stylist.findByIdAndDelete(id);
    if (!stylist) {
      return res.status(404).json({ error: 'Stylist not found' });
    }
    res.json({ message: 'Stylist deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete stylist' });
  }
});

// ========== BOOKINGS ==========
// GET all bookings (populated)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service')
      .populate('stylist')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PATCH update booking status
router.patch('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});


module.exports = router;