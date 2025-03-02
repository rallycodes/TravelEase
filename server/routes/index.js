const express = require('express');
const countryRoutes = require('./countryRoutes');

const router = express.Router();

// Ülke rotalarını ekle
router.use('/countries', countryRoutes);

// Sağlık kontrolü
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API çalışıyor' });
});

module.exports = router; 