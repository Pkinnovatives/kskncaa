import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, Timestamp, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { LogOut, Mail, Calendar, User, Phone, MessageSquare, Search, RefreshCw, Briefcase, FileText, Plus, Trash2, CheckCircle, XCircle, ExternalLink, Edit2, MoreVertical, Users } from 'lucide-react';
import { format } from 'date-fns';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  isActive: boolean;
  createdAt: Timestamp;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  status?: 'New' | 'Reviewed' | 'Contacted' | 'Rejected';
  createdAt: Timestamp;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  bio: string;
  expertise: string[];
  credentials: string[];
  photoBase64: string;
  createdAt: Timestamp;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'jobs' | 'applications' | 'team'>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Job Modal State
  const [showJobModal, setShowJobModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'job' | 'message' | 'application' | 'team', id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState({ title: '', location: '', type: 'Full-time', description: '', isActive: true });

  // Team Modal State
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState({
    name: '',
    designation: '',
    qualifications: '',
    bio: '',
    expertise: '',
    credentials: '',
    photoBase64: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeMessages = onSnapshot(
      query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc')), 
      (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'contact_messages');
      }
    );

    const unsubscribeJobs = onSnapshot(
      query(collection(db, 'jobs'), orderBy('createdAt', 'desc')), 
      (snapshot) => {
        setJobs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job)));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'jobs');
      }
    );

    const unsubscribeApplications = onSnapshot(
      query(collection(db, 'job_applications'), orderBy('createdAt', 'desc')), 
      (snapshot) => {
        setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application)));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'job_applications');
      }
    );

    const unsubscribeTeam = onSnapshot(
      query(collection(db, 'team'), orderBy('createdAt', 'asc')), 
      (snapshot) => {
        setTeamMembers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember)));
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'team');
      }
    );

    setLoading(false);

    return () => {
      unsubscribeMessages();
      unsubscribeJobs();
      unsubscribeApplications();
      unsubscribeTeam();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // --- JOB OPERATIONS ---

  const openAddJobModal = () => {
    setIsEditingJob(false);
    setJobForm({ title: '', location: '', type: 'Full-time', description: '', isActive: true });
    setCurrentJobId(null);
    setShowJobModal(true);
  };

  const openEditJobModal = (job: Job) => {
    setIsEditingJob(true);
    setJobForm({
      title: job.title,
      location: job.location,
      type: job.type,
      description: job.description,
      isActive: job.isActive
    });
    setCurrentJobId(job.id);
    setShowJobModal(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditingJob && currentJobId) {
        await updateDoc(doc(db, 'jobs', currentJobId), {
          ...jobForm,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'jobs'), {
          ...jobForm,
          createdAt: serverTimestamp()
        });
      }
      setShowJobModal(false);
    } catch (error) {
      console.error("Error saving job: ", error);
      setErrorMessage("Failed to save job. Please try again.");
    }
  };

  const handleDeleteJob = (id: string) => {
    if (!id) return;
    setDeleteTarget({ type: 'job', id });
  };

  const handleToggleJobStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'jobs', id), { isActive: !currentStatus });
    } catch (error) {
      console.error("Error updating job status: ", error);
      setErrorMessage("Failed to update job status. Please try again.");
    }
  };

  // --- MESSAGE OPERATIONS ---

  const handleDeleteMessage = (id: string) => {
    if (!id) return;
    setDeleteTarget({ type: 'message', id });
  };

  // --- APPLICATION OPERATIONS ---

  const handleDeleteApplication = (id: string) => {
    if (!id) return;
    setDeleteTarget({ type: 'application', id });
  };

  const handleUpdateApplicationStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'job_applications', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating application status: ", error);
      setErrorMessage("Failed to update application status. Please try again.");
    }
  };

  // --- TEAM OPERATIONS ---

  const openAddTeamModal = () => {
    setIsEditingTeam(false);
    setTeamForm({ name: '', designation: '', qualifications: '', bio: '', expertise: '', credentials: '', photoBase64: '' });
    setCurrentTeamId(null);
    setShowTeamModal(true);
  };

  const openEditTeamModal = (member: TeamMember) => {
    setIsEditingTeam(true);
    setTeamForm({
      name: member.name,
      designation: member.designation,
      qualifications: member.qualifications,
      bio: member.bio,
      expertise: member.expertise ? member.expertise.join('\n') : '',
      credentials: member.credentials ? member.credentials.join('\n') : '',
      photoBase64: member.photoBase64 || ''
    });
    setCurrentTeamId(member.id);
    setShowTeamModal(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        setErrorMessage("Image size should be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamForm({ ...teamForm, photoBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const expertiseArray = teamForm.expertise.split('\n').map(item => item.trim()).filter(item => item !== '');
      const credentialsArray = teamForm.credentials.split('\n').map(item => item.trim()).filter(item => item !== '');

      const memberData = {
        name: teamForm.name,
        designation: teamForm.designation,
        qualifications: teamForm.qualifications,
        bio: teamForm.bio,
        expertise: expertiseArray,
        credentials: credentialsArray,
        photoBase64: teamForm.photoBase64
      };

      if (isEditingTeam && currentTeamId) {
        await updateDoc(doc(db, 'team', currentTeamId), {
          ...memberData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'team'), {
          ...memberData,
          createdAt: serverTimestamp()
        });
      }
      setShowTeamModal(false);
    } catch (error) {
      console.error("Error saving team member: ", error);
      setErrorMessage("Failed to save team member. Please try again.");
    }
  };

  const handleDeleteTeamMember = (id: string) => {
    if (!id) return;
    setDeleteTarget({ type: 'team', id });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    try {
      if (type === 'job') {
        await deleteDoc(doc(db, 'jobs', id));
      } else if (type === 'message') {
        await deleteDoc(doc(db, 'contact_messages', id));
      } else if (type === 'application') {
        await deleteDoc(doc(db, 'job_applications', id));
      } else if (type === 'team') {
        await deleteDoc(doc(db, 'team', id));
      }
      setDeleteTarget(null);
    } catch (error) {
      console.error(`Error deleting ${type}: `, error);
      setErrorMessage(`Failed to delete ${type}. Please try again.`);
      setDeleteTarget(null);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApplications = applications.filter(app =>
    app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 md:h-screen sticky top-0 z-10">
        <div className="p-6">
          <h1 className="text-xl font-bold font-serif tracking-wide">Admin Panel</h1>
          <p className="text-slate-400 text-xs mt-1">Manage your website</p>
        </div>
        <nav className="px-4 space-y-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <MessageSquare className="h-5 w-5 mr-3" />
            Messages
            <span className="ml-auto bg-slate-800 text-xs py-0.5 px-2 rounded-full">{messages.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'jobs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Briefcase className="h-5 w-5 mr-3" />
            Jobs
            <span className="ml-auto bg-slate-800 text-xs py-0.5 px-2 rounded-full">{jobs.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'applications' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Applications
            <span className="ml-auto bg-slate-800 text-xs py-0.5 px-2 rounded-full">{applications.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'team' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users className="h-5 w-5 mr-3" />
            Team
            <span className="ml-auto bg-slate-800 text-xs py-0.5 px-2 rounded-full">{teamMembers.length}</span>
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center text-slate-400 hover:text-white transition-colors w-full px-4 py-2"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto pb-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'messages' && 'Inquiries'}
              {activeTab === 'jobs' && 'Job Listings'}
              {activeTab === 'applications' && 'Job Applications'}
              {activeTab === 'team' && 'Team Members'}
            </h2>
            {activeTab === 'jobs' && (
              <button
                onClick={openAddJobModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Job
              </button>
            )}
            {activeTab === 'team' && (
              <button
                onClick={openAddTeamModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Team Member
              </button>
            )}
          </div>

          {/* Search Bar (for Messages and Applications) */}
          {(activeTab === 'messages' || activeTab === 'applications') && (
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No messages found.</p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div key={msg.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex justify-between items-start mb-4 pr-10">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 flex-shrink-0">
                          {msg.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{msg.subject}</h3>
                          <p className="text-sm text-slate-500">{msg.name} • {msg.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100 whitespace-nowrap ml-2">
                        {msg.createdAt ? format(msg.createdAt.toDate(), 'MMM d, yyyy h:mm a') : 'N/A'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                      {msg.message}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-slate-500">
                      <Phone className="h-3 w-3 mr-1" /> {msg.phone}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="grid grid-cols-1 gap-6">
              {jobs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No jobs posted yet.</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">{job.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>Posted {job.createdAt ? format(job.createdAt.toDate(), 'MMM d, yyyy') : 'N/A'}</span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        onClick={() => handleToggleJobStatus(job.id, job.isActive)}
                        className={`p-2 rounded-lg transition-colors ${job.isActive ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                        title={job.isActive ? "Deactivate" : "Activate"}
                      >
                        {job.isActive ? <XCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => openEditJobModal(job)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No applications received yet.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-3">
                                  {app.name?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-slate-900">{app.name}</div>
                                  <div className="text-xs text-slate-500">{app.email}</div>
                                  <div className="text-xs text-slate-500">{app.phone}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                {app.position}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select 
                                value={app.status || 'New'}
                                onChange={(e) => handleUpdateApplicationStatus(app.id, e.target.value)}
                                className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer
                                  ${!app.status || app.status === 'New' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${app.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-800' : ''}
                                  ${app.status === 'Contacted' ? 'bg-green-100 text-green-800' : ''}
                                  ${app.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                                `}
                              >
                                <option value="New">New</option>
                                <option value="Reviewed">Reviewed</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                              {app.createdAt ? format(app.createdAt.toDate(), 'MMM d, yyyy') : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button 
                                onClick={() => handleDeleteApplication(app.id)}
                                className="text-slate-400 hover:text-red-600 transition-colors"
                                title="Delete Application"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-200">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No team members added yet.</p>
                </div>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col relative group">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => openEditTeamModal(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors bg-white shadow-sm border border-slate-100"
                        title="Edit Member"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-white shadow-sm border border-slate-100"
                        title="Delete Member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      {member.photoBase64 ? (
                        <img src={member.photoBase64} alt={member.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xl border-2 border-slate-200">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-tight">{member.name}</h3>
                        <p className="text-blue-600 text-sm font-medium">{member.designation}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 font-medium">{member.qualifications}</p>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">{member.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {member.expertise?.slice(0, 3).map((exp, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] rounded-md">
                          {exp}
                        </span>
                      ))}
                      {member.expertise?.length > 3 && (
                        <span className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] rounded-md">
                          +{member.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-white hover:text-red-200">
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Deletion</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete this {deleteTarget.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteTarget(null)} 
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Modal (Add/Edit) */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                {isEditingJob ? 'Edit Job Position' : 'Add New Job Position'}
              </h3>
              <button onClick={() => setShowJobModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSaveJob} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior Tax Consultant"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Chennai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description & Requirements</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Enter job description, responsibilities, and requirements..."
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  checked={jobForm.isActive}
                  onChange={(e) => setJobForm({ ...jobForm, isActive: e.target.checked })}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-slate-900 cursor-pointer">
                  Immediately publish this job
                </label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowJobModal(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  {isEditingJob ? 'Update Job' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Team Modal (Add/Edit) */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-slate-900">
                {isEditingTeam ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={() => setShowTeamModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSaveTeamMember} className="p-6 space-y-5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3 flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 relative group cursor-pointer">
                    {teamForm.photoBase64 ? (
                      <img src={teamForm.photoBase64} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-10 w-10 text-slate-300" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Upload Photo</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                  </div>
                  <p className="text-xs text-slate-500 text-center">Max size: 1MB. Square image recommended.</p>
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={teamForm.name}
                      onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                      placeholder="e.g. CA Karthik L"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Designation / Role</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={teamForm.designation}
                      onChange={(e) => setTeamForm({ ...teamForm, designation: e.target.value })}
                      placeholder="e.g. Managing Partner"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Meta Tag / Qualifications</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={teamForm.qualifications}
                      onChange={(e) => setTeamForm({ ...teamForm, qualifications: e.target.value })}
                      placeholder="e.g. Chartered Accountant – ICAI (2019)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">About / Bio</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  placeholder="Enter detailed biography..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Key Expertise (One per line)</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={teamForm.expertise}
                    onChange={(e) => setTeamForm({ ...teamForm, expertise: e.target.value })}
                    placeholder="Financial & Accounts Management&#10;GST & TDS Compliance&#10;Budgeting & Forecasting"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Credentials (One per line)</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={teamForm.credentials}
                    onChange={(e) => setTeamForm({ ...teamForm, credentials: e.target.value })}
                    placeholder="Fellow Chartered Accountant (FCA)&#10;M.Com – University of Madras"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  {isEditingTeam ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
