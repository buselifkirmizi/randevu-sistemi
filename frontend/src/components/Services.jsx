import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../api/appointments';
import '../css/Services.css';

import service1 from '../assets/service1.png';
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';
import service4 from '../assets/service4.jpg';
import service5 from '../assets/service5.jpg';
import service6 from '../assets/service6.jpg';

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
    <>
      <div className="page-hero">
        <h1>Hizmet Menümüz</h1>
        <p>
          İhtiyacınıza uygun bakımı seçin, yenilenmek için ilk adımı atın.
        </p>
      </div>

      <div className="services-layout">

        {/* Sol Resimler */}
        <div className="services-images">
          <img src={service1} alt="Saç Kesimi" />
          <img src={service2} alt="Cilt Bakımı" />
          <img src={service3} alt="Nail Art" />
        </div>

        {/* Hizmet Listesi */}
        <div className="services-card">
          {loading ? (
            <p className="loading-text loading-pulse">
              Menü yükleniyor...
            </p>
          ) : (
            <div className="menu-list">
              {services.map((service) => (
                <div key={service.id} className="services-menu-row">
                  <span className="services-row-name">
                    {service.name}
                  </span>

                  <div className="services-row-right">
                    <span className="duration-badge">
                      {service.duration} dk
                    </span>

                    <span className="services-price">
                      {service.price}₺
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="services-cta">
            <p>Seçiminizi yaptınız mı?</p>

            <Link to="/randevu" className="btn-dark">
              Hemen Randevu Oluştur
            </Link>
          </div>
        </div>

        {/* Sağ Resimler */}
        <div className="services-images">
          <img src={service4} alt="Saç Boyama" />
          <img src={service5} alt="Protez Tırnak" />
          <img src={service6} alt="Kirpik" />
        </div>

      </div>
    </>
  );
}

export default Services;