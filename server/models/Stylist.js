const mongoose = require('mongoose');

const stylistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }]
}, { timestamps: true });

module.exports = mongoose.model('Stylist', stylistSchema);