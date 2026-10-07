import React from 'react';
import { Sparkles, Settings } from 'lucide-react';

export type BottomNavTab = 'resume' | 'tools' | 'aicoach' | 'settings';

interface BottomNavigationBarProps {
  activeTab: BottomNavTab;
  onSelectTab: (tab: BottomNavTab) => void;
}

// Exact Custom PDF Icon to match PJ 2's "Tools" icon
function ToolsPdfIcon({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="9" y2="15.01" />
      </svg>
      <span className="absolute top-[8px] left-[3px] text-[7.5px] font-black tracking-tighter leading-none select-none">
        PDF
      </span>
    </div>
  );
}

// Exact Resume Icon to match PJ 2's "Resume" home-document icon
function ResumeHomeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <nav
      aria-label="Menu principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] no-print"
    >
      <div className="mx-auto flex max-w-md sm:max-w-xl items-center justify-around px-2 py-2">
        {/* 1. RESUME */}
        <button
          type="button"
          onClick={() => onSelectTab('resume')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group ${
            activeTab === 'resume' ? 'text-[#0084ff]' : 'text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <ResumeHomeIcon
            className={`w-6 h-6 transition-transform group-hover:scale-105 ${
              activeTab === 'resume' ? 'text-[#0084ff]' : 'text-neutral-800'
            }`}
          />
          <span
            className={`text-[11px] mt-1 leading-tight tracking-tight ${
              activeTab === 'resume' ? 'font-extrabold text-[#0084ff]' : 'font-semibold text-neutral-800'
            }`}
          >
            Resume
          </span>
        </button>

        {/* 2. TOOLS */}
        <button
          type="button"
          onClick={() => onSelectTab('tools')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group ${
            activeTab === 'tools' ? 'text-[#0084ff]' : 'text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <ToolsPdfIcon
            className={`w-6 h-6 transition-transform group-hover:scale-105 ${
              activeTab === 'tools' ? 'text-[#0084ff]' : 'text-neutral-800'
            }`}
          />
          <span
            className={`text-[11px] mt-1 leading-tight tracking-tight ${
              activeTab === 'tools' ? 'font-extrabold text-[#0084ff]' : 'font-semibold text-neutral-800'
            }`}
          >
            Tools
          </span>
        </button>

        {/* 3. AI COACH */}
        <button
          type="button"
          onClick={() => onSelectTab('aicoach')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group ${
            activeTab === 'aicoach' ? 'text-[#0084ff]' : 'text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <Sparkles
            className={`w-6 h-6 stroke-[2.2] transition-transform group-hover:scale-105 ${
              activeTab === 'aicoach' ? 'text-[#0084ff]' : 'text-neutral-800'
            }`}
          />
          <span
            className={`text-[11px] mt-1 leading-tight tracking-tight ${
              activeTab === 'aicoach' ? 'font-extrabold text-[#0084ff]' : 'font-semibold text-neutral-800'
            }`}
          >
            AI Coach
          </span>
        </button>

        {/* 4. SETTINGS */}
        <button
          type="button"
          onClick={() => onSelectTab('settings')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all cursor-pointer group ${
            activeTab === 'settings' ? 'text-[#0084ff]' : 'text-neutral-800 hover:text-neutral-950'
          }`}
        >
          <Settings
            className={`w-6 h-6 stroke-[2.2] transition-transform group-hover:scale-105 ${
              activeTab === 'settings' ? 'text-[#0084ff]' : 'text-neutral-800'
            }`}
          />
          <span
            className={`text-[11px] mt-1 leading-tight tracking-tight ${
              activeTab === 'settings' ? 'font-extrabold text-[#0084ff]' : 'font-semibold text-neutral-800'
            }`}
          >
            Settings
          </span>
        </button>
      </div>
    </nav>
  );
};
