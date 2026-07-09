const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { readData, writeData } = require('../utils/fileHandler');

// GET — tüm hizmetleri listele (herkese açık)
router.get('/', (req, res) => {
  const services = readData('services.json');
  res.json(services);
});

// POST — yeni hizmet ekle (admin)
router.post('/', verifyToken, (req, res) => {
  const { name, duration, price } = req.body;

  if (!name || !duration || !price) {
    return res.status(400).json({ error: 'İsim, süre ve fiyat zorunludur.' });
  }

  const services = readData('services.json');

  const newService = {
    id: Date.now().toString(),
    name,
    duration: parseInt(duration),
    price: parseInt(price),
  };

  services.push(newService);
  writeData('services.json', services);

  res.status(201).json(newService);
});

// PUT — hizmet güncelle (admin)
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, duration, price } = req.body;

  const services = readData('services.json');
  const service = services.find((s) => s.id === id);

  if (!service) {
    return res.status(404).json({ error: 'Hizmet bulunamadı.' });
  }

  if (name) service.name = name;
  if (duration) service.duration = parseInt(duration);
  if (price) service.price = parseInt(price);

  writeData('services.json', services);
  res.json(service);
});

// DELETE — hizmet sil (admin)
router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  const services = readData('services.json');
  const filtered = services.filter((s) => s.id !== id);

  if (filtered.length === services.length) {
    return res.status(404).json({ error: 'Hizmet bulunamadı.' });
  }

  writeData('services.json', filtered);
  res.json({ message: 'Hizmet silindi.' });
});

module.exports = router;