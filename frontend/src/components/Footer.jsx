import { Link } from 'react-router-dom';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-circle">SG</div>
          <span className="footer-brand-name">Sivas Glow Studio</span>
        </div>

        <p className="footer-desc">
          Cilt bakımı, makyaj ve tırnak hizmetlerinde uzman ekibimizle
          yenilenmeniz için yanınızdayız.
        </p>

        <div className="footer-info">
          <span>📍 Sivas, Türkiye</span>
          <span>•</span>
          <span>📞 0 (346) 000 00 00</span>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-copy">
          <span>© 2026 Sivas Glow Studio. Tüm hakları saklıdır.</span>
          <span>•</span>
          <Link to="/admin" className="footer-admin-link">Yönetim Girişi</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;