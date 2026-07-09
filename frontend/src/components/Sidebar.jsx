import { Link } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          ✂️
        </div>

        <div>
          <h2>Sivas Glow</h2>
          <span>Studio</span>
        </div>
      </div>


      {/* Menü */}
      <nav className="sidebar-menu">

        <Link to="/admin" className="sidebar-item active">
          🏠
          <span>Dashboard</span>
        </Link>


        <Link to="/admin/appointments" className="sidebar-item">
          📅
          <span>Randevular</span>
          <b className="menu-badge">12</b>
        </Link>


        <Link to="/admin/calendar" className="sidebar-item">
          🗓
          <span>Takvim</span>
        </Link>


        <Link to="/admin/services" className="sidebar-item">
          💇
          <span>Hizmetler</span>
        </Link>


        <Link to="/admin/employees" className="sidebar-item">
          👥
          <span>Çalışanlar</span>
        </Link>


        <Link to="/admin/customers" className="sidebar-item">
          👤
          <span>Müşteriler</span>
        </Link>


        <Link to="/admin/reports" className="sidebar-item">
          📊
          <span>Analizler</span>
        </Link>


        <Link to="/admin/reviews" className="sidebar-item">
          ⭐
          <span>Yorumlar</span>
          <b className="menu-badge">
            3
          </b>
        </Link>


        <Link to="/admin/settings" className="sidebar-item">
          ⚙️
          <span>Ayarlar</span>
        </Link>


      </nav>



      {/* Alt Menü */}
      <div className="sidebar-bottom">

        <Link to="/" className="sidebar-item">
          🏠
          <span>Siteye Git</span>
        </Link>


        <button
          className="sidebar-logout"
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/";
          }}
        >
          🚪
          <span>Çıkış Yap</span>
        </button>


        <div className="sidebar-user">

          <div className="user-avatar">
            BG
          </div>

          <div>
            <strong>Admin</strong>
            <small>Sivas Glow Studio</small>
          </div>

        </div>


      </div>


    </aside>
  );
}

export default Sidebar;