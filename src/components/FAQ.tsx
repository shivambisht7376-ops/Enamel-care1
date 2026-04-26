import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQS = [
  { 
    q: "Do you accept dental insurance?", 
    a: "Yes, we accept most major dental insurance providers including Cigna, MetLife, Aetna, and Delta Dental. Our dedicated team will handle all the paperwork and help you maximize your benefits.",
    category: "General"
  },
  { 
    q: "How often should I visit the dentist?", 
    a: "For most patients, we recommend a professional cleaning and examination every six months. However, depending on your oral health status, we may suggest more frequent visits.",
    category: "Preventive"
  },
  { 
    q: "Is the clinic equipped for dental emergencies?", 
    a: "Absolutely. We prioritize emergency cases and offer same-day appointments for severe toothaches, broken teeth, or lost fillings. Please call us immediately if you have an emergency.",
    category: "Emergency"
  },
  { 
    q: "What should I bring to my first appointment?", 
    a: "Please bring a valid ID, your insurance card, and any recent dental X-rays if you have them. We also recommend arriving 10 minutes early to fill out any necessary health forms.",
    category: "General"
  },
  { 
    q: "Do you offer teeth whitening?", 
    a: "Yes, we offer both in-office professional whitening and take-home kits. Our in-office treatment can brighten your smile by several shades in just one visit.",
    category: "Cosmetic"
  },
  { 
    q: "Are dental X-rays safe?", 
    a: "Yes. We use digital X-rays, which emit significantly less radiation than traditional film X-rays. They are an essential tool for diagnosing issues that aren't visible to the naked eye.",
    category: "Technology"
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for questions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-gray-700"
        />
      </div>

      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={cn(
                "group rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === idx ? "border-primary bg-primary/5 shadow-md" : "border-gray-100 bg-white hover:border-primary/20 shadow-sm"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold uppercase",
                    openIndex === idx ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                  )}>
                    {faq.category[0]}
                  </span>
                  <span className={cn(
                    "font-bold transition-colors",
                    openIndex === idx ? "text-primary" : "text-gray-900"
                  )}>
                    {faq.q}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  openIndex === idx ? "rotate-180 text-primary" : "text-gray-400"
                )} />
              </button>
              
              <div className={cn(
                "px-6 transition-all duration-300 ease-in-out",
                openIndex === idx ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
              )}>
                <p className="text-gray-600 leading-relaxed border-t border-primary/10 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">No questions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
