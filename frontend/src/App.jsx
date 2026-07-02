import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import AppointmentForm from './components/AppointmentForm';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import './App.css';

function RandevuPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-xl w-full text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Randevunuzu Oluşturun</h1>
        <p className="text-lg text-stone-500">Aşağıdaki formu doldurarak hızlıca randevu alın.</p>
      </div>
      <AppointmentForm />
    </div>
  );
}

function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // AdminPanel ve AdminLogin kendi içlerinde min-h-screen barındırdığı için 
  // ekstra bir sarıcı div'e (wrapper) ihtiyaç duymadan doğrudan döndürüyoruz.
  return <AdminPanel />;
}

function App() {
  return (
    <BrowserRouter>
      {/* flex ve min-h-screen ile sayfa içeriği az olsa bile Footer'ın en altta kalmasını sağlıyoruz */}
      <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
        <Navbar />
        
        {/* flex-grow ile ana içeriğin kalan tüm boşluğu kaplamasını sağlıyoruz */}
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hizmetler" element={<Services />} />
            <Route path="/hakkimizda" element={<About />} />
            <Route path="/iletisim" element={<Contact />} />
            <Route path="/randevu" element={<RandevuPage />} />
            <Route path="/admin" element={<AdminRoute />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;