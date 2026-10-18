import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(19,62,43,0.06)] border-t border-[#eaedff]">
      <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
        {/* Dashboard */}
        <button
          onClick={() => onSelectTab('dashboard')}
          aria-current={currentTab === 'dashboard' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 active:scale-95 transition-all group ${
            currentTab === 'dashboard' ? 'text-[#002718] font-bold' : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentTab === 'dashboard' ? 'text-[#002718]' : 'text-[#414943] group-hover:text-[#002718] transition-colors'}`}>
            grid_view
          </span>
          <span className="font-['Inter'] text-[10px] mt-0.5 tracking-tight">Dashboard</span>
        </button>

        {/* Crop AI */}
        <button
          onClick={() => onSelectTab('crop-ai')}
          aria-current={currentTab === 'crop-ai' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 active:scale-95 transition-all group ${
            currentTab === 'crop-ai' ? 'text-[#002718] font-bold' : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentTab === 'crop-ai' ? 'text-[#002718]' : 'text-[#414943] group-hover:text-[#002718] transition-colors'}`}>
            psychology
          </span>
          <span className="font-['Inter'] text-[10px] mt-0.5 tracking-tight">Crop AI</span>
        </button>

        {/* Scan (Elevated center button) */}
        <button
          onClick={() => onSelectTab('disease-scan')}
          aria-current={currentTab === 'disease-scan' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 active:scale-95 transition-all group ${
            currentTab === 'disease-scan' ? 'text-[#002718] font-bold' : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <div className={`w-10 h-10 -mt-3.5 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(19,62,43,0.25)] ring-4 ring-[#faf8ff] active:scale-95 transition-all ${
            currentTab === 'disease-scan' ? 'bg-[#002718] text-[#ffffff] ring-[#6cf8bb]/50' : 'bg-[#002718] text-[#ffffff]'
          }`}>
            <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
          </div>
          <span className="font-['Inter'] text-[10px] mt-0.5 tracking-tight">Scan</span>
        </button>

        {/* Market */}
        <button
          onClick={() => onSelectTab('market')}
          aria-current={currentTab === 'market' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 active:scale-95 transition-all group ${
            currentTab === 'market' ? 'text-[#002718] font-bold' : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentTab === 'market' ? 'text-[#002718]' : 'text-[#414943] group-hover:text-[#002718] transition-colors'}`}>
            storefront
          </span>
          <span className="font-['Inter'] text-[10px] mt-0.5 tracking-tight">Market</span>
        </button>

        {/* Finances */}
        <button
          onClick={() => onSelectTab('finances')}
          aria-current={currentTab === 'finances' ? 'page' : undefined}
          className={`flex flex-col items-center justify-center min-w-[56px] h-12 active:scale-95 transition-all group ${
            currentTab === 'finances' ? 'text-[#002718] font-bold' : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className={`material-symbols-outlined text-[22px] ${currentTab === 'finances' ? 'text-[#002718]' : 'text-[#414943] group-hover:text-[#002718] transition-colors'}`}>
            query_stats
          </span>
          <span className="font-['Inter'] text-[10px] mt-0.5 tracking-tight">Finances</span>
        </button>
      </div>
    </nav>
  );
};
