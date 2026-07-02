function About() {
  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Alanı */}
      <div className="bg-stone-900 text-stone-50 py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Hakkımızda</h1>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">
          Sivas Glow Studio'nun hikayesini ve ekibimizi tanıyın.
        </p>
      </div>

      {/* İçerik Kartı */}
      <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 sm:p-12 lg:p-16">
          <div className="mb-12">
            <span className="text-rose-600 font-semibold tracking-widest uppercase text-sm">Hikayemiz</span>
            <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mt-3 mb-6">
              Güzelliğe değer veren bir ekip
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed max-w-3xl">
              Sivas Glow Studio, müşterilerimize sadece bir hizmet değil, kendilerini özel hissettikleri
              bir deneyim sunmak amacıyla kuruldu. Cilt bakımından makyaja, tırnak tasarımından özel gün
              hazırlıklarına kadar geniş bir yelpazede, alanında uzman ekibimizle yanınızdayız.
            </p>
          </div>

          {/* Değerler Listesi */}
          <div className="border-t border-stone-100 pt-10">
            <div className="space-y-10">
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                <span className="text-4xl md:text-5xl font-serif italic text-rose-200 group-hover:text-rose-500 transition-colors w-16 shrink-0">
                  01
                </span>
                <div>
                  <h3 className="text-xl font-medium text-stone-900 mb-2 font-serif">Kaliteli ürünler</h3>
                  <p className="text-stone-500">
                    Tüm uygulamalarımızda cilt dostu, güvenilir markaları tercih ediyoruz.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                <span className="text-4xl md:text-5xl font-serif italic text-rose-200 group-hover:text-rose-500 transition-colors w-16 shrink-0">
                  02
                </span>
                <div>
                  <h3 className="text-xl font-medium text-stone-900 mb-2 font-serif">Uzman ekip</h3>
                  <p className="text-stone-500">
                    Alanında deneyimli ve sürekli kendini geliştiren bir ekiple çalışıyoruz.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                <span className="text-4xl md:text-5xl font-serif italic text-rose-200 group-hover:text-rose-500 transition-colors w-16 shrink-0">
                  03
                </span>
                <div>
                  <h3 className="text-xl font-medium text-stone-900 mb-2 font-serif">Kişiye özel bakım</h3>
                  <p className="text-stone-500">
                    Her müşterimizin ihtiyacına göre özelleştirilmiş bir deneyim sunuyoruz.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;