import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-circle">SG</div>
          <span className="brand-name">Sivas Glow Studio</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>Anasayfa</Link>
          <Link to="/hizmetler" className={isActive('/hizmetler')}>Hizmetler</Link>
          <Link to="/hakkimizda" className={isActive('/hakkimizda')}>Hakkımızda</Link>
          <Link to="/iletisim" className={isActive('/iletisim')}>İletişim</Link>
        </div>

        <Link to="/randevu" className="nav-cta">Randevu Al</Link>
      </div>
    </nav>
  );
}

export default Navbar;