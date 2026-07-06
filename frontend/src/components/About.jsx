import '../css/About.css'; 

function About() {
  return (
    <>
      <div className="page-hero">
        <h1>Hakkımızda</h1>
        <p>Sivas Glow Studio'nun hikayesini ve ekibimizi tanıyın.</p>
      </div>

      <div className="about-card">
        <p className="about-eyebrow">Hikayemiz</p>
        <h2 className="about-title">Güzelliğe değer veren bir ekip</h2>
        <p className="about-desc">
          Sivas Glow Studio, müşterilerimize sadece bir hizmet değil, kendilerini özel
          hissettikleri bir deneyim sunmak amacıyla kuruldu. Cilt bakımından makyaja,
          tırnak tasarımından özel gün hazırlıklarına kadar geniş bir yelpazede,
          alanında uzman ekibimizle yanınızdayız.
        </p>

        <div className="values-list">
          <div className="value-row">
            <span className="value-num">01</span>
            <div>
              <h3 className="value-title">Kaliteli ürünler</h3>
              <p className="value-desc">Tüm uygulamalarımızda cilt dostu, güvenilir markaları tercih ediyoruz.</p>
            </div>
          </div>
          <div className="value-row">
            <span className="value-num">02</span>
            <div>
              <h3 className="value-title">Uzman ekip</h3>
              <p className="value-desc">Alanında deneyimli ve sürekli kendini geliştiren bir ekiple çalışıyoruz.</p>
            </div>
          </div>
          <div className="value-row">
            <span className="value-num">03</span>
            <div>
              <h3 className="value-title">Kişiye özel bakım</h3>
              <p className="value-desc">Her müşterimizin ihtiyacına göre özelleştirilmiş bir deneyim sunuyoruz.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;