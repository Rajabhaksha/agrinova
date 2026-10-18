import React, { useState } from 'react';
import { TabType, FarmLocation } from '../types';
import { APP_ASSETS } from '../data/mockData';
import { WeatherForecastCard } from './WeatherForecastCard';
import { PlantingHarvestCalendar } from './PlantingHarvestCalendar';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenFieldMap: () => void;
  onOpenPostListing: () => void;
  onOpenLogExpense: () => void;
  onOpenAlertDetails: () => void;
  farmLocation?: FarmLocation;
  onDetectLocation?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenFieldMap,
  onOpenPostListing,
  onOpenLogExpense,
  onOpenAlertDetails,
  farmLocation,
  onDetectLocation,
}) => {
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepResult, setSweepResult] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<'maize' | 'pepper' | null>(null);
  const [irrigationTriggered, setIrrigationTriggered] = useState(false);

  const handleRunSoilSweep = () => {
    setIsSweeping(true);
    setSweepResult(null);
    setTimeout(() => {
      setIsSweeping(false);
      setSweepResult('All 18 IoT probes verified. Sector B moisture 42%, nitrate absorption nominal.');
      setTimeout(() => setSweepResult(null), 4000);
    }, 1200);
  };

  const handleTriggerIrrigation = () => {
    setIrrigationTriggered(true);
    setTimeout(() => {
      setIrrigationTriggered(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Greeting & Status Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#133e2b] text-[#ffffff] p-4 shadow-md">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#006c49]/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/20 text-[#6ffbbe] text-[10px] font-bold uppercase tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ffbbe] animate-pulse"></span>
              Telemetry Live
            </span>
            <span className="text-[10px] font-semibold text-[#7da990]">Harvest Cycle 2024</span>
          </div>
          <div>
            <h1 className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#ffffff] tracking-tight leading-tight">
              Good Morning, Alex
            </h1>
            <p className="font-['Inter'] text-[12px] text-[#7da990] mt-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#6ffbbe]">check_circle</span>
              Field Sector B: Optimal Conditions
            </p>
          </div>
          <div className="pt-1 flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#e2e7ff]/30 flex items-center justify-center text-[#ffffff]">
                <span className="material-symbols-outlined text-[16px]">sensors</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#e2e7ff]/40 flex items-center justify-center text-[#ffffff]">
                <span className="material-symbols-outlined text-[16px]">water_drop</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#e2e7ff]/50 flex items-center justify-center text-[#ffffff]">
                <span className="material-symbols-outlined text-[16px]">thermostat</span>
              </div>
              <span className="pl-3.5 font-['Inter'] text-[10px] text-[#6ffbbe] font-semibold">
                18 Nodes Active
              </span>
            </div>
            <button
              onClick={onOpenFieldMap}
              className="px-2.5 py-1 rounded-lg bg-[#ffffff]/15 hover:bg-[#ffffff]/25 active:scale-95 transition-all text-[#ffffff] font-['Inter'] text-[10px] font-semibold flex items-center gap-1"
              type="button"
            >
              <span>Field Map</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sweep status banner if recently triggered */}
      {sweepResult && (
        <div className="p-2.5 rounded-xl bg-[#6cf8bb]/20 border border-[#6cf8bb]/40 text-[#006c49] text-[12px] font-medium flex items-center gap-2 animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{sweepResult}</span>
        </div>
      )}

      {/* Live Market Ticker */}
      <div className="w-full bg-[#f2f3ff] rounded-xl p-2 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-1 px-1">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">trending_up</span>
            <span className="font-['Inter'] text-[10px] text-[#414943] font-bold uppercase tracking-wider">
              Commodity Spot Index
            </span>
          </div>
          <button
            onClick={() => onNavigate('market')}
            className="text-[10px] text-[#006c49] font-bold hover:underline"
          >
            Terminal &rarr;
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div
            onClick={() => onNavigate('market')}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span className="font-['Inter'] text-[12px] font-semibold text-[#131b2e]">Wheat</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[12px] font-bold text-[#002718]">$248/t</span>
            <span className="font-['Inter'] text-[10px] text-[#006c49] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span>3.2%
            </span>
          </div>
          <div
            onClick={() => onNavigate('market')}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span className="font-['Inter'] text-[12px] font-semibold text-[#131b2e]">Soybean</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[12px] font-bold text-[#002718]">$415/t</span>
            <span className="font-['Inter'] text-[10px] text-[#006c49] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span>1.5%
            </span>
          </div>
          <div
            onClick={() => onNavigate('market')}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] shadow-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span className="font-['Inter'] text-[12px] font-semibold text-[#131b2e]">Org. Tomatoes</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[12px] font-bold text-[#002718]">$1.80/kg</span>
            <span className="font-['Inter'] text-[10px] text-[#006c49] flex items-center font-bold">
              <span className="material-symbols-outlined text-[12px]">arrow_upward</span>0.8%
            </span>
          </div>
        </div>
      </div>

      {/* Weather & Precision Spray Alert Card */}
      <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm space-y-4 border border-[#eaedff]">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#414943] font-bold">
              Micro-Climate Hub
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-['Plus+Jakarta+Sans'] text-[28px] text-[#131b2e] font-bold">24°C</span>
              <span className="font-['Inter'] text-[12px] text-[#414943]">Scattered Clouds</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006c49]">
            <span className="material-symbols-outlined text-[28px]">partly_cloudy_day</span>
          </div>
        </div>

        {/* Weather Metrics Grid */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="bg-[#f2f3ff]/70 rounded-lg p-2.5 flex flex-col">
            <div className="flex items-center gap-1 text-[#414943]">
              <span className="material-symbols-outlined text-[15px] text-[#006c49]">water_drop</span>
              <span className="font-['Inter'] text-[10px]">Humidity</span>
            </div>
            <span className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] mt-1">62%</span>
            <span className="font-['Inter'] text-[10px] text-[#414943]">Elevated</span>
          </div>

          <div className="bg-[#f2f3ff]/70 rounded-lg p-2.5 flex flex-col">
            <div className="flex items-center gap-1 text-[#414943]">
              <span className="material-symbols-outlined text-[15px] text-[#006c49]">rainy</span>
              <span className="font-['Inter'] text-[10px]">Rain Forecast</span>
            </div>
            <span className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] mt-1">12mm</span>
            <span className="font-['Inter'] text-[10px] text-[#414943]">At 4:00 PM</span>
          </div>

          <div className="bg-[#f2f3ff]/70 rounded-lg p-2.5 flex flex-col">
            <div className="flex items-center gap-1 text-[#414943]">
              <span className="material-symbols-outlined text-[15px] text-[#006c49]">air</span>
              <span className="font-['Inter'] text-[10px]">Wind Drift</span>
            </div>
            <span className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] mt-1">9 km/h</span>
            <span className="font-['Inter'] text-[10px] text-[#414943]">SSE Gusts</span>
          </div>
        </div>

        {/* Urgent Precision Spray Alert Banner */}
        <div
          onClick={onOpenAlertDetails}
          className="rounded-xl bg-[#ffdad6] p-3.5 text-[#93000a] shadow-sm flex items-start gap-2.5 cursor-pointer hover:bg-[#ffdad6]/90 transition-all active:scale-[0.99]"
        >
          <div className="w-8 h-8 rounded-lg bg-[#93000a]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">warning</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[12px] font-bold text-[#93000a]">Critical Spray Alert</span>
              <span className="font-['Inter'] text-[10px] bg-[#ba1a1a]/15 text-[#ba1a1a] px-1.5 py-0.5 rounded font-bold">
                Action Needed
              </span>
            </div>
            <p className="font-['Inter'] text-[12px] text-[#93000a]/90 mt-1 leading-snug">
              High humidity is favorable for powdery mildew spores. Avoid chemical spray between{' '}
              <strong className="font-bold">12:00 PM – 3:00 PM</strong> due to thermal wind drift.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Day Micro-Climate Planning Weather Forecast Section */}
      <WeatherForecastCard farmLocation={farmLocation} onDetectLocation={onDetectLocation} />

      {/* Seasonal Planting & Harvest Calendar Visualization */}
      <PlantingHarvestCalendar farmLocation={farmLocation} />
      <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm space-y-4 border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#6cf8bb]/40 flex items-center justify-center text-[#006c49]">
              <span className="material-symbols-outlined text-[20px]">grass</span>
            </div>
            <div>
              <h2 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">Soil Matrix Telemetry</h2>
              <span className="font-['Inter'] text-[10px] text-[#414943]">Sector B • Depth: 25cm probe</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-['Inter'] text-[10px] font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            Calibrated
          </span>
        </div>

        {/* Moisture & pH Highlight Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col">
            <span className="font-['Inter'] text-[10px] text-[#414943] uppercase font-bold">Volumetric Moisture</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#002718]">42%</span>
              <span className="font-['Inter'] text-[10px] px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] font-bold">
                Normal
              </span>
            </div>
            <div className="w-full bg-[#dae2fd] rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-[#006c49] h-1.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col">
            <span className="font-['Inter'] text-[10px] text-[#414943] uppercase font-bold">Soil Acidity (pH)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#002718]">6.4</span>
              <span className="font-['Inter'] text-[10px] px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#414943] font-semibold">
                Slightly Acidic
              </span>
            </div>
            <div className="w-full bg-[#dae2fd] rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-[#006c49] h-1.5 rounded-full" style={{ width: '64%' }}></div>
            </div>
          </div>
        </div>

        {/* N-P-K Telemetry Bars */}
        <div className="space-y-2.5 pt-1">
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-wider text-[#414943]">
            Nutrient Density (NPK)
          </span>

          {/* Nitrogen */}
          <div className="space-y-1">
            <div className="flex justify-between font-['Inter'] text-[12px]">
              <span className="text-[#131b2e] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
                Nitrogen (N)
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-[#002718] font-bold">
                78 kg/ha <span className="font-['Inter'] text-[10px] font-normal text-[#414943]">(Target: 80)</span>
              </span>
            </div>
            <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
              <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Phosphorus */}
          <div className="space-y-1">
            <div className="flex justify-between font-['Inter'] text-[12px]">
              <span className="text-[#131b2e] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#a3d1b6]"></span>
                Phosphorus (P)
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-[#002718] font-bold">
                35 kg/ha <span className="font-['Inter'] text-[10px] font-normal text-[#414943]">(Target: 30)</span>
              </span>
            </div>
            <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
              <div className="bg-[#a3d1b6] h-2 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          {/* Potassium */}
          <div className="space-y-1">
            <div className="flex justify-between font-['Inter'] text-[12px]">
              <span className="text-[#131b2e] flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
                Potassium (K)
              </span>
              <span className="font-['Plus+Jakarta+Sans'] text-[#002718] font-bold">
                190 kg/ha <span className="font-['Inter'] text-[10px] font-normal text-[#414943]">(Optimal)</span>
              </span>
            </div>
            <div className="w-full bg-[#eaedff] rounded-full h-2 overflow-hidden">
              <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Field Ops */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">Quick Field Ops</h2>
          <span className="font-['Inter'] text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
            Shortcuts
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* AI Crop Doctor */}
          <button
            onClick={() => onNavigate('disease-scan')}
            className="group p-3.5 rounded-xl bg-[#ffffff] shadow-sm hover:bg-[#f2f3ff] active:scale-95 transition-all text-left flex flex-col justify-between border border-[#eaedff]"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#006c49]/10 text-[#006c49] flex items-center justify-center group-hover:bg-[#006c49] group-hover:text-[#ffffff] transition-colors">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <div className="mt-3">
              <span className="font-['Inter'] text-[14px] font-semibold text-[#131b2e] block leading-tight">
                AI Crop Doctor
              </span>
              <span className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 block">
                Instant diagnostic
              </span>
            </div>
          </button>

          {/* Soil Health Test */}
          <button
            onClick={handleRunSoilSweep}
            disabled={isSweeping}
            className="group p-3.5 rounded-xl bg-[#ffffff] shadow-sm hover:bg-[#f2f3ff] active:scale-95 transition-all text-left flex flex-col justify-between border border-[#eaedff]"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#6cf8bb]/40 text-[#00714d] flex items-center justify-center group-hover:bg-[#006c49] group-hover:text-[#ffffff] transition-colors">
              {isSweeping ? (
                <span className="material-symbols-outlined text-[22px] animate-spin">autorenew</span>
              ) : (
                <span className="material-symbols-outlined text-[22px]">biotech</span>
              )}
            </div>
            <div className="mt-3">
              <span className="font-['Inter'] text-[14px] font-semibold text-[#131b2e] block leading-tight">
                {isSweeping ? 'Sweeping Probes...' : 'Soil Health Test'}
              </span>
              <span className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 block">
                Run sensor sweep
              </span>
            </div>
          </button>

          {/* New Listing */}
          <button
            onClick={onOpenPostListing}
            className="group p-3.5 rounded-xl bg-[#ffffff] shadow-sm hover:bg-[#f2f3ff] active:scale-95 transition-all text-left flex flex-col justify-between border border-[#eaedff]"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e2e7ff] text-[#002718] flex items-center justify-center group-hover:bg-[#006c49] group-hover:text-[#ffffff] transition-colors">
              <span className="material-symbols-outlined text-[22px]">add_business</span>
            </div>
            <div className="mt-3">
              <span className="font-['Inter'] text-[14px] font-semibold text-[#131b2e] block leading-tight">
                New Listing
              </span>
              <span className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 block">
                Sell harvest lots
              </span>
            </div>
          </button>

          {/* Log Expense */}
          <button
            onClick={onOpenLogExpense}
            className="group p-3.5 rounded-xl bg-[#ffffff] shadow-sm hover:bg-[#f2f3ff] active:scale-95 transition-all text-left flex flex-col justify-between border border-[#eaedff]"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#131b2e] flex items-center justify-center group-hover:bg-[#006c49] group-hover:text-[#ffffff] transition-colors">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </div>
            <div className="mt-3">
              <span className="font-['Inter'] text-[14px] font-semibold text-[#131b2e] block leading-tight">
                Log Expense
              </span>
              <span className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 block">
                Fuel, seeds, labor
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Active Field Crops */}
      <div className="space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">Active Field Crops</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] font-['Inter'] text-[10px] font-bold">
              2 Parcels
            </span>
          </div>
          <button
            onClick={() => onNavigate('crop-ai')}
            className="font-['Inter'] text-[10px] text-[#006c49] font-bold hover:underline"
            type="button"
          >
            View All
          </button>
        </div>

        {/* Crop 1: Golden Maize */}
        <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm space-y-3 border border-[#eaedff]">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
              <img
                className="w-full h-full object-cover"
                alt="Golden Maize in lush field"
                src={APP_ASSETS.maizeField}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#006c49] font-bold">
                  Sector A-1
                </span>
                <span className="font-['Inter'] text-[10px] px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-bold">
                  Optimal
                </span>
              </div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] truncate mt-0.5">
                Golden Maize
              </h3>
              <p className="font-['Inter'] text-[12px] text-[#414943]">Day 45 of 110 • Vegetative Stage</p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
            {/* SVG Progress Ring for Health Score */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#dae2fd]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#006c49] stroke-current"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray="94, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-['Plus+Jakarta+Sans'] text-[11px] font-bold text-[#131b2e]">
                  94%
                </span>
              </div>
              <div>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold block">Vigor Score</span>
                <span className="font-['Inter'] text-[12px] text-[#006c49]">High vegetative yield</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-['Inter'] text-[10px] text-[#414943] block">Next Irrigation</span>
              <button
                onClick={handleTriggerIrrigation}
                className="font-['Inter'] text-[12px] text-[#002718] font-bold flex items-center justify-end gap-1 active:scale-95 transition-all hover:text-[#006c49]"
                title="Click to trigger drip valve test"
              >
                <span className={`material-symbols-outlined text-[14px] text-[#006c49] ${irrigationTriggered ? 'animate-bounce' : ''}`}>
                  water
                </span>
                <span>{irrigationTriggered ? 'Valve Open!' : 'In 6 hours'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Crop 2: Bell Pepper */}
        <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm space-y-3 border border-[#eaedff]">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
              <img
                className="w-full h-full object-cover"
                alt="Bell Pepper greenhouse flowering"
                src={APP_ASSETS.bellPepper}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#006c49] font-bold">
                  Greenhouse B-4
                </span>
                <span className="font-['Inter'] text-[10px] px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#414943] font-bold">
                  Flowering
                </span>
              </div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] truncate mt-0.5">
                Bell Pepper
              </h3>
              <p className="font-['Inter'] text-[12px] text-[#414943]">Day 28 of 75 • Flower initiation</p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#6cf8bb]/50 flex items-center justify-center text-[#006c49]">
                <span className="material-symbols-outlined text-[18px]">local_florist</span>
              </div>
              <div>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold block">Pollination Phase</span>
                <span className="font-['Inter'] text-[12px] text-[#414943]">Ventilation 75% active</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedCrop('pepper')}
              className="px-3 py-1.5 rounded-lg bg-[#002718] text-[#ffffff] font-['Inter'] text-[12px] font-semibold active:scale-95 transition-all hover:bg-[#006c49]"
              type="button"
            >
              Details
            </button>
          </div>
        </div>
      </div>

      {/* Pepper Details Modal */}
      {selectedCrop === 'pepper' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div>
                <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">Greenhouse B-4</span>
                <h3 className="text-[18px] font-bold text-[#002718]">Bell Pepper Status</h3>
              </div>
              <button
                onClick={() => setSelectedCrop(null)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#414943]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
                <span className="text-[11px] font-bold text-[#414943] uppercase">Climate Regulation</span>
                <p className="text-[13px] text-[#131b2e]">Internal greenhouse temperature maintained at 23.5°C with 68% relative humidity. Mist cooling active during peak solar irradiance.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#eaedff] space-y-1">
                <span className="text-[11px] font-bold text-[#006c49] uppercase">Pollination & Flower Count</span>
                <p className="text-[13px] text-[#131b2e]">Estimated 42 flowers/m² with healthy pollen viability. Automated bumblebee hive ventilation open.</p>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1">
                <span className="text-[11px] font-bold text-[#414943] uppercase">Nutrient Dosing (EC & pH)</span>
                <p className="text-[13px] text-[#131b2e]">Nutrient Solution EC: 2.2 dS/m • Rootzone pH: 5.9 • High potassium/calcium blend for cell wall strength.</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCrop(null)}
              className="w-full py-3 rounded-xl bg-[#002718] text-[#ffffff] font-semibold text-[14px]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
