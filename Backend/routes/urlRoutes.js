const express = require('express');
const router = express.Router();
const { createShortenUrl, getbackOriginalUrl } = require('../controllers/urlControllers');

// Create a short URL
router.post('/shorturls', createShortenUrl);

// Redirect to original URL using shortcode
router.get('/:code', getbackOriginalUrl);

module.exports = router;
