import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Target, TrendingUp, Loader2, Mail, Share2, Briefcase, PenTool, LayoutTemplate, Copy, Check, ThumbsUp, MessageCircle, Repeat } from 'lucide-react';
import { Button } from './Button';
import { SectionId, StrategyItem, EmailResult, SocialResult } from '../types';
import { generateBusinessStrategy, generateEmailDraft, generateSocialPost } from '../services/geminiService';

type ToolType = 'strategy' | 'email' | 'social';

export const AiDemo: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('strategy');
  
  // Strategy State
  const [strategyInput, setStrategyInput] = useState('');
  const [strategies, setStrategies] = useState<StrategyItem[] | null>(null);

  // Email State
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailTopic, setEmailTopic] = useState('');
  const [emailResult, setEmailResult] = useState<EmailResult | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // Social State
  const [socialPlatform, setSocialPlatform] = useState('LinkedIn');
  const [socialTopic, setSocialTopic] = useState('');
  const [socialResult, setSocialResult] = useState<SocialResult | null>(null);

  // Common State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStrategySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!strategyInput.trim()) return;
    setLoading(true); setError(''); setStrategies(null);
    try {
      const results = await generateBusinessStrategy(strategyInput);
      setStrategies(results);
    } catch (err) {
      setError("Failed to generate strategy. Please try again.");
    } finally { setLoading(false); }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRecipient.trim() || !emailTopic.trim()) return;
    setLoading(true); setError(''); setEmailResult(null); setEmailCopied(false);
    try {
      const result = await generateEmailDraft(emailRecipient, emailTopic);
      setEmailResult(result);
    } catch (err) {
      setError("Failed to generate email. Please try again.");
    } finally { setLoading(false); }
  };

  const handleCopyEmail = () => {
    if (!emailResult) return;
    const text = `Subject: ${emailResult.subject}\n\n${emailResult.body}`;
    navigator.clipboard.writeText(text);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialTopic.trim()) return;
    setLoading(true); setError(''); setSocialResult(null);
    try {
      const result = await generateSocialPost(socialPlatform, socialTopic);
      setSocialResult(result);
    } catch (err) {
      setError("Failed to generate post. Please try again.");
    } finally { setLoading(false); }
  };

  const renderToolIcon = (tool: ToolType, active: boolean) => {
    const className = `h-5 w-5 ${active ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`;
    switch (tool) {
      case 'strategy': return <Target className={className} />;
      case 'email': return <Mail className={className} />;
      case 'social': return <Share2 className={className} />;
    }
  };

  return (
    <section id={SectionId.DEMO} className="py-24 bg-slate-100 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-950 transition-colors duration-300 -z-20"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            Interactive AI Toolbox
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Experience Our AI Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Don't just take our word for it. Test our powerful AI tools designed for automation, communication, and growth.
          </p>
        </div>

        {/* Toolbox Container */}
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar / Tabs */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 hidden md:block">Select Tool</div>
             
             {[
               { id: 'strategy', label: 'Business Strategy', desc: 'Growth Plans' },
               { id: 'email', label: 'Smart Email', desc: 'Cold Outreach' },
               { id: 'social', label: 'Social Architect', desc: 'Viral Posts' }
             ].map((tool) => (
               <button
                 key={tool.id}
                 onClick={() => setActiveTool(tool.id as ToolType)}
                 className={`flex-1 md:flex-none flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                   activeTool === tool.id 
                     ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' 
                     : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                 }`}
               >
                 <div className={`p-2 rounded-lg ${activeTool === tool.id ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-900'}`}>
                    {renderToolIcon(tool.id as ToolType, activeTool === tool.id)}
                 </div>
                 <div className="hidden sm:block">
                   <div className="font-semibold text-sm">{tool.label}</div>
                   <div className={`text-xs ${activeTool === tool.id ? 'text-white/70' : 'text-slate-400'}`}>{tool.desc}</div>
                 </div>
               </button>
             ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-10 relative">
            
            {/* Tool: STRATEGY */}
            {activeTool === 'strategy' && (
              <div className="animate-fade-in-up">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Instant Strategy Generator</h3>
                 <p className="text-slate-600 dark:text-slate-400 mb-8">Enter your business type to receive 3 tailored automation strategies.</p>
                 
                 <form onSubmit={handleStrategySubmit} className="flex gap-4 mb-10">
                    <input
                      type="text"
                      value={strategyInput}
                      onChange={(e) => setStrategyInput(e.target.value)}
                      placeholder="e.g. 'Dental Clinic' or 'Online Shoe Store'"
                      className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder-slate-400"
                    />
                    <Button type="submit" disabled={loading || !strategyInput.trim()}>
                      {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
                    </Button>
                 </form>

                 {strategies && (
                    <div className="grid gap-4">
                      {strategies.map((strategy, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-brand-primary/40 transition-colors">
                           <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-slate-900 dark:text-white">{strategy.title}</h4>
                             <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-1 rounded">{strategy.impact}</span>
                           </div>
                           <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{strategy.description}</p>
                           <div className="flex gap-2">
                             {strategy.tools.map((t, idx) => (
                               <span key={idx} className="text-xs text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded">{t}</span>
                             ))}
                           </div>
                        </div>
                      ))}
                    </div>
                 )}
              </div>
            )}

            {/* Tool: EMAIL */}
            {activeTool === 'email' && (
              <div className="animate-fade-in-up h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Smart Email Drafter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Generate persuasive professional emails in seconds.</p>

                <div className="grid md:grid-cols-2 gap-8 h-full">
                   <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Recipient Name</label>
                        <input
                          type="text"
                          value={emailRecipient}
                          onChange={(e) => setEmailRecipient(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Topic / Offer</label>
                        <textarea
                          rows={4}
                          value={emailTopic}
                          onChange={(e) => setEmailTopic(e.target.value)}
                          placeholder="e.g. Offering a new CRM integration service..."
                          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder-slate-400"
                        />
                      </div>
                      <Button type="submit" fullWidth disabled={loading || !emailRecipient.trim()}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Draft Email'}
                      </Button>
                   </form>

                   {/* Email Preview */}
                   <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                      <div className="bg-slate-100 dark:bg-slate-900 p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            <span className="ml-2 text-xs text-slate-500 font-mono">New Message</span>
                        </div>
                        {emailResult && (
                            <button
                                onClick={handleCopyEmail}
                                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors"
                                title="Copy full email"
                            >
                                {emailCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                <span>{emailCopied ? 'Copied' : 'Copy'}</span>
                            </button>
                        )}
                      </div>
                      <div className="p-6 flex-1 overflow-y-auto">
                        {emailResult ? (
                          <>
                            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                              <span className="text-slate-400 text-xs uppercase tracking-wide">Subject</span>
                              <div className="font-bold text-slate-900 dark:text-white">{emailResult.subject}</div>
                            </div>
                            <div className="whitespace-pre-line text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {emailResult.body}
                            </div>
                          </>
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                             Result will appear here...
                          </div>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* Tool: SOCIAL */}
            {activeTool === 'social' && (
              <div className="animate-fade-in-up h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Social Media Architect</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Create viral content tailored for your platform.</p>

                <div className="grid md:grid-cols-2 gap-8 h-full">
                   <form onSubmit={handleSocialSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform</label>
                        <div className="flex gap-2">
                          {['LinkedIn', 'Twitter', 'Instagram'].map(p => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setSocialPlatform(p)}
                              className={`flex-1 py-2 rounded-lg text-sm border transition-colors ${
                                socialPlatform === p 
                                  ? 'bg-brand-secondary/10 border-brand-secondary text-brand-secondary font-bold' 
                                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Topic / Event</label>
                        <textarea
                          rows={4}
                          value={socialTopic}
                          onChange={(e) => setSocialTopic(e.target.value)}
                          placeholder="e.g. Launching our new website..."
                          className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder-slate-400"
                        />
                      </div>
                      <Button type="submit" fullWidth disabled={loading || !socialTopic.trim()}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Generate Post'}
                      </Button>
                   </form>

                   {/* Social Preview */}
                   <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
                      <div className="p-6">
                        {socialResult ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                        <Briefcase className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-white text-sm">Your Business Page</div>
                                        <div className="text-xs text-slate-500">Just now • {socialPlatform}</div>
                                    </div>
                                </div>
                                
                                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    <p className="font-bold mb-2 text-base">{socialResult.hook}</p>
                                    {socialResult.content}
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {socialResult.hashtags.map((tag, i) => (
                                            <span key={i} className="text-brand-primary hover:underline cursor-pointer">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-400 text-sm">
                                    <div className="flex items-center gap-1 hover:text-slate-500 cursor-pointer">
                                        <ThumbsUp size={16} /> Like
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-slate-500 cursor-pointer">
                                        <MessageCircle size={16} /> Comment
                                    </div>
                                    <div className="flex items-center gap-1 hover:text-slate-500 cursor-pointer">
                                        <Repeat size={16} /> Repost
                                    </div>
                                </div>
                            </div>
                        ) : (
                          <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-slate-400">
                             <LayoutTemplate className="h-12 w-12 mb-3 opacity-20" />
                             <p className="text-sm italic">Social preview will appear here</p>
                          </div>
                        )}
                      </div>
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};