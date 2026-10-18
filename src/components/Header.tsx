import React from 'react';
import { FarmLocation } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface HeaderProps {
  onNotificationClick: () => void;
  onProfileClick: () => void;
  unreadCount?: number;
  farmLocation?: FarmLocation;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationClick,
  onProfileClick,
  unreadCount = 2,
  farmLocation,
}) => {
  const locationText = farmLocation ? farmLocation.name : 'Valley Green Fields';
  const isGpsActive = farmLocation?.isAutoDetected;

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(19,62,43,0.05)] border-b border-[#eaedff]">
      <div className="max-w-lg mx-auto h-16 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <img
            alt="AgriNova Logo"
            className="h-8 w-auto object-contain shrink-0"
            src={APP_ASSETS.logo}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#002718] truncate tracking-tight">
                AgriNova
              </span>
              <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#006c49] font-bold bg-[#6cf8bb]/40 px-1.5 py-0.5 rounded-full">
                PRO
              </span>
            </div>
            <button
              onClick={onProfileClick}
              className="flex items-center gap-1 text-[#414943] text-left hover:text-[#002718] transition-colors truncate"
              type="button"
              title="Click to view farm profile & GPS location settings"
            >
              <span className={`material-symbols-outlined text-[13px] ${isGpsActive ? 'text-[#006c49] animate-pulse' : 'text-[#006c49]'}`}>
                {isGpsActive ? 'my_location' : 'location_on'}
              </span>
              <span className="font-['Inter'] text-[10px] font-semibold text-[#414943] truncate">
                {locationText} • 24°C Sunny
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Notifications"
            onClick={onNotificationClick}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]"></span>
            )}
          </button>

          <button
            aria-label="Farmer Profile"
            onClick={onProfileClick}
            className="w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all"
            type="button"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6cf8bb]/60"
              src={APP_ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
