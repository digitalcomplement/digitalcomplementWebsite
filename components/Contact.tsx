import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { SectionId } from '../types';

export const Contact: React.FC = () => {
  const CONTACT_EMAIL = "hello@digitalcomplement.com";
  const CONTACT_PHONE = "+15550002448";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    const subject = encodeURIComponent(`New Quote Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      // Keep success message visible for 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    // Changed bg to slate-50 to alternate with Industry section (white)
    <section id={SectionId.CONTACT} className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Let's Automate Your Success</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Ready to transform your business with AI? Fill out the form to open your email client with a pre-filled quote request, or reach out directly.
              </p>

              <div className="space-y-6">
                <a 
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-slate-800/50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-brand-secondary border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                      Email Us
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{CONTACT_EMAIL}</p>
                  </div>
                </a>

                <a 
                  href={`tel:${CONTACT_PHONE}`}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-slate-800/50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-brand-secondary border border-slate-200 dark:border-slate-700 group-hover:scale-110 transition-transform shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                      Call Us
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">+1 (555) 000-AI-4U</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-transparent">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-brand-secondary border border-slate-200 dark:border-slate-700 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-medium">Location</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Tech District, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder-slate-400"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder-slate-400"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder-slate-400"
                    placeholder="Your Business Ltd."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">How can we help?</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder-slate-400"
                    placeholder="Tell us about your project or needs..."
                  ></textarea>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  disabled={status === 'submitting' || status === 'success'}
                  className="mt-2"
                >
                  {status === 'submitting' ? 'Opening Email Client...' : status === 'success' ? 'Email Opened!' : (
                    <span className="flex items-center">
                      Send Message via Email <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
                <p className="text-xs text-center text-slate-500 mt-2">
                  This will open your default email application to send the message.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Success Full Screen Overlay */}
      {status === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-fade-in"></div>
          
          {/* Content Card */}
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-10 md:p-14 shadow-2xl flex flex-col items-center text-center max-w-lg w-full border border-slate-200 dark:border-slate-700 animate-[blob_0.5s_ease-out_forwards]">
             {/* Animated Rings */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/20 rounded-full animate-ping"></div>
             
             <div className="relative h-28 w-28 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-8 ring-8 ring-green-50 dark:ring-green-500/5">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" strokeWidth={3} />
             </div>
             
             <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Request Started!</h3>
             <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl leading-relaxed">
               We've opened your email client with the details. 
               <br/>
               <span className="font-semibold text-brand-primary">Please click "Send" to finish!</span>
             </p>
             
             <div className="mt-8 w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-full animate-pulse"></div>
             </div>
          </div>
        </div>
      )}
    </section>
  );
};