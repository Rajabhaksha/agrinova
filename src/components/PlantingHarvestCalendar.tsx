import React, { useState } from 'react';
import { FarmLocation } from '../types';

interface PlantingHarvestCalendarProps {
  farmLocation?: FarmLocation;
}

export interface CropTimeline {
  id: string;
  name: string;
  scientificName: string;
  parcel: string;
  icon: string;
  seasonCategory: 'Warm Season' | 'Cool Season' | 'Greenhouse Continuous';
  // Months are 1-12 (Jan to Dec)
  plantingMonths: number[];
  growthMonths: number[];
  harvestMonths: number[];
  currentStatus: string;
  activeNow: boolean;
  stageNow: 'Sowing Window' | 'Vegetative / Maturing' | 'Peak Harvest' | 'Off-Season Prep';
  maturityDays: string;
  soilTempMin: string;
  frostSafetyWindow: string;
  regionalNotes: string;
}

export const PlantingHarvestCalendar: React.FC<PlantingHarvestCalendarProps> = ({ farmLocation }) => {
  const [selectedSeason, setSelectedSeason] = useState<'All' | 'Warm Season' | 'Cool Season'>('All');
  const [selectedCropId, setSelectedCropId] = useState<string>('crop-maize');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // Current month is October (month index 9 / 10th month)
  const currentMonthIdx = 9; // 0-based for October
  const currentMonthNum = 10;

  const isMidwest = (farmLocation?.region || '').toLowerCase().includes('ia') ||
    (farmLocation?.name || '').toLowerCase().includes('iowa');
  const isNorthwest = (farmLocation?.region || '').toLowerCase().includes('wa') ||
    (farmLocation?.name || '').toLowerCase().includes('yakima');

  // Dynamic regional crop calendar dataset
  const crops: CropTimeline[] = [
    {
      id: 'crop-maize',
      name: 'Golden Maize',
      scientificName: 'Zea mays (Hybrid F1)',
      parcel: 'Sector A-1 (15 Ha)',
      icon: 'agriculture',
      seasonCategory: 'Warm Season',
      plantingMonths: isMidwest ? [5] : isNorthwest ? [5, 6] : [4, 5],
      growthMonths: isMidwest ? [6, 7, 8] : isNorthwest ? [6, 7, 8] : [5, 6, 7, 8, 9],
      harvestMonths: isMidwest ? [9, 10] : [9, 10, 11],
      currentStatus: 'Day 45 of 110 • Active Vegetative Stage',
      activeNow: true,
      stageNow: 'Vegetative / Maturing',
      maturityDays: '105-115 days',
      soilTempMin: '18°C (65°F)',
      frostSafetyWindow: 'Plant 2 weeks after final spring frost',
      regionalNotes: isMidwest
        ? 'Midwest Corn Belt: Strict planting cutoff May 25 to avoid fall freeze before dry-down.'
        : isNorthwest
        ? 'Pacific NW Basin: Plant into warm loamy rows once soil probes maintain 16°C+.'
        : 'Central Valley: Long 220-day thermal growing window with reliable sub-drip irrigation.',
    },
    {
      id: 'crop-pepper',
      name: 'Bell Pepper',
      scientificName: 'Capsicum annuum',
      parcel: 'Greenhouse B-4 (0.8 Ha)',
      icon: 'local_florist',
      seasonCategory: 'Greenhouse Continuous',
      plantingMonths: [3, 4, 8],
      growthMonths: [4, 5, 6, 8, 9, 10],
      harvestMonths: [6, 7, 10, 11],
      currentStatus: 'Day 28 of 75 • Flower initiation & pollination',
      activeNow: true,
      stageNow: 'Vegetative / Maturing',
      maturityDays: '70-85 days',
      soilTempMin: '21°C (70°F)',
      frostSafetyWindow: 'Climate-regulated greenhouse; zero frost exposure',
      regionalNotes:
        'Indoor controlled micro-climate with supplemental thermal blankets during cool autumn nights.',
    },
    {
      id: 'crop-wheat',
      name: 'Durum Winter Wheat',
      scientificName: 'Triticum durum',
      parcel: 'Sector B (West 20 Ha)',
      icon: 'grain',
      seasonCategory: 'Cool Season',
      plantingMonths: isMidwest ? [9, 10] : [10, 11],
      growthMonths: isMidwest ? [10, 11, 3, 4, 5] : [11, 12, 1, 2, 3, 4],
      harvestMonths: isMidwest ? [6, 7] : [5, 6],
      currentStatus: 'Optimal Sowing Window Open (Oct-Nov)',
      activeNow: true,
      stageNow: 'Sowing Window',
      maturityDays: '180-210 days (Overwintered)',
      soilTempMin: '12°C (54°F)',
      frostSafetyWindow: 'Cold vernalization required for winter tillering',
      regionalNotes: isMidwest
        ? 'Plant before early hard freeze to ensure 3-tiller root development prior to dormancy.'
        : 'Mediterranean climate winter sowing: Leverages winter rainwater and matures before summer heat waves.',
    },
    {
      id: 'crop-soybean',
      name: 'Organic Soybeans',
      scientificName: 'Glycine max',
      parcel: 'Sector B (East Rotation)',
      icon: 'eco',
      seasonCategory: 'Warm Season',
      plantingMonths: isMidwest ? [5, 6] : [5],
      growthMonths: isMidwest ? [6, 7, 8, 9] : [6, 7, 8],
      harvestMonths: [9, 10],
      currentStatus: 'Post-Harvest Rest • Sowing Prep for Spring',
      activeNow: false,
      stageNow: 'Peak Harvest',
      maturityDays: '100-115 days',
      soilTempMin: '16°C (60°F)',
      frostSafetyWindow: 'Plant once soil warms to prevent Pythium root rot',
      regionalNotes:
        'Ideal nitrogen-fixing precursor for next cycle maize. Incorporate residue to rebuild organic matter.',
    },
    {
      id: 'crop-chickpea',
      name: 'Desi Chickpeas',
      scientificName: 'Cicer arietinum',
      parcel: 'Valley Parcel A-14',
      icon: 'grass',
      seasonCategory: 'Cool Season',
      plantingMonths: [10, 11],
      growthMonths: [11, 12, 1, 2],
      harvestMonths: [3, 4],
      currentStatus: 'Seed Bedding Preparation Underway',
      activeNow: true,
      stageNow: 'Sowing Window',
      maturityDays: '95-105 days',
      soilTempMin: '15°C (59°F)',
      frostSafetyWindow: 'Tolerates light radiation frost down to -4°C during rosette stage',
      regionalNotes:
        'Low water demand cool-season pulse; optimal for dryland fields or low water allotment parcels.',
    },
  ];

  const filteredCrops = selectedSeason === 'All'
    ? crops
    : crops.filter((c) => c.seasonCategory === selectedSeason || c.seasonCategory === 'Greenhouse Continuous');

  const selectedCrop = crops.find((c) => c.id === selectedCropId) || crops[0];

  const getStageColor = (stage: CropTimeline['stageNow']) => {
    switch (stage) {
      case 'Sowing Window':
        return 'bg-[#6cf8bb] text-[#002113]';
      case 'Vegetative / Maturing':
        return 'bg-[#006c49] text-[#ffffff]';
      case 'Peak Harvest':
        return 'bg-[#f59e0b] text-[#ffffff]';
      default:
        return 'bg-[#eaedff] text-[#414943]';
    }
  };

  return (
    <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm border border-[#eaedff] space-y-3.5">
      {/* Header with Location Context */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#002718] text-[#6ffbbe] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          </div>
          <div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#131b2e] leading-tight">
              Planting & Harvest Calendar
            </h3>
            <span className="font-['Inter'] text-[10px] text-[#414943] block mt-0.5">
              Agronomic window adjusted for <strong>{farmLocation?.name || 'Valley Green Fields'}</strong>
            </span>
          </div>
        </div>

        {/* Current Month Badge */}
        <div className="flex items-center gap-1 bg-[#6cf8bb]/30 text-[#006c49] px-2.5 py-1 rounded-full shrink-0 font-['Inter'] text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
          <span>Now: Oct (Q4)</span>
        </div>
      </div>

      {/* Season Filters & Legend */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center p-0.5 rounded-lg bg-[#eaedff]">
          {(['All', 'Warm Season', 'Cool Season'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSeason(s)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                selectedSeason === s
                  ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                  : 'text-[#414943] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[9px] font-semibold text-[#414943]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-[#6cf8bb]"></span> Sowing
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-[#006c49]"></span> Growth
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-[#f59e0b]"></span> Harvest
          </span>
        </div>
      </div>

      {/* Interactive Crop Timeline Visualization Grid */}
      <div className="space-y-2 pt-1">
        {/* Month Header Axis */}
        <div className="grid grid-cols-12 gap-0.5 text-center text-[9px] font-bold text-[#414943] px-1 pb-1 border-b border-[#eaedff]">
          {months.map((m, idx) => (
            <div
              key={m}
              className={`py-0.5 rounded ${
                idx === currentMonthIdx
                  ? 'bg-[#002718] text-[#6ffbbe] font-black shadow-xs'
                  : 'text-[#414943]'
              }`}
            >
              {m}
            </div>
          ))}
        </div>

        {/* Crop Rows */}
        <div className="space-y-2">
          {filteredCrops.map((c) => {
            const isSelected = c.id === selectedCropId;
            const isPlantingNow = c.plantingMonths.includes(currentMonthNum);
            const isHarvestNow = c.harvestMonths.includes(currentMonthNum);
            const isGrowingNow = c.growthMonths.includes(currentMonthNum);

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCropId(c.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#006c49] bg-[#6cf8bb]/10 shadow-sm'
                    : 'border-[#eaedff] bg-[#f2f3ff] hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-[#006c49]">
                      {c.icon}
                    </span>
                    <span className="font-['Plus+Jakarta+Sans'] text-[12px] font-bold text-[#131b2e] truncate">
                      {c.name}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#414943] truncate hidden xs:inline">
                      ({c.parcel})
                    </span>
                  </div>

                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${getStageColor(c.stageNow)}`}>
                    {c.stageNow}
                  </span>
                </div>

                {/* 12-Month Gantt Bar */}
                <div className="relative grid grid-cols-12 gap-0.5 h-4 bg-[#ffffff] rounded-md p-0.5 border border-[#dae2fd]">
                  {/* Current month vertical indicator */}
                  <div
                    className="absolute top-0 bottom-0 z-10 w-0.5 bg-[#ba1a1a] pointer-events-none"
                    style={{ left: `${((currentMonthIdx + 0.5) / 12) * 100}%` }}
                    title="Current Month: October"
                  >
                    <div className="w-1.5 h-1.5 -ml-0.5 -mt-0.5 rounded-full bg-[#ba1a1a]"></div>
                  </div>

                  {Array.from({ length: 12 }).map((_, mIdx) => {
                    const monthNum = mIdx + 1;
                    const isPlant = c.plantingMonths.includes(monthNum);
                    const isHarvest = c.harvestMonths.includes(monthNum);
                    const isGrowth = c.growthMonths.includes(monthNum);

                    let barColor = 'bg-transparent';
                    if (isPlant) barColor = 'bg-[#6cf8bb] rounded-xs';
                    else if (isHarvest) barColor = 'bg-[#f59e0b] rounded-xs';
                    else if (isGrowth) barColor = 'bg-[#006c49] rounded-xs opacity-90';

                    return (
                      <div
                        key={mIdx}
                        className={`h-full ${barColor} transition-colors`}
                      />
                    );
                  })}
                </div>

                {/* Subtext active status */}
                <div className="flex items-center justify-between text-[10px] mt-1 text-[#414943]">
                  <span className="truncate">{c.currentStatus}</span>
                  {isPlantingNow && (
                    <span className="text-[#006c49] font-bold shrink-0">⚡ Optimal Sowing Window</span>
                  )}
                  {isHarvestNow && (
                    <span className="text-[#d97706] font-bold shrink-0">🌾 Harvest Ready</span>
                  )}
                  {isGrowingNow && !isPlantingNow && !isHarvestNow && (
                    <span className="text-[#002718] font-semibold shrink-0">🌿 In Field</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Crop Agronomic Detail Panel */}
      <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-2 border border-[#eaedff] text-[11px] animate-fade-in">
        <div className="flex items-center justify-between border-b border-[#dae2fd] pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-['Plus+Jakarta+Sans'] font-bold text-[13px] text-[#002718]">
              {selectedCrop.name}
            </span>
            <span className="text-[11px] italic text-[#414943]">({selectedCrop.scientificName})</span>
          </div>
          <span className="text-[10px] text-[#006c49] font-bold">
            Maturity: {selectedCrop.maturityDays}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#ffffff] p-2 rounded-lg">
            <span className="text-[#414943] block text-[10px]">Min Soil Temperature</span>
            <strong className="text-[#002718] text-[12px]">{selectedCrop.soilTempMin}</strong>
          </div>
          <div className="bg-[#ffffff] p-2 rounded-lg">
            <span className="text-[#414943] block text-[10px]">Frost Window Margin</span>
            <strong className="text-[#002718] text-[12px]">{selectedCrop.frostSafetyWindow}</strong>
          </div>
        </div>

        <div className="flex items-start gap-1.5 pt-0.5">
          <span className="material-symbols-outlined text-[15px] text-[#006c49] shrink-0 mt-0.5">
            pin_drop
          </span>
          <p className="text-[#131b2e] leading-snug">
            <strong className="text-[#006c49]">Location Directive:</strong> {selectedCrop.regionalNotes}
          </p>
        </div>
      </div>
    </div>
  );
};
