import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Articles', href: '/articles' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 ease-in-out",
        scrolled || isOpen ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={cn(
                "w-10 h-10 flex items-center justify-center font-serif font-bold text-xl rounded-lg transition-colors duration-300",
                scrolled || isOpen ? "bg-slate-900 text-white" : "bg-white text-slate-900 shadow-lg"
              )}>
                KS
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  "font-serif font-bold leading-none text-lg transition-colors duration-300",
                  scrolled || isOpen ? "text-slate-900" : "text-white"
                )}>
                  K S K N
                </span>
                <span className={cn(
                  "text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300",
                  scrolled || isOpen ? "text-slate-500" : "text-slate-300"
                )}>
                  And Associates LLP
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive(item.href)
                    ? (scrolled ? "bg-slate-100 text-slate-900" : "bg-white/20 text-white backdrop-blur-sm")
                    : (scrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-slate-200 hover:text-white hover:bg-white/10")
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/login"
              className={cn(
                "ml-4 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg",
                scrolled 
                  ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20" 
                  : "bg-white text-slate-900 hover:bg-slate-100"
              )}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-2 rounded-md transition-colors",
                scrolled || isOpen ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
              )}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-slate-50 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-slate-900 text-white px-5 py-3 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
