const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { readData, writeData } = require('../utils/fileHandler');

// GET ALL
router.get('/', (req, res) => {
  const data = readData('appointments.json');
  res.json(data);
});

// CREATE APPOINTMENT (RULES)
router.post('/', (req, res) => {
  const { customerName, phone, serviceId, date, time } = req.body;

  if (!customerName || !phone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Tüm alanlar zorunlu' });
  }

  const appointments = readData('appointments.json');

  const now = new Date();
  const selected = new Date(`${date}T${time}`);

  // ❌ geçmiş kontrol
  if (selected < now) {
    return res.status(400).json({ error: 'Geçmiş tarih seçilemez' });
  }

  // ❌ çakışma kontrol
  const conflict = appointments.find(
    (a) => a.date === date && a.time === time
  );

  if (conflict) {
    return res.status(400).json({ error: 'Bu saat dolu' });
  }

  const newAppointment = {
    id: Date.now().toString(),
    customerName,
    phone,
    serviceId,
    date,
    time,
    status: 'pending'
  };

  appointments.push(newAppointment);
  writeData('appointments.json', appointments);

  res.status(201).json(newAppointment);
});

// UPDATE STATUS (ADMIN)
router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const appointments = readData('appointments.json');

  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    return res.status(404).json({ error: 'Randevu bulunamadı' });
  }

  appointment.status = status;

  writeData('appointments.json', appointments);

  res.json(appointment);
});

module.exports = router;
// GET /api/appointments/slots?date=2026-07-10&duration=30
router.get('/slots', (req, res) => {
  const { date, duration } = req.query;

  if (!date || !duration) {
    return res.status(400).json({ error: 'Tarih ve süre gerekli.' });
  }

  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay(); // 0=Pazar, 1=Pazartesi... 6=Cumartesi

  // Pazar kapalı
  if (dayOfWeek === 0) {
    return res.json({ slots: [], closed: true, message: 'Pazar günleri kapalıyız.' });
  }

  // Çalışma saatleri
  const workStart = 9 * 60;  // 09:00 → dakika cinsinden
  const workEnd = dayOfWeek === 6 ? 14 * 60 : 19 * 60; // Cumartesi 14:00, diğer günler 19:00

  const slotDuration = parseInt(duration); // dakika

  // O güne ait mevcut randevuları çek
  const appointments = readData('appointments.json');
  const dayAppointments = appointments.filter(
    (a) => a.date === date && a.status !== 'cancelled'
  );

  // Dolu aralıkları hesapla
  const busyRanges = dayAppointments.map((a) => {
    const [h, m] = a.time.split(':').map(Number);
    const startMin = h * 60 + m;

    // O randevunun hizmet süresini bul
    const services = readData('services.json');
    const service = services.find((s) => s.id === a.serviceId);
    const serviceDuration = service ? parseInt(service.duration) : 60;

    return { start: startMin, end: startMin + serviceDuration };
  });

  // Boş slotları üret
  const slots = [];
  for (let time = workStart; time + slotDuration <= workEnd; time += slotDuration) {
    const slotEnd = time + slotDuration;

    // Bu slot herhangi bir dolu aralıkla çakışıyor mu?
    const isBusy = busyRanges.some(
      //.some busyranges içini alıyor en az biri doluyoysa false dönüyor
      (range) => time < range.end && slotEnd > range.start
    );

    if (!isBusy) {
      const hours = Math.floor(time / 60).toString().padStart(2, '0');
      const minutes = (time % 60).toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
    }
  }

  res.json({ slots, closed: false });
});