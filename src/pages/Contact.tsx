import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full bg-white pb-20">
      <div className="bg-primary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch to schedule an appointment or ask any questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Our Location</h3>
                    <p className="text-gray-600 mt-1">Flat No. 289, Lifetime Smiles Dental Clinic, near Pax Hotel And Residency,<br/>Pocket 3C, Pocket 4, Sector 16B Dwarka, Dwarka, New Delhi, Delhi, 110078</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Phone Number</h3>
                    <p className="text-gray-600 mt-1">General: 8851865995<br/>Emergency: 8810286009</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-light text-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">hello@enamelcare.com<br/>appointments@enamelcare.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-bold text-xl text-gray-900">Working Hours</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex justify-between"><span>Monday - Friday</span> <span>8:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday</span> <span>9:00 AM - 2:00 PM</span></li>
                <li className="flex justify-between font-medium text-gray-900"><span>Sunday</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
