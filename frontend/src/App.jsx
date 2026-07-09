import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import AppointmentForm from './components/AppointmentForm';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAppointments from './components/admin/AdminAppointments';
import AdminServices from './components/admin/AdminServices';
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
  return <AdminLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="site">
            <Navbar />
            <main className="site-main"><Home /></main>
            <Footer />
          </div>
        } />
        <Route path="/hizmetler" element={
          <div className="site">
            <Navbar />
            <main className="site-main"><Services /></main>
            <Footer />
          </div>
        } />
        <Route path="/hakkimizda" element={
          <div className="site">
            <Navbar />
            <main className="site-main"><About /></main>
            <Footer />
          </div>
        } />
        <Route path="/iletisim" element={
          <div className="site">
            <Navbar />
            <main className="site-main"><Contact /></main>
            <Footer />
          </div>
        } />
        <Route path="/randevu" element={
          <div className="site">
            <Navbar />
            <main className="site-main"><RandevuPage /></main>
            <Footer />
          </div>
        } />
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="randevular" element={<AdminAppointments />} />
          <Route path="hizmetler" element={<AdminServices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;