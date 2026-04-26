import React from 'react';
import { DEPARTMENTS, DOCTORS } from '../data';

export default function Departments() {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Departments</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Meet the specialized teams dedicated to different aspects of your oral health.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {DEPARTMENTS.map(dept => {
            const deptDoctors = DOCTORS.filter(d => d.department === dept.id);
            return (
              <div key={dept.id} id={dept.id} className="scroll-mt-24">
                <div className="flex flex-col md:flex-row gap-4 mb-12 border-b border-gray-100 pb-8">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{dept.name}</h2>
                    <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">{dept.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {deptDoctors.map(doc => (
                    <div key={doc.id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                      <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                        <img 
                          src={doc.image} 
                          alt={doc.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900">{doc.name}</h3>
                        <p className="text-sm text-primary font-medium mt-1">{doc.title}</p>
                      </div>
                    </div>
                  ))}
                  {deptDoctors.length === 0 && (
                    <p className="text-gray-500 italic col-span-full">Doctors for this department will be listed soon.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
