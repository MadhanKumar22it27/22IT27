const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortcode: { type: String, required: true, unique: true },   
  originalUrl: { type: String, required: true },               
  createdAt: { type: Date, default: Date.now },                
  expiresAt: { type: Date, required: true },                   
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      referrer: { type: String },
      ip: { type: String },
      geo: {
        country: { type: String },
        region: { type: String },
        city: { type: String }
      }
    }
  ]
});

// Create model
module.exports = mongoose.model('Url', urlSchema);
