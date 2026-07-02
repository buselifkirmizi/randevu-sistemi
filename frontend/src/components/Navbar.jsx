import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path 
      ? 'text-rose-600 font-semibold' 
      : 'text-stone-600 hover:text-stone-900 font-medium transition-colors';
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif font-bold text-lg group-hover:bg-rose-700 transition-colors">
              SG
            </div>
            <span className="font-serif text-xl text-stone-900 tracking-wide">Sivas Glow Studio</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Anasayfa</Link>
            <Link to="/hizmetler" className={isActive('/hizmetler')}>Hizmetler</Link>
            <Link to="/hakkimizda" className={isActive('/hakkimizda')}>Hakkımızda</Link>
            <Link to="/iletisim" className={isActive('/iletisim')}>İletişim</Link>
          </div>

          {/* CTA */}
          <div className="flex items-center">
            <Link to="/randevu" className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg">
              Randevu Al
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;