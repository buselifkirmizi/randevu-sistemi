const express = require('express');
const router = express.Router();
const { readData } = require('../utils/fileHandler');

// GET /api/services -> tüm hizmetleri listele
router.get('/', (req, res) => {
  const services = readData('services.json');
  res.json(services);
});

module.exports = router;