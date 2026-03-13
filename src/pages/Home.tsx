import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Award, Briefcase, Clock, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { AccordionItem } from '../components/ui/Accordion';

const Home = () => {
  const stats = [
    { label: 'Years Experience', value: '23+', icon: Clock },
    { label: 'Awards & Recognitions', value: '20+', icon: Award },
    { label: 'Professional Consultants', value: '50+', icon: Users },
    { label: 'Satisfied Clients', value: '200+', icon: Briefcase },
  ];

  const features = [
    { title: 'Expert Team', description: 'Dedicated professionals with deep industry knowledge.', icon: Users },
    { title: 'Cost Saving', description: 'Strategic financial planning to maximize your savings.', icon: TrendingUp },
    { title: 'Insight Driven', description: 'Data-backed decisions for continuous improvement.', icon: CheckCircle },
    { title: '24/7 Support', description: 'Round the clock professional assistance when you need it.', icon: Shield },
  ];

  const services = [
    {
      title: 'Audit & Assurance',
      content: 'Comprehensive statutory, internal, and management audits ensuring compliance and operational efficiency.'
    },
    {
      title: 'Accounting & Bookkeeping',
      content: 'End-to-end ledger maintenance, financial statement preparation, and MIS reporting.'
    },
    {
      title: 'Tax Advisory',
      content: 'Strategic corporate tax planning, GST advisory, and international taxation services.'
    },
    {
      title: 'Income Tax Compliance',
      content: 'Expert handling of ITR filing, TDS/TCS compliance, and representation in search & seizure cases.'
    },
    {
      title: 'Business Advisory',
      content: 'Capital restructuring, M&A support, project financing, and business valuation services.'
    }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 z-10" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-24 right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-blue-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
                Trusted by 200+ Enterprises
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight mb-6 leading-[1.1]">
                Financial <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Excellence</span> <br/>
                Redefined.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg font-light">
                K S K N And Associates LLP empowers your business with precision audit, strategic taxation, and visionary advisory services.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link 
                  to="/services" 
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center shadow-lg shadow-white/10 hover:shadow-white/20 transform hover:-translate-y-1"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Visual/Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <Clock className="h-8 w-8 text-blue-400 mb-3" />
                    <div className="text-3xl font-bold text-white">23+</div>
                    <div className="text-sm text-slate-400">Years of Excellence</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <Users className="h-8 w-8 text-indigo-400 mb-3" />
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-slate-400">Expert Consultants</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
                    <Briefcase className="h-8 w-8 text-emerald-400 mb-3" />
                    <div className="text-3xl font-bold text-white">200+</div>
                    <div className="text-sm text-slate-400">Satisfied Clients</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <Award className="h-8 w-8 text-amber-400 mb-3" />
                    <div className="text-3xl font-bold text-white">20+</div>
                    <div className="text-sm text-slate-400">Industry Awards</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Who We Are</span>
              <h2 className="text-4xl font-bold text-slate-900 font-serif mt-3 mb-6">About Us</h2>
              <div className="w-20 h-1.5 bg-blue-600 mb-8"></div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                K S K N And Associates LLP is a firm of Chartered Accountants with a legacy. Headquartered in Chennai, we bring decades of experience, strong professional values, and deep industry insight to every client engagement.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                With a growing presence across India and beyond, we combine traditional expertise with modern technology to deliver value-driven, customized solutions across diverse industry sectors. Our approach blends professionalism with personal attention, ensuring practical outcomes and long-term partnerships.
              </p>
              <Link 
                to="/about" 
                className="group inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 transition-colors text-lg"
              >
                Read More 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                  alt="Office environment" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-50 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-slate-50 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Clean Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Advantage</span>
            <h2 className="text-4xl font-bold text-slate-900 font-serif mt-3 mb-6">Why Industry Leaders Choose Us</h2>
            <p className="text-slate-500 text-lg">We combine traditional values with modern financial strategies to deliver unparalleled results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                  <feature.icon className="h-7 w-7 text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview (Pull Model) - Modern Accordion */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Our Expertise</span>
              <h2 className="text-4xl font-bold text-slate-900 font-serif mt-3 mb-6">Comprehensive Financial Solutions</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                We offer a wide range of services tailored to meet the unique needs of your business. From compliance to strategic advisory, we have you covered.
              </p>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  ICAI Compliance
                </h4>
                <p className="text-sm text-slate-500">
                  In adherence to the code of ethics, specific details of our services are available upon request. Click the sections to explore.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <AccordionItem key={index} title={service.title} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-slate-600 mb-4 leading-relaxed">{service.content}</p>
                  <Link to="/services" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center text-sm group">
                    Learn more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries - Marquee */}
      <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white font-serif mb-6">Ready to transform your financial future?</h2>
          <p className="text-xl text-slate-300 mb-10">Connect with our experts today for a consultation tailored to your business needs.</p>
          <Link 
            to="/contact" 
            className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors inline-block shadow-lg shadow-white/10"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
