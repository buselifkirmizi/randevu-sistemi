const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();
const { readData, writeData } = require('../utils/fileHandler');

// GET /api/appointments -> tüm randevuları listele
router.get('/', (req, res) => {
  const appointments = readData('appointments.json');
  res.json(appointments);
});

// POST /api/appointments -> yeni randevu oluştur
router.post('/', (req, res) => {
  const { customerName, phone, serviceId, date, time } = req.body;

  // Basit doğrulama: gerekli alanlar dolu mu?
  if (!customerName || !phone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Lütfen tüm alanları doldurun.' });
  }

  const appointments = readData('appointments.json');

  const newAppointment = {
    id: Date.now().toString(), // basit bir benzersiz id üretimi
    customerName,
    phone,
    serviceId,
    date,
    time,
    status: 'pending' // beklemede
  };

  appointments.push(newAppointment);
  writeData('appointments.json', appointments);

  res.status(201).json(newAppointment);
});

router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointments = readData('appointments.json');
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    return res.status(404).json({ error: 'Randevu bulunamadı.' });
  }

  appointment.status = status;
  writeData('appointments.json', appointments);

  res.json(appointment);
});

module.exports = router;