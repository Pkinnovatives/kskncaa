import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, CheckCircle, AlertCircle, Briefcase, GraduationCap, Users, TrendingUp, MapPin, Clock } from 'lucide-react';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import { AccordionItem } from '../components/ui/Accordion';
import { useAuth } from '../context/AuthContext';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

interface CareerFormInputs {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
}

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  createdAt?: any;
  isActive?: boolean;
}

const Careers = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<CareerFormInputs>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Wait for auth to initialize (even if anonymous) before fetching
    if (authLoading) return;

    // Query all jobs and filter client-side to avoid potential index/permission issues with where clause
    const q = query(collection(db, 'jobs'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedJobs: Job[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only include active jobs
        if (data.isActive === true) {
          fetchedJobs.push({ id: doc.id, ...data } as Job);
        }
      });
      
      // Sort by createdAt desc (client-side)
      fetchedJobs.sort((a: any, b: any) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      });
      
      setJobs(fetchedJobs);
      setLoadingJobs(false);
    }, (error) => {
      setLoadingJobs(false);
      handleFirestoreError(error, OperationType.GET, 'jobs');
    });

    return () => unsubscribe();
  }, [authLoading, user]);

  const onSubmit = async (data: CareerFormInputs) => {
    try {
      // Save application to Firestore
      await addDoc(collection(db, 'job_applications'), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message || '',
        createdAt: serverTimestamp(),
      });

      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit application. Please try again.');
    }
  };

  const benefits = [
    { title: 'Continuous Learning', desc: 'Regular training sessions and workshops.', icon: GraduationCap },
    { title: 'Mentorship', desc: 'Direct guidance from experienced CAs.', icon: Users },
    { title: 'Industry Exposure', desc: 'Work with clients across diverse sectors.', icon: Briefcase },
    { title: 'Professional Growth', desc: 'Clear career path and growth opportunities.', icon: TrendingUp },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            Build your career with a firm driven by excellence, integrity, and innovation.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-7">
            <div className="mb-16">
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Why Join Us</span>
              <h2 className="text-3xl font-bold text-slate-900 font-serif mt-3 mb-8">Work Culture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-serif mb-6">Open Positions</h2>
              <div className="space-y-4">
                {loadingJobs ? (
                  <div className="text-center py-8 text-slate-500">Loading open positions...</div>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <AccordionItem 
                      key={job.id} 
                      title={job.title}
                      className="border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5 text-blue-500" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                            {job.type}
                          </div>
                        </div>
                        
                        <div className="prose prose-sm max-w-none text-slate-600">
                          <p className="whitespace-pre-line">{job.description}</p>
                        </div>
                        
                        <div className="pt-2">
                          <button 
                            onClick={() => {
                              setValue('position', job.title);
                              const formElement = document.getElementById('application-form');
                              formElement?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="text-blue-600 font-bold text-sm hover:underline"
                          >
                            Apply for this position
                          </button>
                        </div>
                      </div>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 text-slate-500">
                    No open positions at the moment. Please check back later.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-5">
            <div id="application-form" className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl shadow-slate-200/50 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-900 font-serif mb-2">Apply Now</h2>
              <p className="text-slate-500 mb-8 text-sm">Submit your application and we'll get back to you.</p>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Application Received</h3>
                  <p className="mb-6 text-sm opacity-80">Thank you for your interest. We will review your application and get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="text-sm font-bold underline hover:text-green-900"
                  >
                    Submit another application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Position Applied For</label>
                    <div className="relative">
                      <select
                        {...register('position', { required: 'Position is required' })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
                      >
                        <option value="">Select a position</option>
                        {jobs.map(job => (
                          <option key={job.id} value={job.title}>{job.title}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Cover Letter / Message (Optional)</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="Tell us why you're a good fit..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-900/20 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
