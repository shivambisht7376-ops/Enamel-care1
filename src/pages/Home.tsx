import React from 'react';
import { ArrowRight, Star, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS } from '../data';
import { Link } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';

export default function Home({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary text-sm font-semibold shadow-sm text-primary-dark">
              <Star className="h-4 w-4 fill-primary" /> Trusted by 5000+ happy patients
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              A gentle touch for a <span className="text-primary">brighter smile.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              Experience modern, pain-free dentistry in a relaxing environment. Our expert team is dedicated to providing you with the highest quality of dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookClick}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
              >
                Book Appointment <ArrowRight className="h-5 w-5" />
              </button>
              <Link 
                to="/services"
                className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold transition-all flex items-center justify-center text-lg"
              >
                Our Services
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">15+</span>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">24/7</span>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Emergency</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] transform translate-y-8 translate-x-8"></div>
            <img 
              src="/assets/hero.png" 
              alt="LifeTime Smiles Clinic interior" 
              referrerPolicy="no-referrer"
              className="relative z-10 w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
            />
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#E0F2FE] rounded-full flex items-center justify-center text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Safe & Secure</p>
                <p className="font-bold text-gray-900">Certified Clinic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Builders */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Advanced Technology", desc: "We use the latest 3D imaging and laser dentistry for precise, pain-free treatments.", icon: <Shield className="h-8 w-8" /> },
              { title: "Expert Care", desc: "Our team of specialized doctors ensures you get the best treatment for any dental issue.", icon: <Star className="h-8 w-8" /> },
              { title: "Flexible Timing", desc: "Open evenings and weekends, plus emergency services because toothaches don't wait.", icon: <Clock className="h-8 w-8" /> },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/30 transition-colors">
                <div className="text-primary flex-shrink-0 bg-primary-light p-3 rounded-2xl h-fit">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">What We Do</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Care for Your Smile</h3>
            <p className="text-gray-600">From routine cleanings to complex surgeries, we have every specialty under one roof.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <div key={dept.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-primary-light text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{dept.name}</h4>
                <p className="text-gray-600 mb-6 line-clamp-2">{dept.description}</p>
                <Link to="/services" className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
           <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Patient Stories</h2>
           <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h3>
           <p className="text-gray-600 max-w-2xl mx-auto">We take pride in our patient satisfaction. Read about the experiences of those who have trusted us with their smiles.</p>
          </div>
          
          <ReviewSection />
        </div>
      </section>
      
      {/* CTA Layer */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPmNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZmZmZiIvPjwvZz48L2c+PC9zdmc+')", backgroundSize: "30px 30px" }}></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to regain your confident smile?</h2>
          <p className="text-xl text-primary-light mb-10 max-w-2xl mx-auto">Book an appointment today and experience the difference of a modern, patient-first dental clinic.</p>
          <button 
            onClick={onBookClick}
            className="bg-white text-primary px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-2xl"
          >
            Schedule Consultation Today
          </button>
        </div>
      </section>
    </div>
  );
}
