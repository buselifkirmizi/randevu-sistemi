function Contact() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      <div className="bg-stone-900 text-stone-50 py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">İletişim</h1>
        <p className="text-stone-400 max-w-2xl mx-auto text-lg">Bizimle iletişime geçin, tüm sorularınızı keyifle yanıtlayalım.</p>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📍</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Adres</h3>
            <p className="text-stone-500">Sivas Merkez, Türkiye</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📞</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Telefon</h3>
            <p className="text-stone-500">0 (346) 000 00 00</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✉️</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">E-posta</h3>
            <p className="text-stone-500">info@sivasglowstudio.com</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🕒</div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">Çalışma Saatleri</h3>
            <p className="text-stone-500">09:00 – 19:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;