import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';
import { Button } from './Button';
import { SectionId } from '../types';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark'); // Default to dark
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollTo = (id: SectionId) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollTo(SectionId.HOME)}
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary p-[1px]">
            <div className="h-full w-full bg-white dark:bg-slate-950 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
               <Cpu className="text-slate-900 dark:text-white h-6 w-6" />
            </div>
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Digital Complement</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollTo(SectionId.DEMO)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors">AI Demo</button>
          <button onClick={() => scrollTo(SectionId.INDUSTRIES)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors">Industries</button>
          <button onClick={() => scrollTo(SectionId.CONTACT)} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors">Contact</button>
          
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Button size="sm" onClick={() => scrollTo(SectionId.CONTACT)}>Get a Quote</Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-slate-900 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl">
          <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-left text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white">Services</button>
          <button onClick={() => scrollTo(SectionId.DEMO)} className="text-left text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white">AI Demo</button>
          <button onClick={() => scrollTo(SectionId.INDUSTRIES)} className="text-left text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white">Industries</button>
          <button onClick={() => scrollTo(SectionId.CONTACT)} className="text-left text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white">Contact</button>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
             <Button fullWidth onClick={() => scrollTo(SectionId.CONTACT)}>Get a Quote</Button>
          </div>
        </div>
      )}
    </header>
  );
};