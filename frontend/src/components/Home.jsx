import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getServices } from '../api/appointments';
import heroBg from "../assets/hero-bg.jpg";
import '../css/Home.css';

function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 3)));
  }, []);

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <span className="hero-eyebrow">Sivas Glow Studio</span>

          <h1>
            Kendinize zaman ayırın, <em>ışıltınızı keşfedin.</em>
          </h1>

          <p className="hero-desc">
            Cilt bakımı, makyaj ve tırnak hizmetlerinde uzman ekibimizle,
            size özel, sakinleştirici bir deneyim sunuyoruz.
          </p>

          <div className="hero-buttons">
            <Link to="/randevu" className="btn-primary">
              Hemen Randevu Al
            </Link>

            <Link to="/hizmetler" className="btn-secondary">
              Hizmetleri İncele
            </Link>
          </div>

          <p className="hero-est">Sivas, Est. 2026</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-inner">
          <span className="section-eyebrow">Öne Çıkanlar</span>

          <h2 className="section-title">
            Size özel bakım deneyimleri
          </h2>

          <p className="section-subtitle">
            Uzman ekibimizle, ihtiyacınıza en uygun hizmeti birlikte belirleyelim.
          </p>

          <div className="menu-list">
            {services.map((service) => (
              <div key={service.id} className="menu-row">
                <div className="menu-row-left">
                  <span className="menu-row-name">
                    {service.name}
                  </span>

                  <span className="menu-row-desc">
                    {service.duration} dakika süren yenileyici bakım
                  </span>
                </div>

                <div className="menu-row-right">
                  <span className="menu-row-price">
                    {service.price}₺
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="featured-cta">
            <Link to="/hizmetler" className="link-rose">
              Tüm menüyü görüntüle →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;