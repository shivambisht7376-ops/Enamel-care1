import React from 'react';
import { DEPARTMENTS } from '../data';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="w-full">
      <div className="bg-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We provide a full spectrum of dental treatments under one roof. No need to visit multiple specialists—our extensive team has you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {DEPARTMENTS.map((dept, index) => (
              <div key={dept.id} className="flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-shadow shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex justify-center items-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{dept.name}</h2>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                  {dept.description}  Whether it is a routine checkup or a complex procedure, our skilled professionals use advanced techniques to ensure optimal comfort and results.
                </p>
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Sample specific treatment {i}
                    </li>
                  ))}
                </ul>
                <Link to={`/departments#${dept.id}`} className="text-primary font-semibold hover:text-primary-dark transition-colors inline-block mt-auto">
                  View Doctors &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
