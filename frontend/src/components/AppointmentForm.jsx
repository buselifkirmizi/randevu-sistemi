import { useState, useEffect } from 'react';
import { getServices, createAppointment } from '../api/appointments';

function AppointmentForm() {
  const [services, setServices] = useState([]);
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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await createAppointment(formData);
      setMessage('Randevunuz başarıyla oluşturuldu ✅');
      setFormData({ customerName: '', phone: '', serviceId: '', date: '', time: '' });
    } catch (error) {
      setMessage(`Hata: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-stone-100 max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">Ad Soyad</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">Telefon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-stone-700">Hizmet</label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
          >
            <option value="" disabled>Lütfen bir hizmet seçiniz</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} ({service.duration} dk - {service.price}₺)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Tarih</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">Saat</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 flex justify-center items-center"
        >
          {loading ? 'İşleminiz yapılıyor...' : 'Randevuyu Onayla'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium text-center ${message.startsWith('Hata') ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {message}
        </div>
      )}
    </form>
  );
}

export default AppointmentForm;