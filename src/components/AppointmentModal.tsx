import React, { useState, useEffect } from 'react';
import { X, Calendar, User as UserIcon, Phone, Mail, Clock, AlertCircle, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { DEPARTMENTS, DOCTORS } from '../data';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

export default function AppointmentModal({ isOpen, onClose, onOpenAuth }: AppointmentModalProps) {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Prefill when user changes
  useEffect(() => {
    if (user) {
      const names = (user.displayName || '').split(' ');
      setFirstName(names[0] || '');
      setLastName(names.slice(1).join(' ') || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleDeptSelect = (deptId: string) => {
    setSelectedDept(deptId);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'appointments'), {
        userId: user.uid,
        departmentId: selectedDept,
        firstName,
        lastName,
        phone,
        email,
        date,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Send confirmation email via serverless function
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: `${firstName} ${lastName}`,
            date,
            department: selectedDept
          })
        });
      } catch (emailErr) {
        
        // We don't block the user if email fails
      }

      setStep(3);
    } catch (err: any) {
      
      if (err?.code?.includes('permission-denied') || err?.message?.includes('Missing or insufficient permissions')) {
        setError('Firestore Rules are blocking database writes. Please update your Rules in the Firebase Console: allow read, write: if request.auth != null;');
      } else {
        setError(err.message || 'Failed to book appointment.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Book Appointment</h3>
            <p className="text-sm text-gray-500 mt-1">Take the first step to your new smile.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Department</label>
                <div className="grid grid-cols-2 gap-3">
                  {DEPARTMENTS.map(dept => (
                    <button
                      key={dept.id}
                      onClick={() => handleDeptSelect(dept.id)}
                      className="text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary-light/50 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <span className="block font-medium text-gray-900">{dept.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && !user && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Sign in to book</h4>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                You must be logged in to your account to book and manage appointments.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setStep(1)}
                  className="text-gray-500 hover:text-gray-900 px-6 py-2.5 rounded-full font-medium transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="bg-primary text-white px-8 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors"
                >
                  Sign In / Sign Up
                </button>
              </div>
            </div>
          )}

          {step === 2 && user && (
            <form className="space-y-4 pt-2" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3 flex gap-2 items-start text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <UserIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="John" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input required type="text" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <Calendar className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="text-gray-500 hover:text-gray-900 px-4 py-2.5 rounded-full font-medium transition-colors"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h4>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                Thank you for choosing LifeTime Smiles Clinic. Our team will contact you shortly to confirm your appointment time.
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href={`https://www.google.com/calendar/render?action=TEMPLATE&text=Dental+Appointment+at+LifeTime+Smiles+Clinic&dates=${date.replace(/-/g, '')}T090000Z/${date.replace(/-/g, '')}T100000Z&details=Appointment+for+${firstName}+${lastName}+at+LifeTime+Smiles+Clinic.&location=Flat+No.+289,+Sector+16B+Dwarka,+New+Delhi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Add to Google Calendar
                </a>
                <button 
                  onClick={() => {
                    setStep(1);
                    onClose();
                    navigate('/appointments');
                  }}
                  className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  View My Appointments
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
