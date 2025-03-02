const express = require('express');
const countryController = require('../controllers/countryController');

const router = express.Router();

// Tüm ülkeleri getir
router.get('/', countryController.getAllCountries);

// Ülke ara
router.get('/search', countryController.searchCountries);

// Belirli bir ülkeyi getir
router.get('/:name', countryController.getCountryByName);

// Yeni ülke ekle (admin için)
router.post('/', countryController.createCountry);

// Ülke bilgilerini güncelle (admin için)
router.put('/:id', countryController.updateCountry);

module.exports = router; 