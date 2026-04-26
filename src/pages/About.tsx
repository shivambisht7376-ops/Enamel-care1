import React from 'react';
import { DOCTORS } from '../data';

export default function About() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About LifeTime Smiles Clinic</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of dedicated dental professionals committed to providing the highest quality care in a comfortable, state-of-the-art environment.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <img 
            src="/assets/team.png" 
            alt="Dental team working" 
            referrerPolicy="no-referrer"
            className="rounded-[2.5rem] shadow-xl w-full h-[500px] object-cover"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Story & Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2010, LifeTime Smiles Clinic was built on a simple premise: dentistry should be an empowering experience, not a source of anxiety. We designed our clinic to blend medical excellence with a warm, welcoming ambiance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to merge advanced dental technology—like 3D scanning and digital smile design—with compassionate, patient-first care. We believe a healthy smile is the foundation of overall wellness.
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
            <img src="/assets/hero.png" className="rounded-2xl h-48 w-full object-cover" referrerPolicy="no-referrer" alt="Clinic 1" />
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop" className="rounded-2xl h-48 w-full object-cover md:col-span-2" referrerPolicy="no-referrer" alt="Clinic 2" />
            <img src="/assets/tech.png" className="rounded-2xl h-48 w-full object-cover" referrerPolicy="no-referrer" alt="Clinic 3" />
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Specialists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our specialists are globally recognized and constantly updating their knowledge with the latest in dental science.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {DOCTORS.map((doc: any) => (
              <div key={doc.id} className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-48 h-48 rounded-[2rem] overflow-hidden flex-shrink-0 border-4 border-gray-50 shadow-inner">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{doc.name}</h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest">{doc.specialization || doc.title}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic mb-4">
                    "{doc.bio || 'Dedicated to providing exceptional dental care and creating beautiful smiles.'}"
                  </p>
                  <div className="flex justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium uppercase tracking-tighter">{doc.department}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
