import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface StrategyItem {
  title: string;
  description: string;
  impact: string;
  tools: string[];
}

export interface EmailResult {
  subject: string;
  body: string;
}

export interface SocialResult {
  hook: string;
  content: string;
  hashtags: string[];
}

export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  INDUSTRIES = 'industries',
  DEMO = 'demo',
  ABOUT = 'about',
  CONTACT = 'contact',
}