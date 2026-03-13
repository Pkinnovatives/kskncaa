import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface ContactFormInputs {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'permission-error'>('idle');

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error('Error sending message:', error);
      if (error.code === 'permission-denied') {
        setSubmitStatus('permission-error');
      } else {
        setSubmitStatus('error');
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            We are here to assist you with your financial and regulatory needs.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Contact Us</span>
              <h2 className="text-3xl font-bold text-slate-900 font-serif mt-3 mb-6">We'd love to hear from you</h2>
              <p className="text-slate-600 leading-relaxed">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
              >
                <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Office Address</h3>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    No 25/10A Western Apartments,<br />
                    Thirumangalam, Chennai - 600040
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
              >
                <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Phone</h3>
                  <p className="mt-1 text-slate-600">044 46141986</p>
                  <p className="text-sm text-slate-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Mon - Fri, 9am - 6pm
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
              >
                <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Email</h3>
                  <p className="mt-1 text-slate-600">admin@ksknassociatesllp.com</p>
                </div>
              </motion.div>
            </div>

            {/* Map Placeholder - Styled */}
            <div className="mt-8 bg-slate-200 rounded-2xl h-64 w-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1748&q=80')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-center">
                  <MapPin className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium text-slate-900">Locate Us on Google Maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-100 rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 font-serif mb-8">Send us a Message</h2>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center h-full flex flex-col justify-center min-h-[400px]">
                  <CheckCircle className="h-16 w-16 mx-auto mb-6 text-green-600" />
                  <h3 className="text-2xl font-bold mb-3">Message Sent Successfully</h3>
                  <p className="text-lg opacity-80 mb-8">Thank you for contacting us. We will respond to your inquiry as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="text-green-700 font-bold underline hover:text-green-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="Your Name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        placeholder="Your Phone"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="How can we help?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                      placeholder="Tell us more about your requirements..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="flex items-center text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      Failed to send message. Please try again.
                    </div>
                  )}

                  {submitStatus === 'permission-error' && (
                    <div className="flex items-center text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-100">
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Permission Error</p>
                        <p>Your Firestore rules are blocking this request. Please update your rules in the Firebase Console to allow public writes to 'contact_messages'.</p>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-900/20 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
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

export default Contact;
