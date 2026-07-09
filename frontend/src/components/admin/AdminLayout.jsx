import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../css/AdminPanel.css';

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('adminToken');
    navigate('/');
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-brand-circle">SG</span>
          <span className="admin-brand-name">Sivas Glow</span>
        </div>

        <nav className="admin-sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/randevular"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">📅</span>
            Randevular
          </NavLink>
          <NavLink
            to="/admin/hizmetler"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="admin-nav-icon">✨</span>
            Hizmetler
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" className="admin-nav-item">
            <span className="admin-nav-icon">🏠</span>
            Siteye Git
          </a>
          <button className="admin-nav-item admin-logout" onClick={handleLogout}>
            <span className="admin-nav-icon">🚪</span>
            Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;