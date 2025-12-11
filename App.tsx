import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { IndustryFocus } from './components/IndustryFocus';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AiConsultant } from './components/AiConsultant';
import { AiDemo } from './components/AiDemo';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-brand-primary selection:text-white transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <AiDemo />
        <IndustryFocus />
        <Contact />
      </main>
      <Footer />
      <AiConsultant />
    </div>
  );
}

export default App;