import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Info, Activity, Phone, Users, BookOpen, Menu, X, Calendar, ActivitySquare, HeartPulse, LogIn, LogOut, User, ShieldCheck } from 'lucide-react';
import { cn } from './lib/utils';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Departments from './pages/Departments';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Appointments from './pages/Appointments';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentModal from './components/AppointmentModal';
import AuthModal from './components/AuthModal';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Departments', path: '/departments' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top utility bar */}
      <div className="bg-primary-light text-primary-dark py-2 px-6 text-sm font-medium flex justify-between items-center hidden md:flex gap-4">
        <span className="truncate flex-1">📍 Flat No. 289, Lifetime Smiles Dental Clinic, near Pax Hotel And Residency, Pocket 3C, Pocket 4, Sector 16B Dwarka, Dwarka, New Delhi, Delhi, 110078</span>
        <span className="shrink-0 flex gap-4">
          <span>📞 Emergency: 8851865995, 8810286009</span>
        </span>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tight text-gray-900">LifeTime Smiles Clinic</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    location.pathname === link.path ? "text-primary" : "text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 ml-2 border-l pl-6 border-gray-200">
                {user ? (
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-700">
                    <Link to="/appointments" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <User className="w-4 h-4" /> {user.displayName || 'User'}
                    </Link>
                    {user?.email === 'shivamzi953@gmail.com' && (
                      <Link to="/admin" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1.5" title="Admin Portal">
                        <ShieldCheck className="w-4 h-4" />
                      </Link>
                    )}
                    <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors" title="Log Out">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" /> Sign In
                  </button>
                )}

                <button 
                  onClick={() => setIsAppointmentOpen(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm shadow-primary/20 hover:shadow-md text-sm"
                >
                  Book Appointment
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-medium",
                    location.pathname === link.path ? "bg-primary-light text-primary-dark" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAppointmentOpen(true);
                  }}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  Book Appointment
                </button>
                {user ? (
                  <>
                    <Link
                      to="/appointments"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" /> My Appointments
                    </Link>
                    {user?.email === 'shivamzi953@gmail.com' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full mt-2 bg-primary-light/50 hover:bg-primary-light text-primary-dark px-6 py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Portal
                      </Link>
                    )}
                    <button 
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
                    className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" /> Sign In / Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Areas */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onBookClick={() => setIsAppointmentOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">LifeTime Smiles Clinic</span>
            </div>
            <p className="text-sm text-gray-400">
              Providing brighter, healthier smiles for the whole family with modern, compassionate dental care.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/departments" className="hover:text-primary transition-colors">Departments</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><button onClick={() => setIsAppointmentOpen(true)} className="hover:text-primary transition-colors">Book Appointment</button></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog & Tips</Link></li>
              {user?.email === 'shivamzi953@gmail.com' && <li><Link to="/admin" className="hover:text-primary transition-colors text-primary-light">Admin Portal</Link></li>}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">📍</span>
                <span>Flat No. 289, Lifetime Smiles Dental Clinic, near Pax Hotel And Residency, Pocket 3C, Pocket 4, Sector 16B Dwarka, Dwarka, New Delhi, Delhi, 110078</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <span>8851865995, 8810286009</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <span>hello@enamelcare.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">🕒</span>
                <span>Mon-Sat 8AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} LifeTime Smiles Clinic. All rights reserved.
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={isAppointmentOpen} 
        onClose={() => setIsAppointmentOpen(false)} 
        onOpenAuth={() => setIsAuthOpen(true)} 
      />
      
      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
