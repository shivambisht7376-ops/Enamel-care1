import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { DEPARTMENTS } from '../data';

interface Appointment {
  id: string;
  departmentId: string;
  date: string;
  status: string;
  createdAt: any;
}

export default function Appointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAppointments() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const appsData: Appointment[] = [];
        querySnapshot.forEach((doc) => {
          appsData.push({ id: doc.id, ...doc.data() } as Appointment);
        });
        
        appsData.sort((a, b) => {
          const aTime = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
          return bTime - aTime;
        });
        
        setAppointments(appsData);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please ensure you are connected.");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [user]);

  const handleCancelAppointment = async (id: string, currentStatus: string) => {
    if (currentStatus !== 'pending' && currentStatus !== 'confirmed') return;
    
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: 'cancelled'
      });
      // Update local state
      setAppointments(prev => prev.map(app => 
        app.id === id ? { ...app, status: 'cancelled' } : app
      ));
    } catch (err: any) {
      console.error("Error cancelling appointment:", err);
      if (err?.code?.includes('permission-denied') || err?.message?.includes('Missing or insufficient permissions')) {
          alert('Firestore rules are preventing this action. Ensure allow update: if request.auth != null.');
      } else {
          alert('Failed to cancel appointment. Please try again.');
      }
    }
  };

  if (!user) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view appointments</h2>
        <p className="text-gray-500">Please sign in to view your appointment history.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="bg-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Appointments</h1>
          <p className="text-lg text-gray-600">Track and manage your upcoming and past visits.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Error</h3>
              <p>{error}</p>
            </div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-500 mb-6">When you book an appointment, it will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-900">Department</th>
                    <th className="p-4 font-semibold text-gray-900">Date</th>
                    <th className="p-4 font-semibold text-gray-900">Status</th>
                    <th className="p-4 font-semibold text-gray-900">Booked On</th>
                    <th className="p-4 font-semibold text-gray-900 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => {
                    const dept = DEPARTMENTS.find(d => d.id === app.departmentId);
                    const createdAtDate = app.createdAt?.toDate ? app.createdAt.toDate() : new Date();
                    
                    return (
                      <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{dept ? dept.name : app.departmentId}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-primary" />
                            {app.date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(app.date)) : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                            ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${app.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                            ${app.status === 'completed' ? 'bg-gray-100 text-gray-700' : ''}
                            ${app.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(createdAtDate)}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          {(app.status === 'pending' || app.status === 'confirmed') && (
                            <button
                              onClick={() => handleCancelAppointment(app.id, app.status)}
                              className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors inline-block"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
