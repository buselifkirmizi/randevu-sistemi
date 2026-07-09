import { useState, useEffect } from 'react';
import { getAppointments, getServices } from '../../api/appointments';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return s ? s.name : 'Bilinmeyen';
  }

  function getServicePrice(serviceId) {
    const s = services.find((s) => s.id === serviceId);
    return s ? parseInt(s.price) : 0;
  }

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;
  const todayCount = appointments.filter((a) => a.date === today).length;

  const upcomingAppointment = appointments
    .filter((a) => a.date >= today && a.status !== 'cancelled' && a.status !== 'completed')
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))[0];

  const monthlyRevenue = appointments
    .filter((a) => a.status === 'completed' && a.date.startsWith(currentMonth))
    .reduce((sum, a) => sum + getServicePrice(a.serviceId), 0);

  const totalRevenue = appointments
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + getServicePrice(a.serviceId), 0);

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const label = date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' });
    return {
      name: label,
      completed: appointments.filter((a) => a.date === dateStr && a.status === 'completed').length,
      pending: appointments.filter((a) => a.date === dateStr && a.status === 'pending').length,
    };
  });

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))
    .slice(0, 5);

  if (loading) return <p className="loading-text loading-pulse">Yükleniyor...</p>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Hoş geldiniz — genel duruma buradan bakabilirsiniz.</p>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div className="dashboard-cards">
        <div className="dashboard-card"><h3>Toplam</h3><span>{totalAppointments}</span></div>
        <div className="dashboard-card"><h3>Bekleyen</h3><span>{pendingCount}</span></div>
        <div className="dashboard-card"><h3>Onaylanan</h3><span>{confirmedCount}</span></div>
        <div className="dashboard-card"><h3>Tamamlanan</h3><span>{completedCount}</span></div>
        <div className="dashboard-card"><h3>İptal</h3><span>{cancelledCount}</span></div>
        <div className="dashboard-card"><h3>Bugün</h3><span>{todayCount}</span></div>
        <div className="dashboard-card"><h3>Bu Ay Gelir</h3><span>{monthlyRevenue.toLocaleString('tr-TR')}₺</span></div>
        <div className="dashboard-card"><h3>Toplam Gelir</h3><span>{totalRevenue.toLocaleString('tr-TR')}₺</span></div>
      </div>

      {/* BUGÜNÜN RANDEVULARI */}
      {todayCount > 0 && (
        <div className="today-box">
          <div className="today-box-header">
            <h2 className="admin-section-title" style={{ margin: 0 }}>Bugünün Randevuları</h2>
            <span className="today-count">{todayCount} randevu</span>
          </div>
          <div className="today-list">
            {appointments
              .filter((a) => a.date === today)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appt) => (
                <div key={appt.id} className="today-row">
                  <span className="today-time">{appt.time}</span>
                  <div className="today-info">
                    <span className="today-name">{appt.customerName}</span>
                    <span className="today-service">{getServiceName(appt.serviceId)}</span>
                  </div>
                  <span className={`status-badge status-${appt.status}`}>
                    {appt.status === 'pending' && 'Beklemede'}
                    {appt.status === 'confirmed' && 'Onaylandı'}
                    {appt.status === 'cancelled' && 'İptal'}
                    {appt.status === 'completed' && 'Tamamlandı'}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* GRAFİK + SON RANDEVULAR */}
      <div className="admin-overview">
        <div className="admin-chart-card">
          <h2 className="admin-section-title">Son 7 Gün</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F4" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E7E5E4', fontSize: 12 }} cursor={{ fill: '#FAFAF9' }} />
              <Bar dataKey="completed" name="Tamamlanan" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Bekleyen" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-recent-card">
          <h2 className="admin-section-title">Son Randevular</h2>
          <div className="recent-list">
            {recentAppointments.map((appt) => (
              <div key={appt.id} className="recent-row">
                <div className="recent-info">
                  <span className="recent-name">{appt.customerName}</span>
                  <span className="recent-service">{getServiceName(appt.serviceId)}</span>
                </div>
                <div className="recent-right">
                  <span className="recent-date">{appt.date}</span>
                  <span className={`status-badge status-${appt.status}`}>
                    {appt.status === 'pending' && 'Beklemede'}
                    {appt.status === 'confirmed' && 'Onaylandı'}
                    {appt.status === 'cancelled' && 'İptal'}
                    {appt.status === 'completed' && 'Tamamlandı'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;