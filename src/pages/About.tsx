import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Award, Users } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/errorHandling';

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  bio: string;
  expertise: string[];
  credentials: string[];
  photoBase64: string;
}

const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'team'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        const membersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as TeamMember[];
        setTeamMembers(membersData);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.GET, 'team');
      }
    );

    return () => unsubscribe();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A Legacy of Trust, Integrity and Financial Excellence since 2003.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mt-3 mb-6">
              Architects of Financial Growth
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              K S K N And Associates LLP is a premier firm of Chartered Accountants headquartered in Chennai. With decades of collective professional experience, we deliver precision audit, taxation, and advisory services across diverse industries.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We believe in empowering our clients with financial clarity and strategic insights that drive sustainable growth. Our approach combines traditional ethical standards with modern financial strategies.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-blue-50 p-3 rounded-lg mr-4">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed">To be the premier financial architecture firm known for transforming complex fiscal challenges into sustainable growth opportunities.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-indigo-50 p-3 rounded-lg mr-4">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-600 leading-relaxed">To deliver value driven customized financial solutions through a blend of traditional expertise and modern innovation while maintaining ethical excellence.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Culture</span>
            <h2 className="text-3xl font-bold text-slate-900 font-serif mt-3">Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Integrity', desc: 'Uncompromising ethical standards in all we do.' },
              { title: 'Excellence', desc: 'Delivering superior quality and precision.' },
              { title: 'Collaboration', desc: 'Working together to achieve shared success.' },
              { title: 'Innovation', desc: 'Embracing change for better solutions.' }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <CheckCircle className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="py-12">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Leadership</span>
            <h2 className="text-3xl font-bold text-slate-900 font-serif mt-3">Meet The Team</h2>
          </div>
          
          <div className="space-y-12">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">Team members will be updated soon.</p>
              </div>
            ) : (
              teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
                >
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                      <div className="aspect-[4/5] bg-slate-100 rounded-2xl w-full flex items-center justify-center text-slate-300 relative overflow-hidden group">
                        {member.photoBase64 ? (
                          <img src={member.photoBase64} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                            <span className="text-5xl font-serif text-slate-400 font-bold">
                              {member.name ? member.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'U'}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4">
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold text-slate-900 font-serif">{member.name}</h3>
                        <p className="text-blue-600 font-medium text-lg mt-1">{member.designation}</p>
                        <p className="text-slate-500 text-sm mt-2 font-medium">{member.qualifications}</p>
                      </div>
                      
                      <p className="text-slate-600 text-lg leading-relaxed mb-8 whitespace-pre-line">
                        {member.bio}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {member.expertise && member.expertise.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                              <Target className="w-4 h-4 mr-2 text-blue-500" /> Key Expertise
                            </h4>
                            <ul className="space-y-2">
                              {member.expertise.map((item, i) => (
                                <li key={i} className="text-slate-600 text-sm flex items-start">
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {member.credentials && member.credentials.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                              <Award className="w-4 h-4 mr-2 text-amber-500" /> Credentials
                            </h4>
                            <ul className="space-y-2">
                              {member.credentials.map((item, i) => (
                                <li key={i} className="text-slate-600 text-sm flex items-start">
                                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Reach</span>
          <h2 className="text-3xl font-bold text-slate-900 font-serif mt-3">Industries We Serve</h2>
        </div>

        <div className="flex flex-col gap-12">
          {/* Row 1 */}
          <div className="flex overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            <motion.div
              className="flex gap-6 px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[
                "Aviation", "FMCG", "Technology", "Media", "Life Sciences", "Health Care", "Automotive",
                "Aviation", "FMCG", "Technology", "Media", "Life Sciences", "Health Care", "Automotive"
              ].map((item, i) => (
                <div key={i} className="flex-shrink-0 bg-slate-50 border border-slate-100 px-8 py-4 rounded-full text-slate-700 font-medium text-lg whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
                  {item}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="flex overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
            <motion.div
              className="flex gap-6 px-4"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {[
                "Infra and Constructions", "Defence", "Label Crafting", "EdTech", "Non Profit Organization", "Co-Operative Society",
                "Infra and Constructions", "Defence", "Label Crafting", "EdTech", "Non Profit Organization", "Co-Operative Society"
              ].map((item, i) => (
                <div key={i} className="flex-shrink-0 bg-slate-50 border border-slate-100 px-8 py-4 rounded-full text-slate-700 font-medium text-lg whitespace-nowrap shadow-sm hover:shadow-md transition-shadow">
                  {item}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
