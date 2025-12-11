import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { SectionId } from '../types';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Digital Complement</h3>
            <p className="max-w-xs text-sm leading-relaxed">
              Empowering real estate and small businesses with the intelligence of tomorrow, today. Your partner in automation and digital excellence.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => document.getElementById(SectionId.HOME)?.scrollIntoView({behavior: 'smooth'})} className="hover:text-brand-primary transition-colors">Home</button></li>
              <li><button onClick={() => document.getElementById(SectionId.SERVICES)?.scrollIntoView({behavior: 'smooth'})} className="hover:text-brand-primary transition-colors">Services</button></li>
              <li><button onClick={() => document.getElementById(SectionId.INDUSTRIES)?.scrollIntoView({behavior: 'smooth'})} className="hover:text-brand-primary transition-colors">Industries</button></li>
              <li><button onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({behavior: 'smooth'})} className="hover:text-brand-primary transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors shadow-sm border border-slate-200 dark:border-slate-800"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors shadow-sm border border-slate-200 dark:border-slate-800"><Twitter size={20} /></a>
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white transition-colors shadow-sm border border-slate-200 dark:border-slate-800"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Digital Complement. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};