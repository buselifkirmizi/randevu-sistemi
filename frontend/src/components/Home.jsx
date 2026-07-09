import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getServices } from '../api/appointments';
import '../css/Home.css';

const slides = [
  {
    image: '/hero1.png',
    eyebrow: 'Sivas Glow Studio',
    title: 'Kendinize zaman ayırın,',
    titleItalic: 'ışıltınızı keşfedin.',
    subtitle: 'Cilt bakımı, makyaj ve tırnak hizmetlerinde uzman ekibimizle, size özel bir deneyim sunuyoruz.',
  },
  {
    image: '/hero2.png',
    eyebrow: 'Profesyonel Bakım',
    title: 'Her detayda',
    titleItalic: 'mükemmellik.',
    subtitle: 'Alanında uzman ekibimiz, her ziyaretinizi unutulmaz bir deneyime dönüştürüyor.',
  },
  {
    image: '/hero3.png',
    eyebrow: 'Güzellik & Bakım',
    title: 'Kendinizi en iyi',
    titleItalic: 'hissettiğiniz yer.',
    subtitle: 'Sizin için özel olarak hazırlanmış bakım programlarımızla doğal güzelliğinizi ortaya çıkarın.',
  },
];

function Home() {
  const [services, setServices] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 3)));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(index) {
    if (animating || index === currentSlide) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setAnimating(false);
    }, 400);
  }

  function goToPrev() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function goToNext() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  const slide = slides[currentSlide];

  return (
    <>
      {/* HERO */}
      <section
        className={`hero ${animating ? 'hero-animating' : ''}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-inner">
          <p className="hero-eyebrow hero-fade-1">{slide.eyebrow}</p>
          <h1 className="hero-fade-2">
            {slide.title} <em>{slide.titleItalic}</em>
          </h1>
          <p className="hero-desc hero-fade-3">{slide.subtitle}</p>
          <div className="hero-buttons hero-fade-4">
            <Link to="/randevu" className="btn-primary">Hemen Randevu Al</Link>
            <Link to="/hizmetler" className="btn-secondary">Hizmetleri İncele</Link>
          </div>
          <p className="hero-est hero-fade-5">Sivas, Est. 2026</p>
        </div>
        <button className="slider-btn slider-btn-prev" onClick={goToPrev}>‹</button>
        <button className="slider-btn slider-btn-next" onClick={goToNext}>›</button>
        <div className="slider-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slider-dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* HİZMET KARTLARI */}
      <section className="featured-section">
        <div className="featured-inner">

          {/* INLINE İSTATİSTİKLER */}
          <div className="inline-stats">
            <div className="inline-stat">
              <span className="inline-stat-number">500+</span>
              <span className="inline-stat-label">Mutlu Müşteri</span>
            </div>
            <div className="inline-stat-dot" />
            <div className="inline-stat">
              <span className="inline-stat-number">%98</span>
              <span className="inline-stat-label">Memnuniyet</span>
            </div>
            <div className="inline-stat-dot" />
            <div className="inline-stat">
              <span className="inline-stat-number">5+</span>
              <span className="inline-stat-label">Yıl Deneyim</span>
            </div>
            <div className="inline-stat-dot" />
            <div className="inline-stat">
              <span className="inline-stat-number">{services.length}</span>
              <span className="inline-stat-label">Profesyonel Hizmet</span>
            </div>
          </div>

          <span className="section-eyebrow">Öne Çıkanlar</span>
          <h2 className="section-title">Size özel bakım deneyimleri</h2>
          <p className="section-subtitle">
            Uzman ekibimizle, ihtiyacınıza en uygun hizmeti birlikte belirleyelim.
          </p>

          <div className="service-cards">
            {services.map((service, i) => (
              <div
                key={service.id}
                className={`service-card service-card--${i % 3}`}
                data-num={`0${i + 1}`}
              >
                <div className="service-card-number">0{i + 1}</div>
                <div className="service-card-body">
                  <h3 className="service-card-name">{service.name}</h3>
                  <p className="service-card-desc">
                    {service.duration} dakika süren profesyonel bakım
                  </p>
                </div>
                <div className="service-card-footer">
                  <span className="service-card-price">{service.price}₺</span>
                  <Link to="/randevu" className="service-card-btn">→</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="featured-cta">
            <Link to="/hizmetler" className="link-rose">Tüm menüyü görüntüle →</Link>
          </div>
        </div>
      </section>

      {/* SALON CTA */}
      <section className="salon-cta-section">
        <div className="salon-cta-inner">
          <div className="salon-cta-text">
            <span className="section-eyebrow" style={{ textAlign: 'left' }}>
              Neden Biz?
            </span>
            <h2 className="salon-cta-title">Her ziyaretiniz özel bir deneyim</h2>
            <p className="salon-cta-desc">
              Sivas Glow Studio olarak, her müşterimize kendini değerli hissettiren
              bir ortam sunuyoruz. Kaliteli ürünler, deneyimli ekip ve kişiye özel
              yaklaşımımızla fark yaratıyoruz.
            </p>
            <ul className="salon-cta-list">
              <li>Uzman ve sertifikalı ekip</li>
              <li>Premium kalite ürünler</li>
              <li>Kişiye özel bakım programı</li>
              <li>Kolay online randevu</li>
            </ul>
            <Link to="/randevu" className="btn-primary" style={{ marginTop: 28, display: 'inline-block' }}>
              Hemen Randevu Al
            </Link>
          </div>
          <div className="salon-cta-image">
            <img src="/hero4.png" alt="Sivas Glow Studio" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;