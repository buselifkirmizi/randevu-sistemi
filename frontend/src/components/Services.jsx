import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/appointments';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      <div className="bg-stone-900 text-stone-50 py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Hizmet Menümüz</h1>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">İhtiyacınıza uygun bakımı seçin, yenilenmek için ilk adımı atın.</p>
      </div>

      <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-stone-500 font-medium animate-pulse">Menü yükleniyor...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex flex-col sm:flex-row items-baseline justify-between p-4 rounded-xl hover:bg-stone-50 transition-colors">
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-stone-900">{service.name}</h3>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center w-full sm:w-auto gap-4">
                    <div className="h-px bg-stone-200 border-dashed flex-grow sm:hidden"></div>
                    <span className="text-stone-500 text-sm whitespace-nowrap bg-stone-100 px-3 py-1 rounded-full">{service.duration} dk</span>
                    <span className="text-xl font-serif text-stone-900 whitespace-nowrap">{service.price}₺</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center border-t border-stone-100 pt-10">
            <p className="text-stone-500 mb-6">Seçiminizi yaptınız mı?</p>
            <Link to="/randevu" className="inline-block bg-stone-900 hover:bg-stone-800 text-white px-10 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl">
              Hemen Randevu Oluştur
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;