import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Cpu, Globe, Sparkles, Share2 } from 'lucide-react';
import { Button } from './Button';
import { SectionId } from '../types';

// Scramble Text Component for the "Digital Complement" name
const ScrambleText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  // Using mostly binary and some tech-looking chars for the effect
  const chars = "010101010101_[]{}<>/"; 
  
  useEffect(() => {
    let frameInterval: any = null;
    let loopTimeout: any = null;

    const startAnimation = () => {
      let iteration = 0;
      
      // Ensure any running interval is cleared before starting a new one
      clearInterval(frameInterval);

      frameInterval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(frameInterval);
          // Schedule the next run after 5 seconds
          loopTimeout = setTimeout(startAnimation, 5000);
        }

        iteration += 1 / 3; // Speed of reveal
      }, 30); // Frame rate
    };

    // Start the first animation cycle
    startAnimation();

    // Cleanup on unmount
    return () => {
      clearInterval(frameInterval);
      clearTimeout(loopTimeout);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const scrollToContact = () => {
    const element = document.getElementById(SectionId.CONTACT);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate percentage position for the spotlight
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setMousePos({ x, y });
  };

  const highlightItems = [
    { 
      icon: Bot, 
      text: "AI Agents", 
      desc: "Custom Chatbots",
      colorClass: "text-brand-secondary",
      borderColor: "group-hover:border-brand-secondary/50",
      lineColor: "bg-brand-secondary",
      glowColor: "group-hover:shadow-brand-secondary/20",
    },
    { 
      icon: Cpu, 
      text: "Automation", 
      desc: "Workflow Logic",
      colorClass: "text-brand-primary",
      borderColor: "group-hover:border-brand-primary/50",
      lineColor: "bg-brand-primary",
      glowColor: "group-hover:shadow-brand-primary/20",
    },
    { 
      icon: Globe, 
      text: "Web Dev", 
      desc: "Modern UI/UX",
      colorClass: "text-brand-accent",
      borderColor: "group-hover:border-brand-accent/50",
      lineColor: "bg-brand-accent",
      glowColor: "group-hover:shadow-brand-accent/20",
    },
    { 
      icon: Share2, 
      text: "Social Media", 
      desc: "Auto-Pilot",
      colorClass: "text-pink-500",
      borderColor: "group-hover:border-pink-500/50",
      lineColor: "bg-pink-500",
      glowColor: "group-hover:shadow-pink-500/20",
    }
  ];

  return (
    <section 
      id={SectionId.HOME} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden -z-10 bg-slate-50 dark:bg-brand-dark transition-colors duration-500">
         {/* Mouse Spotlight */}
         <div 
           className="absolute w-[800px] h-[800px] rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 blur-[100px] transition-opacity duration-300 pointer-events-none"
           style={{ 
             left: `${mousePos.x}%`, 
             top: `${mousePos.y}%`, 
             transform: 'translate(-50%, -50%)' 
           }}
         ></div>

        {/* 3D Grid Floor */}
        <div className="absolute inset-0 bg-grid-slate-200/[0.4] dark:bg-grid-slate-900/[0.04] bg-[bottom_1px_center]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-50 dark:from-brand-dark to-transparent"></div>

        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-primary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-secondary/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-brand-accent/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/50 border border-brand-primary/30 backdrop-blur-sm mb-8 animate-fade-in-up hover:border-brand-primary/60 transition-colors cursor-default shadow-sm">
          <Sparkles className="h-4 w-4 text-brand-secondary animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            The Future of Business
          </span>
        </div>

        {/* Main Title with Scramble Effect */}
        <div className="mb-8 animate-fade-in-up [animation-delay:200ms]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white relative z-10">
             <span className="block text-2xl md:text-3xl mb-4 font-light text-slate-500 dark:text-slate-400 tracking-[0.2em] uppercase">
                We Are
             </span>
             
             {/* The Brand Name with Decoding Effect */}
             <div className="relative inline-block">
                {/* Glow behind the text */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-secondary/20 via-brand-primary/20 to-brand-accent/20 blur-xl rounded-full opacity-50"></div>
                
                <ScrambleText 
                  text="DIGITAL COMPLEMENT" 
                  className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent animate-gradient-x font-mono md:font-sans" 
                />
             </div>
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 animate-fade-in-up [animation-delay:400ms] leading-relaxed">
          Your partner in <span className="text-slate-900 dark:text-white font-semibold">Artificial Intelligence</span>. We build the <span className="text-brand-secondary">Digital Intelligence</span> that powers modern Real Estate & Small Businesses.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms] mb-20">
          <Button size="lg" onClick={scrollToContact} className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              Transform Your Business
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById(SectionId.DEMO)?.scrollIntoView({ behavior: 'smooth' })}>
            Try AI Demo
          </Button>
        </div>

        {/* High-End Feature Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto animate-fade-in-up [animation-delay:800ms]">
            {highlightItems.map((item, index) => (
              <div 
                key={index}
                className={`group relative p-6 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-500 hover:-translate-y-2 hover:bg-white dark:hover:bg-slate-900/80 ${item.borderColor} ${item.glowColor} shadow-lg hover:shadow-xl dark:hover:shadow-2xl overflow-hidden cursor-default`}
              >
                {/* Shine Effect Sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-slate-400/10 dark:via-white/5 to-transparent -skew-x-12 group-hover:animate-shine" style={{ animationDuration: '1.5s' }}></div>
                </div>

                {/* Bottom Active Line */}
                <div className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out ${item.lineColor}`}></div>
                
                {/* Icon with Glow */}
                <div className={`p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/50 mb-2 transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-slate-600 relative`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-current blur-lg transition-opacity duration-300 ${item.colorClass}`}></div>
                    <item.icon className={`h-8 w-8 ${item.colorClass} relative z-10`} />
                </div>

                <div className="text-center relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.text}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-medium group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
};