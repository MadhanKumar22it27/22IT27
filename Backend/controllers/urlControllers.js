const shortid = require('shortid');
const Url = require('../models/urlModels');

// Create Short URL
const createShortenUrl = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    // check if shortcode provided or generate one
    let code = shortcode || shortid.generate();

    // ensure uniqueness
    const existingCode = await Url.findOne({ shortcode: code });
    if (existingCode) {
      return res.status(400).json({ message: "Shortcode already in use, pick another" });
    }

    // default validity 30 minutes
    const minutes = validity || 30;
    const expiry = new Date(Date.now() + minutes * 60 * 1000);

    const newUrl = await Url.create({
      shortcode: code,
      originalUrl: url,
      expiresAt: expiry
    });

    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get("host")}/${newUrl.shortcode}`,
      expiry: newUrl.expiresAt.toISOString()
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Redirect Original URL
const getbackOriginalUrl = async (req, res) => {
  try {
    const code = req.params.code;
    const urlDoc = await Url.findOne({ shortcode: code });

    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    if (new Date() > urlDoc.expiresAt) {
      return res.status(410).json({ message: "Short URL expired" });
    }

    // save click analytics
    urlDoc.clicks.push({
      referrer: req.get("referer") || "direct",
      ip: req.ip
    });
    await urlDoc.save();

    return res.redirect(urlDoc.originalUrl);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { createShortenUrl, getbackOriginalUrl };
