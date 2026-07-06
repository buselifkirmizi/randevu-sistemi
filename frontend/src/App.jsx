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
import './css/global.css';

function RandevuPage() {
  return (
    <div className="appointment-page">
      <div className="appointment-header">
        <h1>Randevunuzu Oluşturun</h1>
        <p>Aşağıdaki formu doldurarak hızlıca randevu alın.</p>
      </div>
      <AppointmentForm />
    </div>
  );
}

function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  if (!isLoggedIn) return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  return <AdminPanel />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <Navbar />
        <main className="site-main">
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