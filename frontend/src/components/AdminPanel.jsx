import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus, getServices } from '../api/appointments';

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [appointmentsData, servicesData] = await Promise.all([
      getAppointments(),
      getServices(),
    ]);
    setAppointments(appointmentsData);
    setServices(servicesData);
    setLoading(false);
  }

  function getServiceName(serviceId) {
    const service = services.find((s) => s.id === serviceId);
    return service ? service.name : 'Bilinmeyen Hizmet';
  }

  async function handleStatusChange(id, newStatus) {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: newStatus } : appt))
      );
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-stone-500 font-medium animate-pulse">Veriler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 font-serif">Randevu Yönetimi</h1>
            <p className="mt-1 text-sm text-stone-500">Tüm randevuları buradan görüntüleyip yönetebilirsiniz.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/';
              }}
              className="inline-flex items-center justify-center px-4 py-2 border border-stone-200 rounded-lg shadow-sm text-sm font-medium text-stone-700 bg-white hover:bg-stone-50 focus:outline-none transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center bg-white py-16 rounded-2xl shadow-sm border border-stone-100">
            <p className="text-stone-500 text-lg">Henüz randevu bulunmuyor.</p>
          </div>
        ) : (
          <div className="bg-white shadow-sm border border-stone-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200">
                <thead className="bg-stone-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Müşteri</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Telefon</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Hizmet</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Tarih / Saat</th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">Durum</th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-stone-500 uppercase tracking-wider">İşlem</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-stone-100">
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{appt.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{appt.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">{getServiceName(appt.serviceId)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-600">
                        {appt.date} <span className="text-stone-400 mx-1">|</span> {appt.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${appt.status === 'pending' ? 'bg-amber-100 text-amber-800' : ''}
                          ${appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : ''}
                          ${appt.status === 'cancelled' ? 'bg-rose-100 text-rose-800' : ''}
                        `}>
                          {appt.status === 'pending' && 'Beklemede'}
                          {appt.status === 'confirmed' && 'Onaylandı'}
                          {appt.status === 'cancelled' && 'İptal Edildi'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {appt.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'confirmed')}
                            className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Onayla
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'cancelled')}
                            className="text-rose-600 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            İptal Et
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;