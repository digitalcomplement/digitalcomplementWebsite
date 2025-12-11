import React, { useState } from 'react';
import { Building2, Store, Clock, Users, TrendingUp, XCircle, CheckCircle2, ArrowRight, PhoneMissed, FileX, MessageSquareWarning } from 'lucide-react';
import { SectionId } from '../types';

type IndustryType = 'real-estate' | 'small-business';

export const IndustryFocus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IndustryType>('real-estate');

  const content = {
    'real-estate': {
      title: "Real Estate Professionals",
      icon: Building2,
      color: "text-brand-secondary",
      bg: "bg-brand-secondary/10",
      borderColor: "border-brand-secondary/20",
      description: "Stop losing commissions to missed calls and slow follow-ups. We build systems that capture every lead instantly.",
      painPoints: [
        { icon: PhoneMissed, text: "Missed calls during showings or after hours" },
        { icon: FileX, text: "Manual data entry into CRM is tedious" },
        { icon: Users, text: "Unqualified leads wasting your viewing time" }
      ],
      solutions: [
        { title: "24/7 AI Receptionist", text: "An AI voice agent answers calls, answers FAQs, and books appointments directly into your calendar." },
        { title: "Instant Lead Sync", text: "Leads from Zillow/Realtor.com are instantly qualified and added to your CRM with automated follow-ups." },
        { title: "Smart Qualification", text: "Chatbots pre-screen clients for budget and timeline before you ever speak to them." }
      ],
      stat: { value: "100%", label: "Lead Response Rate" }
    },
    'small-business': {
      title: "Small Business Owners",
      icon: Store,
      color: "text-brand-accent",
      bg: "bg-brand-accent/10",
      borderColor: "border-brand-accent/20",
      description: "Scale your operations without hiring more staff. We automate the repetitive tasks that keep you stuck in the weeds.",
      painPoints: [
        { icon: Clock, text: "Spending hours answering the same questions" },
        { icon: MessageSquareWarning, text: "Inconsistent social media presence" },
        { icon: FileX, text: "Chasing invoices and managing inventory manually" }
      ],
      solutions: [
        { title: "Customer Support Bot", text: "Train an AI on your business data to handle 80% of support tickets and inquiries instantly." },
        { title: "Auto-Pilot Marketing", text: "AI agents generate, schedule, and post content to Instagram/LinkedIn automatically." },
        { title: "Operations Workflow", text: "Automate invoicing reminders and stock alerts so you never miss a beat." }
      ],
      stat: { value: "15+ hrs", label: "Saved Per Week" }
    }
  };

  const activeData = content[activeTab];

  return (
    <section id={SectionId.INDUSTRIES} className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
        {/* Decorative BG Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/50 to-transparent"></div>
        <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
        
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-secondary font-bold tracking-wide uppercase text-sm mb-3">Targeted Solutions</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            We Speak Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Language</span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Every industry has unique bottlenecks. Select your sector below to see how our Digital Intelligence clears the path to growth.
          </p>
        </div>

        {/* Industry Switcher Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 inline-flex shadow-lg backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('real-estate')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === 'real-estate'
                  ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/25'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Building2 size={18} />
              Real Estate
            </button>
            <button
              onClick={() => setActiveTab('small-business')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ${
                activeTab === 'small-business'
                  ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/25'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Store size={18} />
              Small Business
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 animate-fade-in-up key={activeTab}">
            
            {/* Left Column: The "Why" (Context & Pain) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
                <div className={`inline-flex items-center gap-3 mb-6 ${activeData.color}`}>
                    <div className={`p-3 rounded-xl ${activeData.bg}`}>
                        <activeData.icon size={32} />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{activeData.title}</span>
                </div>
                
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    {activeData.description}
                </p>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-6">
                    <h4 className="text-red-600 dark:text-red-400 font-bold mb-4 flex items-center gap-2">
                        <XCircle size={20} /> The Bottlenecks
                    </h4>
                    <ul className="space-y-4">
                        {activeData.painPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-400">
                                <point.icon size={18} className="mt-1 text-red-400 flex-shrink-0 opacity-70" />
                                <span>{point.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Middle: Arrow (Hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <ArrowRight size={24} />
                </div>
            </div>

            {/* Right Column: The "How" (Solution & Results) */}
            <div className="lg:col-span-6">
                <div className={`h-full bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border ${activeData.borderColor} shadow-2xl relative overflow-hidden group`}>
                    {/* Glow Effect */}
                    <div className={`absolute -right-20 -top-20 w-64 h-64 ${activeData.bg} rounded-full blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                    
                    <h4 className={`text-xl font-bold mb-6 flex items-center gap-2 ${activeData.color}`}>
                        <CheckCircle2 size={24} /> The Digital Complement Way
                    </h4>

                    <div className="space-y-6 mb-8 relative z-10">
                        {activeData.solutions.map((sol, idx) => (
                            <div key={idx} className="flex gap-4">
                                <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${activeData.bg.replace('/10', '')}`}></div>
                                <div>
                                    <h5 className="font-bold text-slate-900 dark:text-white text-base">{sol.title}</h5>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{sol.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Result Card */}
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Expected Impact</p>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className={`text-4xl font-black ${activeData.color}`}>{activeData.stat.value}</span>
                                <span className="text-slate-600 dark:text-slate-500 font-medium">{activeData.stat.label}</span>
                            </div>
                        </div>
                        <div className={`h-12 w-12 rounded-full ${activeData.bg} flex items-center justify-center ${activeData.color}`}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};