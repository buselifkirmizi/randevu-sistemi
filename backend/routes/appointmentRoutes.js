const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { readData, writeData } = require('../utils/fileHandler');

// GET ALL — otomatik tamamlama ile
router.get('/', (req, res) => {
  const appointments = readData('appointments.json');
  const services = readData('services.json');
  const now = new Date();
  let updated = false;

  appointments.forEach((appt) => {
    if (appt.status === 'pending' || appt.status === 'confirmed') {
      const apptTime = new Date(`${appt.date}T${appt.time}`);
      const service = services.find((s) => s.id === appt.serviceId);
      const duration = service ? parseInt(service.duration) : 60;
      const apptEndTime = new Date(apptTime.getTime() + duration * 60000);

      if (apptEndTime < now) {
        appt.status = 'completed';
        updated = true;
      }
    }
  });

  if (updated) writeData('appointments.json', appointments);
  res.json(appointments);
});

// GET SLOTS — /:id'den önce olmalı
router.get('/slots', (req, res) => {
  const { date, duration } = req.query;

  if (!date || !duration) {
    return res.status(400).json({ error: 'Tarih ve süre gerekli.' });
  }

  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  if (dayOfWeek === 0) {
    return res.json({ slots: [], closed: true, message: 'Pazar günleri kapalıyız.' });
  }

  const workStart = 9 * 60;
  const workEnd = dayOfWeek === 6 ? 14 * 60 : 19 * 60;
  const slotDuration = parseInt(duration);

  const appointments = readData('appointments.json');
  const services = readData('services.json');
  const dayAppointments = appointments.filter(
    (a) => a.date === date && a.status !== 'cancelled' && a.status !== 'completed'
  );

  const busyRanges = dayAppointments.map((a) => {
    const [h, m] = a.time.split(':').map(Number);
    const startMin = h * 60 + m;
    const service = services.find((s) => s.id === a.serviceId);
    const serviceDuration = service ? parseInt(service.duration) : 60;
    return { start: startMin, end: startMin + serviceDuration };
  });

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const slots = [];

  for (let time = workStart; time + slotDuration <= workEnd; time += slotDuration) {
    const slotEnd = time + slotDuration;

    if (date === today) {
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      if (time <= currentMinutes) continue;
    }

    const isBusy = busyRanges.some(
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

// CREATE APPOINTMENT
router.post('/', (req, res) => {
  const { customerName, phone, serviceId, date, time } = req.body;

  if (!customerName || !phone || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'Tüm alanlar zorunlu' });
  }

  const appointments = readData('appointments.json');
  const now = new Date();
  const selected = new Date(`${date}T${time}`);

  if (selected < now) {
    return res.status(400).json({ error: 'Geçmiş tarih seçilemez' });
  }

  const conflict = appointments.find(
    (a) => a.date === date && a.time === time && a.status !== 'cancelled'
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

  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Geçersiz durum.' });
  }

  const appointments = readData('appointments.json');
  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) {
    return res.status(404).json({ error: 'Randevu bulunamadı' });
  }

  const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);

  if (appointmentDate < new Date() && status !== 'completed' && status !== 'cancelled') {
    return res.status(400).json({ error: 'Geçmiş randevular sadece tamamlandı veya iptal yapılabilir.' });
  }

  appointment.status = status;
  writeData('appointments.json', appointments);
  res.json(appointment);
});

module.exports = router;