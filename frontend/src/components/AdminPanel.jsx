import { useState, useEffect } from 'react';
import { getAppointments, updateAppointmentStatus, getServices } from '../api/appointments';
import '../css/AdminPanel.css';

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 filtre state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

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
        prev.map((appt) =>
          appt.id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (error) {
      alert('Hata: ' + error.message);
    }
  }

  // 📅 istatistikler
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appt) => appt.status === 'pending'
  ).length;

  const confirmedAppointments = appointments.filter(
    (appt) => appt.status === 'confirmed'
  ).length;

  const cancelledAppointments = appointments.filter(
    (appt) => appt.status === 'cancelled'
  ).length;

  const today = new Date().toISOString().split('T')[0];

  const todayAppointments = appointments.filter(
    (appt) => appt.date === today
  ).length;

  const upcomingAppointment = appointments
    .filter((appt) => appt.date >= today)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) -
        new Date(`${b.date}T${b.time}`)
    )[0];

  // 🔍 filtreleme sistemi
  const filteredAppointments = appointments.filter((appt) => {
    const searchMatch = appt.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === 'all' || appt.status === statusFilter;

    const dateMatch = dateFilter === '' || appt.date === dateFilter;

    return searchMatch && statusMatch && dateMatch;
  });

  if (loading) {
    return (
      <p className="loading-text loading-pulse">
        Veriler yükleniyor...
      </p>
    );
  }

  return (
    <div className="admin-panel-page">
      <div className="admin-panel-inner">

        {/* HEADER */}
        <div className="admin-panel-header">
          <div>
            <h1 className="admin-panel-title">Randevu Yönetimi</h1>
            <p className="admin-panel-subtitle">
              Tüm randevuları buradan görüntüleyip yönetebilirsiniz.
            </p>
          </div>

          <button
            className="admin-logout-btn"
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = '/';
            }}
          >
            Çıkış Yap
          </button>
        </div>

        {/* DASHBOARD */}
        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="dashboard-icon">📅</div>
            <h3>Toplam</h3>
            <span>{totalAppointments}</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">⏳</div>
            <h3>Bekleyen</h3>
            <span>{pendingAppointments}</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">✅</div>
            <h3>Onaylanan</h3>
            <span>{confirmedAppointments}</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">❌</div>
            <h3>İptal</h3>
            <span>{cancelledAppointments}</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📆</div>
            <h3>Bugün</h3>
            <span>{todayAppointments}</span>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">⏰</div>
            <h3>Yaklaşan</h3>
            <span>
              {upcomingAppointment
                ? upcomingAppointment.time
                : '-'}
            </span>
          </div>
        </div>

        {/* FİLTRELER */}
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
            <option value="all">Tümü</option>
            <option value="pending">Bekleyen</option>
            <option value="confirmed">Onaylanan</option>
            <option value="cancelled">İptal</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="filter-date"
          />
        </div>

        {/* TABLO */}
        {filteredAppointments.length === 0 ? (
          <div className="admin-empty">
            Aramanıza uygun randevu bulunamadı.
          </div>
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
                    <td>{appt.date} | {appt.time}</td>

                    <td>
                      <span className={`status-badge status-${appt.status}`}>
                        {appt.status === 'pending' && 'Beklemede'}
                        {appt.status === 'confirmed' && 'Onaylandı'}
                        {appt.status === 'cancelled' && 'İptal'}
                      </span>
                    </td>

                    <td>
                      <div className="action-btns">

                        {appt.status !== 'confirmed' && (
                          <button
                            className="btn-confirm"
                            onClick={() =>
                              handleStatusChange(appt.id, 'confirmed')
                            }
                          >
                            Onayla
                          </button>
                        )}

                        {appt.status !== 'cancelled' && (
                          <button
                            className="btn-cancel"
                            onClick={() =>
                              handleStatusChange(appt.id, 'cancelled')
                            }
                          >
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
    </div>
  );
}

export default AdminPanel;