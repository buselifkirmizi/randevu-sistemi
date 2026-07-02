import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
        <div className="flex items-center space-x-3">
          <span className="w-10 h-10 bg-white text-stone-900 flex items-center justify-center rounded-full font-serif font-bold text-lg">SG</span>
          <span className="text-2xl font-serif text-white tracking-wide">Sivas Glow Studio</span>
        </div>
        
        <p className="max-w-md text-stone-500">Cilt bakımı, makyaj ve tırnak hizmetlerinde uzman ekibimizle yenilenmeniz için yanınızdayız.</p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-stone-300">
          <span className="flex items-center gap-2">📍 Sivas, Türkiye</span>
          <span className="hidden sm:block text-stone-700">•</span>
          <span className="flex items-center gap-2">📞 0 (346) 000 00 00</span>
        </div>
        
        <div className="w-full h-px bg-stone-800 my-4"></div>
        
        <p className="text-sm text-stone-600 flex flex-col sm:flex-row items-center gap-2">
          <span>© 2026 Sivas Glow Studio. Tüm hakları saklıdır.</span>
          <span className="hidden sm:block">•</span>
          <Link to="/admin" className="hover:text-white transition-colors underline underline-offset-4 decoration-stone-700">Yönetim Girişi</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;