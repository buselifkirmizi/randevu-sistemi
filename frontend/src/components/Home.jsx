import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getServices } from '../api/appointments';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 3)));
  }, []);

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden px-4">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-rose-600 font-semibold tracking-widest uppercase text-sm mb-4">Sivas Glow Studio</p>
          <h1 className="text-5xl lg:text-7xl font-serif text-stone-900 mb-6 leading-tight">
            Kendinize zaman ayırın, <span className="italic text-rose-800">ışıltınızı keşfedin.</span>
          </h1>
          <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto">
            Cilt bakımı, makyaj ve tırnak hizmetlerinde uzman ekibimizle, size özel, sakinleştirici bir deneyim sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/randevu" className="w-full sm:w-auto bg-stone-900 text-white px-8 py-4 rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl">
              Hemen Randevu Al
            </Link>
            <Link to="/hizmetler" className="w-full sm:w-auto bg-white text-stone-900 border border-stone-200 px-8 py-4 rounded-full font-medium hover:border-stone-400 transition-all">
              Hizmetleri İncele
            </Link>
          </div>
          <p className="mt-12 text-sm text-stone-400 tracking-widest uppercase">Sivas, Est. 2026</p>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-semibold tracking-widest uppercase text-sm">Öne Çıkanlar</span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mt-3 mb-4">Size özel bakım deneyimleri</h2>
            <p className="text-stone-500">Uzman ekibimizle, ihtiyacınıza en uygun hizmeti birlikte belirleyelim.</p>
          </div>

          <div className="space-y-6">
            {services.map((service) => (
              <div key={service.id} className="group flex flex-col sm:flex-row items-baseline justify-between p-6 rounded-2xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                <div className="flex-grow">
                  <h3 className="text-xl font-medium text-stone-900 group-hover:text-rose-700 transition-colors">{service.name}</h3>
                  <p className="text-stone-500 text-sm mt-1">{service.duration} dakika süren yenileyici bakım</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                  <div className="h-px bg-stone-200 flex-grow sm:hidden"></div>
                  <span className="text-2xl font-serif text-stone-900">{service.price}₺</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/hizmetler" className="inline-flex items-center text-rose-600 font-medium hover:text-rose-800 transition-colors">
              Tüm menüyü görüntüle <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;