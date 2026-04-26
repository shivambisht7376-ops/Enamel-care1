import React from 'react';
import { DOCTORS } from '../data';

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Enamel Care</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of dedicated dental professionals committed to providing the highest quality care in a comfortable, state-of-the-art environment.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <img 
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1200&auto=format&fit=crop" 
            alt="Dental team working" 
            referrerPolicy="no-referrer"
            className="rounded-[2.5rem] shadow-xl w-full h-[500px] object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story & Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2010, Enamel Care was built on a simple premise: dentistry shouldn't be scary. We saw too many patients avoiding necessary care due to anxiety, so we designed a clinic that feels more like a spa than a medical office.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to merge advanced dental technology with compassionate, patient-first care. We believe a healthy smile is the foundation of overall wellness.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 mt-6 border-t border-gray-100">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">15+</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">5k+</p>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Happy Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Clinic Ambiance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Take a look inside our modern facility designed for your comfort and peace of mind.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover" referrerPolicy="no-referrer" alt="Clinic 1" />
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover md:col-span-2" referrerPolicy="no-referrer" alt="Clinic 2" />
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover" referrerPolicy="no-referrer" alt="Clinic 3" />
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet The Experts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our specialists are globally recognized and constantly updating their knowledge.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="group">
                <div className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white mb-6 w-full pt-[100%] shadow-sm">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center">{doc.name}</h3>
                <p className="text-primary font-medium text-center">{doc.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
