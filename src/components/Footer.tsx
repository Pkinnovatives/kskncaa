import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white text-slate-950 flex items-center justify-center font-serif font-bold rounded">KS</div>
                <span className="font-serif font-bold text-2xl tracking-tight">K S K N</span>
              </div>
              <span className="text-xs text-slate-500 uppercase tracking-[0.2em] font-medium">And Associates LLP</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering your next financial breakthrough with trusted audit, taxation and advisory expertise. Committed to integrity and excellence since 2003.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-white text-sm transition-colors">Services</Link></li>
              <li><Link to="/careers" className="text-slate-400 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link to="/articles" className="text-slate-400 hover:text-white text-sm transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors mr-3 mt-0.5" />
                <span className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  No 25/10A Western Apartments,<br />Thirumangalam, Chennai
                </span>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors mr-3" />
                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">044 46141986</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors mr-3" />
                <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">admin@ksknassociatesllp.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 K S K N AND ASSOCIATES LLP. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs font-medium">
            Designed by PK Innovatives
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
