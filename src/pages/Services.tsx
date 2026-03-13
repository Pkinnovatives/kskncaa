import React from 'react';
import { Accordion } from '../components/ui/Accordion';
import { motion } from 'framer-motion';
import { Shield, FileText, TrendingUp, DollarSign, Briefcase } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      title: 'Audit & Assurance',
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            We provide independent and objective assurance services that enhance the reliability of information used by investors, creditors, and other stakeholders.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Statutory Audit', desc: 'Compliance with Companies Act' },
              { label: 'Internal Audit', desc: 'Process & control evaluation' },
              { label: 'Tax Audit', desc: 'Income Tax Act compliance' },
              { label: 'Management Audit', desc: 'Performance analysis' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.label}</strong>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Accounting & Bookkeeping',
      icon: <FileText className="h-5 w-5 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Streamlined accounting services to ensure your financial records are accurate, up-to-date, and compliant with regulatory standards.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Ledger Maintenance', desc: 'Daily transaction recording' },
              { label: 'Financial Statements', desc: 'Balance Sheet & P&L' },
              { label: 'MIS Reporting', desc: 'Customized management reports' },
              { label: 'Payroll Management', desc: 'End-to-end processing' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.label}</strong>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Tax Advisory',
      icon: <TrendingUp className="h-5 w-5 text-amber-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Strategic tax planning and advisory services to optimize your tax liabilities while ensuring full compliance with the law.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Corporate Tax Planning', desc: 'Strategic liability optimization' },
              { label: 'GST Advisory', desc: 'Registration & filing support' },
              { label: 'International Taxation', desc: 'Cross-border & DTAA' },
              { label: 'Transfer Pricing', desc: 'Related party transactions' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.label}</strong>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Income Tax Compliance',
      icon: <DollarSign className="h-5 w-5 text-indigo-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Expert handling of all income tax related matters, from routine filings to complex representation before authorities.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'ITR Filing', desc: 'Individual & Corporate returns' },
              { label: 'TDS / TCS Compliance', desc: 'Quarterly returns & certificates' },
              { label: 'Representation Services', desc: 'Before tax authorities' },
              { label: 'Search & Seizure Cases', desc: 'Expert legal handling' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.label}</strong>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: 'Business & Financial Advisory',
      icon: <Briefcase className="h-5 w-5 text-purple-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Holistic business advisory services to help you navigate complex financial landscapes and achieve your strategic goals.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { label: 'Capital Restructuring', desc: 'Optimizing debt/equity mix' },
              { label: 'Mergers & Acquisitions', desc: 'Valuation & due diligence' },
              { label: 'Project Financing', desc: 'Fund raising assistance' },
              { label: 'Business Valuation', desc: 'Investment & sale valuation' }
            ].map((item, idx) => (
              <li key={idx} className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                <div>
                  <strong className="block text-slate-900 text-sm">{item.label}</strong>
                  <span className="text-slate-500 text-xs">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            Comprehensive financial solutions tailored to your business needs.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12 flex items-start"
        >
          <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm uppercase tracking-wide mb-1">ICAI Compliance Notice</h3>
            <p className="text-blue-800/80 text-sm leading-relaxed">
              In strict compliance with the Institute of Chartered Accountants of India (ICAI) Code of Ethics, we do not advertise our services. The information below is provided solely for the purpose of presenting our areas of expertise to existing clients and those who specifically request it. Please click on a category to view details.
            </p>
          </div>
        </motion.div>

        <div className="space-y-6">
          <Accordion items={servicesList} allowMultiple={true} />
        </div>
      </div>
    </div>
  );
};

export default Services;
