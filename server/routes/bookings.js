const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST create a booking (with availability check)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, email, service, stylist, date, timeSlot } = req.body;

    // Basic validation
    if (!customerName || !phone || !email || !service || !stylist || !date || !timeSlot) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Phone number validation (basic – allows digits, spaces, +, -, parentheses)
    const phoneRegex = /^[+\d\s\-()]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }

    // Time slot validation (should be one of predefined slots)
    const validTimeSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];
    if (!validTimeSlots.includes(timeSlot)) {
      return res.status(400).json({ error: 'Invalid time slot' });
    }

    // Check if slot is already booked (excluding cancelled bookings)
    const existingBooking = await Booking.findOne({
      stylist,
      date,
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(409).json({ 
        error: 'This time slot is already booked. Please choose another time or date.' 
      });
    }

    const newBooking = new Booking({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.toLowerCase().trim(),
      service,
      stylist,
      date,
      timeSlot
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Booking creation error:', err);
    // Handle duplicate key or validation errors from mongoose
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

module.exports = router;