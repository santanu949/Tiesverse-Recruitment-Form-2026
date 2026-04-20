import React from 'react';
import { RecruitmentForm } from './components/RecruitmentForm';

function App() {
  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center font-sans bg-gradient-to-br from-background to-slate-200">
      <div className="bg-surface shadow-card border border-slate-100 rounded-3xl max-w-4xl w-full relative overflow-hidden">

        {/* Bold Accent Top Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400"></div>

        <div className="p-8 sm:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-extrabold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
              Recruitment Application
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-textMain mb-4 tracking-tight">
              Join Our Growing Team
            </h1>
            <p className="text-textMuted text-base font-semibold max-w-xl mx-auto">
              Fill out the details below to apply for your desired role. Ensure your portfolio and resume are up to date.
            </p>
          </div>

          <RecruitmentForm />

          {/* Footer Text */}
          <div className="text-center mt-12 pt-8 border-t-2 border-borderLight">
            <p className="text-xs text-textMuted font-bold uppercase tracking-widest">
              © 2026 TIESVERSE | ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;