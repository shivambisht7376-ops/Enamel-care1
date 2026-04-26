import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, where } from 'firebase/firestore';
import { Calendar, Clock, AlertCircle, Search, ShieldCheck, Plus, CheckCircle2, XCircle, Filter, Users, UserX, UserCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { DEPARTMENTS } from '../data';
import AdminBookingModal from '../components/AdminBookingModal';

interface Appointment {
  id: string;
  departmentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  createdAt: any;
}

interface UserDoc {
  uid: string;
  name: string;
  email: string;
  blocked?: boolean;
  createdAt: any;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'appointments' | 'users'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<UserDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchAppointments = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const q = query(collection(db, 'appointments'));
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
      setError('');
    } catch (err: any) {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const usersData: UserDoc[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ ...doc.data() } as UserDoc);
      });
      setUsers(usersData);
    } catch (err) {
    }
  };

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchUsers();
    }
  }, [user, activeTab]);

  const handleBlockUser = async (uid: string, currentBlocked: boolean) => {
    if (!window.confirm(`Are you sure you want to ${currentBlocked ? 'unblock' : 'block'} this user?`)) return;
    try {
      await updateDoc(doc(db, 'users', uid), { blocked: !currentBlocked });
      setUsers(users.map(u => u.uid === uid ? { ...u, blocked: !currentBlocked } : u));
    } catch (err) {
      alert("Failed to update user status.");
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status: newStatus });
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      alert("Failed to update status. Check permissions.");
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDepartment('');
    setFilterStatus('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  if (!user || user.email !== 'shivamzi953@gmail.com') {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <ShieldCheck className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal Restricted</h2>
        <p className="text-gray-500">You do not have administrator privileges to access this area.</p>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(app => {
    const searchString = `${app.firstName} ${app.lastName} ${app.email} ${app.phone}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    
    const matchesDept = filterDepartment ? app.departmentId === filterDepartment : true;
    
    const matchesStatus = filterStatus ? app.status === filterStatus : true;
    
    let matchesStartDate = true;
    let matchesEndDate = true;
    if (filterStartDate && app.date) {
      matchesStartDate = app.date >= filterStartDate;
    }
    if (filterEndDate && app.date) {
      matchesEndDate = app.date <= filterEndDate;
    }

    return matchesSearch && matchesDept && matchesStatus && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="w-8 h-8 text-primary" /> Admin Portal
              </h1>
              <p className="text-gray-600">Manage all clinic appointments and schedules.</p>
            </div>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" /> Book Patient
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl flex items-start gap-4 mb-8">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-bold">Access Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex flex-col gap-4 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div className="flex bg-white p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === 'appointments' ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === 'users' ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  Patients
                </button>
              </div>
              <div className="flex gap-2 items-center">
                {activeTab === 'appointments' && (
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-1.5 flex items-center gap-2 text-sm font-medium rounded-lg border transition-colors ${showFilters ? 'bg-primary-light/30 border-primary text-primary' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Filter className="w-4 h-4" /> Filters
                  </button>
                )}
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <div className="relative lg:col-span-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search patient..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  />
                </div>
                
                <select 
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
                >
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>

                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 lg:col-span-2">
                  <input 
                    type="date" 
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
                  />
                  <span className="text-gray-500 text-sm hidden sm:inline">to</span>
                  <input 
                    type="date" 
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-gray-700"
                  />
                  {(searchTerm || filterDepartment || filterStatus || filterStartDate || filterEndDate) && (
                    <button 
                      onClick={clearFilters}
                      className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 hover:text-red-600 font-medium transition-colors ml-auto sm:ml-0 mt-2 sm:mt-0"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {!showFilters && (
               <div className="relative max-w-sm w-full -mt-10 self-end pointer-events-auto">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search patient, email, phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                />
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-900 text-sm">User</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Email</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Joined</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Status</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.uid} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{u.name}</td>
                      <td className="p-4 text-gray-600 text-sm">{u.email}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase
                          ${u.blocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}
                        `}>
                          {u.blocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleBlockUser(u.uid, !!u.blocked)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                            u.blocked ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-red-50 text-red-600 hover:bg-red-100"
                          )}
                        >
                          {u.blocked ? <><UserCheck className="w-3.5 h-3.5" /> Unblock</> : <><UserX className="w-3.5 h-3.5" /> Block Account</>}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredAppointments.length === 0 && !error ? (
            <div className="p-12 text-center text-gray-500">
              No appointments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="p-4 font-semibold text-gray-900 text-sm">Patient info</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Department</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Date</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Status</th>
                    <th className="p-4 font-semibold text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((app) => {
                    const dept = DEPARTMENTS.find(d => d.id === app.departmentId);
                    
                    return (
                      <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{app.firstName} {app.lastName}</div>
                          <div className="text-xs text-gray-500 flex flex-col mt-0.5">
                            <span>{app.email}</span>
                            <span>{app.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-700 text-sm">{dept ? dept.name : app.departmentId}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-gray-700 text-sm font-medium">
                            <Calendar className="w-4 h-4 text-primary" />
                            {app.date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(app.date)) : 'N/A'}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider
                            ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${app.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                            ${app.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}
                            ${app.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {app.status || 'pending'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <select 
                              value={app.status || 'pending'}
                              onChange={(e) => handleStatusChange(app.id, e.target.value)}
                              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white font-medium"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirm</option>
                              <option value="completed">Complete</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <AdminBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        onSuccess={fetchAppointments} 
      />
    </div>
  );
}
