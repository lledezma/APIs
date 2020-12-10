const express = require('express');

const emojis = require('./emojis');
const faqs = require('./dob');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/dob', dob);


module.exports = router;
