import React from 'react';
import { FileText, Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const Articles = () => {
  const articles = [
    {
      title: "Understanding the New Tax Regime vs Old Tax Regime",
      date: "March 15, 2026",
      category: "Taxation",
      summary: "A comprehensive analysis of the benefits and drawbacks of the new tax regime for salaried employees.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
    },
    {
      title: "GST Compliance Checklist for FY 2025-26",
      date: "February 28, 2026",
      category: "GST",
      summary: "Key compliance dates and documentation requirements for businesses to ensure smooth GST filing.",
      image: "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Impact of Digital Rupee on Business Transactions",
      date: "January 10, 2026",
      category: "Finance",
      summary: "How the CBDC (Central Bank Digital Currency) is reshaping B2B settlements in India.",
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
    },
    {
      title: "Corporate Social Responsibility: New Amendments",
      date: "December 05, 2025",
      category: "Compliance",
      summary: "Recent changes in CSR spending mandates and reporting for listed companies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            Knowledge Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
          >
            Stay updated with the latest in taxation, compliance, and financial trends.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((article, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center shadow-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-slate-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  {article.date}
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif leading-tight group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                  {article.summary}
                </p>
                
                <button className="text-slate-900 font-bold text-sm hover:text-blue-600 inline-flex items-center mt-auto group/btn">
                  Read Full Article 
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
