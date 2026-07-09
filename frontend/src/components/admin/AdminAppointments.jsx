import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus, getServices } from '../../api/appointments';

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    async function loadData() {
      const [appts, svcs] = await Promise.all([getAppointments(), getServices()]);
      setAppointments(appts);
      setServices(svcs);
      setLoading(false);
    }
    loadData();
  }, []);

  function getServiceName(serviceId) {
    const s = services.find((s) => s.id === serviceId);
    return s ? s.name : 'Bilinmeyen Hizmet';
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

  const filteredAppointments = appointments.filter((appt) => {
    const searchMatch = appt.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || appt.status === statusFilter;
    const dateMatch = dateFilter === '' || appt.date === dateFilter;
    return searchMatch && statusMatch && dateMatch;
  });

  if (loading) return <p className="loading-text loading-pulse">Yükleniyor...</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Randevular</h1>
        <p className="admin-page-subtitle">Tüm randevuları görüntüleyin ve yönetin.</p>
      </div>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Müşteri ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekleyen</option>
          <option value="confirmed">Onaylanan</option>
          <option value="completed">Tamamlanan</option>
          <option value="cancelled">İptal</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-date"
        />
        {(searchTerm || statusFilter !== 'all' || dateFilter) && (
          <button
            className="filter-clear"
            onClick={() => { setSearchTerm(''); setStatusFilter('all'); setDateFilter(''); }}
          >
            Temizle
          </button>
        )}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="admin-empty">Aramanıza uygun randevu bulunamadı.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Müşteri</th>
                <th>Telefon</th>
                <th>Hizmet</th>
                <th>Tarih / Saat</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.customerName}</td>
                  <td>{appt.phone}</td>
                  <td>{getServiceName(appt.serviceId)}</td>
                  <td>{appt.date} · {appt.time}</td>
                  <td>
                    <span className={`status-badge status-${appt.status}`}>
                      {appt.status === 'pending' && 'Beklemede'}
                      {appt.status === 'confirmed' && 'Onaylandı'}
                      {appt.status === 'cancelled' && 'İptal'}
                      {appt.status === 'completed' && 'Tamamlandı'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      {appt.status !== 'confirmed' && appt.status !== 'completed' && (
                        <button className="btn-confirm" onClick={() => handleStatusChange(appt.id, 'confirmed')}>
                          Onayla
                        </button>
                      )}
                      {appt.status === 'confirmed' && (
                        <button className="btn-complete" onClick={() => handleStatusChange(appt.id, 'completed')}>
                          Tamamlandı
                        </button>
                      )}
                      {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                        <button className="btn-cancel" onClick={() => handleStatusChange(appt.id, 'cancelled')}>
                          İptal
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAppointments;