import { useState, useEffect } from 'react';
import {
  getServices,
  createAppointment,
  getAvailableSlots,
} from '../api/appointments';
import '../css/AppointmentForm.css';

function AppointmentForm() {
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [closedMessage, setClosedMessage] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  // Hizmet veya tarih değiştiğinde slotları yeniden yükle
  useEffect(() => {
    if (!formData.serviceId || !formData.date) {
      setSlots([]);
      setClosedMessage('');
      return;
    }

    const selectedService = services.find(
      (service) => service.id === formData.serviceId
    );

    if (!selectedService) return;

    setSlotsLoading(true);
    setFormData((prev) => ({ ...prev, time: '' }));

    getAvailableSlots(formData.date, selectedService.duration)
      .then((data) => {
        if (data.closed) {
          setClosedMessage(data.message);
          setSlots([]);
        } else {
          setClosedMessage('');
          setSlots(data.slots);
        }
      })
      .finally(() => setSlotsLoading(false));
  }, [formData.serviceId, formData.date, services]);

  // Minimum tarih: bugün
  const today = new Date().toISOString().split('T')[0];

  function handleChange(e) {
    const { name, value } = e.target;

    // Telefon alanı
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 11);

      setFormData((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const phoneRegex = /^05\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      setMessage(
        'Hata: Lütfen geçerli bir Türkiye telefon numarası giriniz. (05XXXXXXXXX)'
      );
      return;
    }

    setLoading(true);

    try {
      await createAppointment(formData);

      setMessage('Randevunuz başarıyla oluşturuldu ✅');

      setFormData({
        customerName: '',
        phone: '',
        serviceId: '',
        date: '',
        time: '',
      });

      setSlots([]);
      setClosedMessage('');
    } catch (error) {
      setMessage(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="appointment-form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group form-full">
          <label className="form-label">Ad Soyad</label>
          <input
            className="form-input"
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Telefon</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="05XXXXXXXXX"
            pattern="^05[0-9]{9}$"
            maxLength={11}
            required
          />
        </div>

        <div className="form-group form-full">
          <label className="form-label">Hizmet</label>
          <select
            className="form-input"
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Lütfen bir hizmet seçiniz
            </option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.duration} dk — {service.price}₺)
              </option>
            ))}
          </select>
        </div>

        <div className="form-group form-full">
          <label className="form-label">Tarih</label>
          <input
            className="form-input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        {formData.serviceId && formData.date && (
          <div className="form-group form-full">
            <label className="form-label">Saat</label>

            {closedMessage ? (
              <div className="slots-closed">{closedMessage}</div>
            ) : slotsLoading ? (
              <div className="slots-loading">
                Müsait saatler yükleniyor...
              </div>
            ) : slots.length === 0 ? (
              <div className="slots-empty">
                Bu gün için müsait saat bulunmuyor.
              </div>
            ) : (
              <div className="slots-grid">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-btn ${
                      formData.time === slot ? 'selected' : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        time: slot,
                      }))
                    }
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            <input
              type="hidden"
              name="time"
              value={formData.time}
              required
            />
          </div>
        )}
      </div>

      <button
        className="form-submit"
        type="submit"
        disabled={loading || !formData.time}
      >
        {loading ? 'İşleminiz yapılıyor...' : 'Randevuyu Onayla'}
      </button>

      {message && (
        <div
          className={`form-message ${
            message.startsWith('Hata') ? 'error' : 'success'
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default AppointmentForm;