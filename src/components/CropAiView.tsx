import React, { useState } from 'react';
import { SoilType, CropRecommendation } from '../types';
import { CROP_RECOMMENDATIONS } from '../data/mockData';

interface CropAiViewProps {
  onOpenCultivationGuide: (crop: CropRecommendation) => void;
  onOpenCostSheet: (crop: CropRecommendation) => void;
}

export const CropAiView: React.FC<CropAiViewProps> = ({
  onOpenCultivationGuide,
  onOpenCostSheet,
}) => {
  const [selectedSoil, setSelectedSoil] = useState<SoilType>('Loamy');
  const [phValue, setPhValue] = useState<number>(6.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(CROP_RECOMMENDATIONS);
  const [expandedCropId, setExpandedCropId] = useState<string | null>(null);

  const soilTypes: SoilType[] = ['Loamy', 'Clay', 'Sandy', 'Black', 'Silt'];

  const handleResetPresets = () => {
    setSelectedSoil('Loamy');
    setPhValue(6.5);
    setRecommendations(CROP_RECOMMENDATIONS);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Dynamically tweak scores slightly based on pH & soil to feel alive
      const updated = CROP_RECOMMENDATIONS.map((c) => {
        let score = c.matchScore;
        if (selectedSoil === 'Sandy') score = Math.max(70, score - 5);
        if (selectedSoil === 'Clay') score = Math.max(72, score - 3);
        if (selectedSoil === 'Black') score = Math.min(99, score + 1);
        if (phValue > 7.5) score = Math.max(68, score - 6);
        return { ...c, matchScore: score };
      });
      setRecommendations(updated);
    }, 850);
  };

  const getPhStatus = (ph: number) => {
    if (ph >= 6.2 && ph <= 7.2) return { label: 'Optimal', color: 'bg-[#6cf8bb]/60 text-[#006c49]' };
    if (ph < 6.2) return { label: 'Acidic', color: 'bg-[#ffdad6] text-[#ba1a1a]' };
    return { label: 'Alkaline', color: 'bg-[#e2e7ff] text-[#002718]' };
  };

  const phStatus = getPhStatus(phValue);

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* System Status Banner */}
      <div className="flex items-center justify-between bg-[#133e2b] text-[#7da990] px-3.5 py-2.5 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-[#006c49] text-[#ffffff]">
            <span className="material-symbols-outlined text-[15px]">psychology</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#6cf8bb] animate-ping"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#6cf8bb] truncate font-bold">
              Engine v3.2 Active
            </span>
            <span className="font-['Inter'] text-[12px] text-[#ffffff] truncate">
              Soil & Climate Telemetry Sync
            </span>
          </div>
        </div>
        <span className="bg-[#6cf8bb] text-[#002113] font-['Inter'] text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
          Calibrated
        </span>
      </div>

      {/* Main Soil & Climate Parameters Card */}
      <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-[#eaedff]">
        {/* Section Title & Presets */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">Field Parameters</h2>
            <p className="font-['Inter'] text-[12px] text-[#414943]">Valley Parcel A-14 • Sensor Ingestion</p>
          </div>
          <button
            onClick={handleResetPresets}
            className="flex items-center gap-1 font-['Inter'] text-[12px] font-semibold text-[#006c49] hover:text-[#002718] active:scale-95 transition-all bg-[#eaedff] px-2.5 py-1 rounded-full"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
            <span>Preset</span>
          </button>
        </div>

        {/* Soil Type Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="font-['Inter'] text-[12px] text-[#414943] flex items-center justify-between font-medium">
            <span>Soil Profile</span>
            <span className="text-[#006c49] font-bold">{selectedSoil} (Active)</span>
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {soilTypes.map((soil) => {
              const isActive = selectedSoil === soil;
              return (
                <button
                  key={soil}
                  onClick={() => setSelectedSoil(soil)}
                  className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shrink-0 transition-all ${
                    isActive
                      ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                      : 'bg-[#eaedff] text-[#414943] hover:bg-[#e2e7ff]'
                  }`}
                  type="button"
                >
                  {soil} {soil === 'Loamy' || soil === 'Black' ? 'Soil' : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Soil pH Slider */}
        <div className="bg-[#f2f3ff] rounded-xl p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006c49] text-[18px]">science</span>
              <span className="font-['Inter'] text-[12px] font-semibold text-[#131b2e]">Soil pH Value</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#002718]">
                {phValue.toFixed(1)}
              </span>
              <span className={`${phStatus.color} font-['Inter'] text-[10px] font-bold px-1.5 py-0.5 rounded-full`}>
                {phStatus.label}
              </span>
            </div>
          </div>
          <div className="relative w-full flex items-center">
            <input
              aria-label="Soil pH Slider"
              className="w-full h-2 bg-[#dae2fd] rounded-lg appearance-none cursor-pointer accent-[#006c49] focus:outline-none"
              max="9.0"
              min="4.5"
              step="0.1"
              type="range"
              value={phValue}
              onChange={(e) => setPhValue(parseFloat(e.target.value))}
            />
          </div>
          <div className="flex justify-between font-['Inter'] text-[10px] text-[#414943] px-0.5 font-medium">
            <span>4.5 Acidic</span>
            <span className="text-[#006c49] font-bold">6.5 Neutral</span>
            <span>9.0 Alkaline</span>
          </div>
        </div>

        {/* NPK Nutrient Gauges */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[#006c49] text-[17px]">grass</span>
              Nutrient Levels (NPK mg/kg)
            </span>
            <span className="font-['Inter'] text-[10px] text-[#414943]">IoT Probe 04</span>
          </div>

          {/* Nitrogen (N) */}
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] shrink-0"></span>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold">Nitrogen (N)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-bold">140 ppm</span>
                <span className="bg-[#6cf8bb] text-[#00714d] font-['Inter'] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  High
                </span>
              </div>
            </div>
            <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Phosphorus (P) */}
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#91db2a] shrink-0"></span>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold">Phosphorus (P)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-bold">45 ppm</span>
                <span className="bg-[#e2e7ff] text-[#131b2e] font-['Inter'] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  Medium
                </span>
              </div>
            </div>
            <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
              <div className="bg-[#91db2a] h-full rounded-full transition-all duration-300" style={{ width: '48%' }}></div>
            </div>
          </div>

          {/* Potassium (K) */}
          <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#70b100] shrink-0"></span>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold">Potassium (K)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-bold">165 ppm</span>
                <span className="bg-[#6cf8bb] text-[#00714d] font-['Inter'] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  High
                </span>
              </div>
            </div>
            <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
              <div className="bg-[#70b100] h-full rounded-full transition-all duration-300" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* Climate & Season Overview */}
        <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#002718] shrink-0">
              <span className="material-symbols-outlined text-[20px]">cloudy_snowing</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Inter'] text-[12px] text-[#131b2e] font-semibold">Rainfed / Monsoon</span>
              <span className="font-['Inter'] text-[12px] text-[#414943]">Annual Avg 850mm • 22° - 31°C</span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] active:scale-95 transition-all"
            type="button"
            title="Adjust seasonal climate weights"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Generate CTA Action */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full h-12 bg-[#006c49] text-[#ffffff] rounded-xl font-['Inter'] text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_8px_20px_-4px_rgba(0,108,73,0.3)] hover:bg-[#002718] active:scale-[0.98] transition-all"
          type="button"
        >
          {isGenerating ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Analyzing Soil Microbiome...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span>Generate AI Crop Recommendations</span>
            </>
          )}
        </button>
      </div>

      {/* AI Prediction Results Header */}
      <div className="flex items-center justify-between mb-1 px-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#006c49] text-[20px]">recommend</span>
          <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">Top Field Matches</h3>
        </div>
        <span className="font-['Inter'] text-[10px] text-[#414943] bg-[#eaedff] px-2 py-0.5 rounded-full font-semibold">
          {recommendations.length} Viable Crops
        </span>
      </div>

      {/* Recommendations List */}
      <div className="flex flex-col gap-4">
        {/* MATCH #1: Yellow Sweet Corn / Maize */}
        {recommendations[0] && (
          <div className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col border border-[#eaedff]">
            {/* Image Hero with Dynamic Badging */}
            <div className="relative h-44 w-full">
              <img
                className="w-full h-full object-cover"
                alt="Yellow sweet corn in morning sunlight"
                src={recommendations[0].imageUrl}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002718]/85 via-[#002718]/30 to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-3 left-3 bg-[#faf8ff]/90 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-[#006c49] text-[16px]">verified</span>
                <span className="font-['Inter'] text-[12px] text-[#131b2e] font-bold">Top Recommended</span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#ffffff]/90 backdrop-blur-md text-[#002718] font-bold px-2 py-1 rounded-full shadow-sm">
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#eaedff]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="text-[#006c49]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${recommendations[0].matchScore}, 100`}
                      strokeLinecap="round"
                      strokeWidth="4.5"
                    />
                  </svg>
                </div>
                <span className="font-['Plus+Jakarta+Sans'] text-[12px] font-bold text-[#006c49]">
                  {recommendations[0].matchScore}%
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex flex-col">
                <h4 className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#ffffff] leading-tight">
                  {recommendations[0].title}
                </h4>
                <span className="font-['Inter'] text-[12px] text-[#a3d1b6]">
                  {recommendations[0].scientificName} • {recommendations[0].variety}
                </span>
              </div>
            </div>

            {/* Content Breakdown */}
            <div className="p-4 flex flex-col gap-3.5">
              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-2.5 rounded-xl">
                <div className="flex flex-col items-center text-center">
                  <span className="font-['Inter'] text-[10px] text-[#414943]">Est. Yield</span>
                  <span className="font-['Plus+Jakarta+Sans'] text-[14px] font-bold text-[#002718] mt-0.5">
                    {recommendations[0].estYield}
                  </span>
                  <span className="font-['Inter'] text-[10px] text-[#006c49] font-semibold">
                    {recommendations[0].yieldComparison}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-['Inter'] text-[10px] text-[#414943]">Maturation</span>
                  <span className="font-['Plus+Jakarta+Sans'] text-[14px] font-bold text-[#002718] mt-0.5">
                    {recommendations[0].maturationDays}
                  </span>
                  <span className="font-['Inter'] text-[10px] text-[#414943]">{recommendations[0].cycleType}</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="font-['Inter'] text-[10px] text-[#414943]">Profit Margin</span>
                  <span className="font-['Plus+Jakarta+Sans'] text-[14px] font-bold text-[#006c49] mt-0.5">
                    {recommendations[0].profitMargin}
                  </span>
                  <span className="font-['Inter'] text-[10px] text-[#006c49] font-semibold">
                    {recommendations[0].roiType}
                  </span>
                </div>
              </div>

              {/* AI Match Justification Box */}
              <div className="flex items-start gap-2 bg-[#eaedff] p-3 rounded-lg">
                <span className="material-symbols-outlined text-[#006c49] text-[20px] shrink-0 mt-0.5">
                  lightbulb
                </span>
                <p className="font-['Inter'] text-[12px] text-[#131b2e] leading-relaxed">
                  <strong className="font-semibold text-[#006c49]">Why it fits:</strong> {recommendations[0].whyItFits}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onOpenCultivationGuide(recommendations[0])}
                  className="flex-1 h-11 bg-[#002718] text-[#ffffff] rounded-xl font-['Inter'] text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm hover:bg-[#006c49]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Cultivation Guide</span>
                </button>
                <button
                  onClick={() => onOpenCostSheet(recommendations[0])}
                  className="h-11 px-3.5 bg-[#eaedff] text-[#131b2e] rounded-xl font-['Inter'] text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all hover:bg-[#e2e7ff]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006c49]">calculate</span>
                  <span>Cost Sheet</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MATCH #2: Organic Soya Beans */}
        {recommendations[1] && (
          <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#eaedff]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Organic Soya Beans"
                    src={recommendations[1].imageUrl}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">
                      {recommendations[1].title}
                    </h4>
                  </div>
                  <span className="font-['Inter'] text-[12px] text-[#414943]">
                    {recommendations[1].scientificName} • {recommendations[1].variety}
                  </span>
                </div>
              </div>

              {/* Radial Score */}
              <div className="flex items-center gap-1 bg-[#eaedff] px-2 py-1 rounded-full shrink-0">
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#dae2fd]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="text-[#006c49]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${recommendations[1].matchScore}, 100`}
                      strokeLinecap="round"
                      strokeWidth="4.5"
                    />
                  </svg>
                </div>
                <span className="font-['Inter'] text-[12px] text-[#006c49] font-bold">
                  {recommendations[1].matchScore}%
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-lg font-['Inter'] text-[12px]">
              <span className="text-[#131b2e]">
                Yield: <strong className="text-[#002718] font-semibold">{recommendations[1].estYield}</strong>
              </span>
              <span className="text-[#414943]">|</span>
              <span className="text-[#131b2e]">
                Cycle: <strong className="text-[#002718] font-semibold">{recommendations[1].maturationDays}</strong>
              </span>
              <span className="text-[#414943]">|</span>
              <span className="text-[#131b2e]">
                ROI: <strong className="text-[#006c49] font-semibold">{recommendations[1].profitMargin}</strong>
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="font-['Inter'] text-[10px] text-[#414943] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#006c49]">eco</span>
                {recommendations[1].keyBenefit}
              </span>
              <button
                onClick={() => setExpandedCropId(expandedCropId === recommendations[1].id ? null : recommendations[1].id)}
                className="font-['Inter'] text-[12px] text-[#006c49] font-bold flex items-center gap-0.5 hover:text-[#002718] active:scale-95 transition-all"
                type="button"
              >
                <span>{expandedCropId === recommendations[1].id ? 'Hide' : 'Details'}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {expandedCropId === recommendations[1].id ? 'expand_less' : 'chevron_right'}
                </span>
              </button>
            </div>

            {/* Inline drawer if expanded */}
            {expandedCropId === recommendations[1].id && (
              <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-2.5 text-[12px] animate-fade-in">
                <p className="text-[#131b2e]">{recommendations[1].whyItFits}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenCultivationGuide(recommendations[1])}
                    className="flex-1 py-2 bg-[#002718] text-[#ffffff] rounded-lg text-center font-semibold text-[11px]"
                  >
                    Cultivation Guide
                  </button>
                  <button
                    onClick={() => onOpenCostSheet(recommendations[1])}
                    className="flex-1 py-2 bg-[#eaedff] text-[#131b2e] rounded-lg text-center font-semibold text-[11px]"
                  >
                    Cost Sheet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MATCH #3: Chickpeas / Pulses */}
        {recommendations[2] && (
          <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#eaedff]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Chickpeas pulses field"
                    src={recommendations[2].imageUrl}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">
                    {recommendations[2].title}
                  </h4>
                  <span className="font-['Inter'] text-[12px] text-[#414943]">
                    {recommendations[2].scientificName} • {recommendations[2].variety}
                  </span>
                </div>
              </div>

              {/* Radial Score */}
              <div className="flex items-center gap-1 bg-[#eaedff] px-2 py-1 rounded-full shrink-0">
                <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#dae2fd]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="text-[#006c49]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${recommendations[2].matchScore}, 100`}
                      strokeLinecap="round"
                      strokeWidth="4.5"
                    />
                  </svg>
                </div>
                <span className="font-['Inter'] text-[12px] text-[#006c49] font-bold">
                  {recommendations[2].matchScore}%
                </span>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-lg font-['Inter'] text-[12px]">
              <span className="text-[#131b2e]">
                Yield: <strong className="text-[#002718] font-semibold">{recommendations[2].estYield}</strong>
              </span>
              <span className="text-[#414943]">|</span>
              <span className="text-[#131b2e]">
                Cycle: <strong className="text-[#002718] font-semibold">{recommendations[2].maturationDays}</strong>
              </span>
              <span className="text-[#414943]">|</span>
              <span className="text-[#131b2e]">
                ROI: <strong className="text-[#006c49] font-semibold">{recommendations[2].profitMargin}</strong>
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className="font-['Inter'] text-[10px] text-[#414943] flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#006c49]">water_drop</span>
                {recommendations[2].keyBenefit}
              </span>
              <button
                onClick={() => setExpandedCropId(expandedCropId === recommendations[2].id ? null : recommendations[2].id)}
                className="font-['Inter'] text-[12px] text-[#006c49] font-bold flex items-center gap-0.5 hover:text-[#002718] active:scale-95 transition-all"
                type="button"
              >
                <span>{expandedCropId === recommendations[2].id ? 'Hide' : 'Details'}</span>
                <span className="material-symbols-outlined text-[16px]">
                  {expandedCropId === recommendations[2].id ? 'expand_less' : 'chevron_right'}
                </span>
              </button>
            </div>

            {/* Inline drawer if expanded */}
            {expandedCropId === recommendations[2].id && (
              <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-2.5 text-[12px] animate-fade-in">
                <p className="text-[#131b2e]">{recommendations[2].whyItFits}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenCultivationGuide(recommendations[2])}
                    className="flex-1 py-2 bg-[#002718] text-[#ffffff] rounded-lg text-center font-semibold text-[11px]"
                  >
                    Cultivation Guide
                  </button>
                  <button
                    onClick={() => onOpenCostSheet(recommendations[2])}
                    className="flex-1 py-2 bg-[#eaedff] text-[#131b2e] rounded-lg text-center font-semibold text-[11px]"
                  >
                    Cost Sheet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
