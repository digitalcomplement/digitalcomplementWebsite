import React from 'react';
import { Bot, Workflow, Globe, Share2, BarChart3, ShieldCheck } from 'lucide-react';
import { SectionId, ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "AI Tools & Agents",
    description: "Custom-trained AI chatbots and virtual assistants that handle customer inquiries, qualify leads, and provide 24/7 support.",
    icon: Bot,
    tags: ["Chatbots", "GPT Integration", "Personalization"]
  },
  {
    title: "Business Automation",
    description: "Streamline your operations. We connect your favorite apps (CRM, Email, Slack) to automate repetitive tasks and save hours daily.",
    icon: Workflow,
    tags: ["Zapier", "Make.com", "Workflow Optimization"]
  },
  {
    title: "Web Development",
    description: "High-performance, responsive websites built with modern frameworks. Optimized for SEO, speed, and conversion.",
    icon: Globe,
    tags: ["React", "Next.js", "SEO", "Maintenance"]
  },
  {
    title: "Social Media Support",
    description: "AI-driven content strategy and automated posting schedules to keep your audience engaged without the manual grind.",
    icon: Share2,
    tags: ["Content Gen", "Auto-Scheduling", "Analytics"]
  },
  {
    title: "Data Analytics",
    description: "Turn data into decisions. We implement AI tools to analyze market trends and customer behavior for your business.",
    icon: BarChart3,
    tags: ["Insights", "Reporting", "Forecasting"]
  },
  {
    title: "Secure Integration",
    description: "Enterprise-grade security for all your digital tools. We ensure your customer data remains protected and compliant.",
    icon: ShieldCheck,
    tags: ["Security", "Compliance", "Privacy"]
  }
];

export const Services: React.FC = () => {
  return (
    // Changed bg to bg-white for light mode contrast
    <section id={SectionId.SERVICES} className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-secondary font-semibold tracking-wide uppercase text-sm mb-2">Our Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Comprehensive Digital Solutions</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We don't just build websites; we build ecosystems that work for you. From intelligent agents to seamless automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-xl dark:hover:bg-slate-800 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-6 w-6 text-brand-secondary group-hover:text-brand-primary transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-md bg-white dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};