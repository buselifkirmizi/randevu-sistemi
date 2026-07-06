import '../css/Contact.css';

function Contact() {
  return (
    <>
      <div className="page-hero">
        <h1>İletişim</h1>
        <p>Bizimle iletişime geçin, tüm sorularınızı keyifle yanıtlayalım.</p>
      </div>

      <div className="contact-grid-wrap">
        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <p className="contact-label">Adres</p>
            <p className="contact-value">Sivas Merkez, Türkiye</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📞</div>
            <p className="contact-label">Telefon</p>
            <p className="contact-value">0 (346) 000 00 00</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">✉️</div>
            <p className="contact-label">E-posta</p>
            <p className="contact-value">info@sivasglowstudio.com</p>
          </div>
          <div className="contact-card">
            <div className="contact-icon">🕒</div>
            <p className="contact-label">Çalışma Saatleri</p>
            <p className="contact-value"> Hafta İçi:09:00 – 19:00
              <br />Cumartesi: 09:00 - 14.00
              <br />Pazar: Kapalı
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;