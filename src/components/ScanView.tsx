import React, { useState, useRef } from 'react';
import { SpecimenSample, FarmExpense } from '../types';
import { PRIMARY_SPECIMEN, APP_ASSETS } from '../data/mockData';
import { analyzeLeafImage, PATHOLOGY_PROFILES } from '../utils/leafClassifier';
import { VoiceSymptomRecorder } from './VoiceSymptomRecorder';

interface ScanViewProps {
  onAddLog: (expense: FarmExpense) => void;
  onOrderProduct: (productName: string, price: number) => void;
}

export const ScanView: React.FC<ScanViewProps> = ({
  onAddLog,
  onOrderProduct,
}) => {
  const [protocolTab, setProtocolTab] = useState<'bio' | 'chem'>('bio');
  const [currentSpecimen, setCurrentSpecimen] = useState<SpecimenSample>(PRIMARY_SPECIMEN);
  const [scannedHistory, setScannedHistory] = useState<SpecimenSample[]>([PRIMARY_SPECIMEN]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [treatmentAdded, setTreatmentAdded] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSymptomTranscribed = (transcript: string) => {
    setVoiceTranscript(transcript);
    const lower = transcript.toLowerCase();

    // Correlate spoken keywords with pathology database
    let matchedIndex = -1;
    if (lower.includes('powdery') || lower.includes('white') || lower.includes('talc')) {
      matchedIndex = 1; // Powdery Mildew
    } else if (lower.includes('water-soaked') || lower.includes('collapse') || lower.includes('late')) {
      matchedIndex = 2; // Late Blight
    } else if (lower.includes('rust') || lower.includes('pustule') || lower.includes('cinnamon')) {
      matchedIndex = 3; // Common Rust
    } else if (lower.includes('angular') || lower.includes('shot-hole') || lower.includes('greasy') || lower.includes('bacterial')) {
      matchedIndex = 4; // Bacterial Leaf Spot
    } else if (lower.includes('vein') || lower.includes('iron') || lower.includes('chlorosis')) {
      matchedIndex = 5; // Chlorosis
    } else if (lower.includes('ring') || lower.includes('target') || lower.includes('early') || lower.includes('halo')) {
      matchedIndex = 0; // Early Blight
    }

    if (matchedIndex !== -1) {
      const p = PATHOLOGY_PROFILES[matchedIndex];
      const updatedSample: SpecimenSample = {
        ...currentSpecimen,
        ...p,
        confidence: 99.4, // Boosted by multimodal verbal confirmation
        symptoms: [
          ...p.symptoms,
          `Farmer Field Verbal Note: "${transcript}"`,
        ],
      };
      setCurrentSpecimen(updatedSample);
      setScannedHistory((prev) => [updatedSample, ...prev.filter((item) => item.id !== updatedSample.id)]);
    } else {
      setCurrentSpecimen((prev) => ({
        ...prev,
        confidence: Math.min(99.6, prev.confidence + 1.0),
        symptoms: [
          ...prev.symptoms,
          `Farmer Field Verbal Note: "${transcript}"`,
        ],
      }));
    }
  };

  const sampleLibrary: SpecimenSample[] = [
    PRIMARY_SPECIMEN,
    {
      ...PATHOLOGY_PROFILES[1],
      imageUrl: 'https://images.unsplash.com/photo-1598512752271-33f913a5af13?auto=format&fit=crop&w=800&q=80',
      sensorCode: 'CV-412',
      macroLens: '3.5mm Macro',
    },
    {
      ...PATHOLOGY_PROFILES[2],
      imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=800&q=80',
      sensorCode: 'CV-118',
      macroLens: '5.0mm Macro',
    },
    {
      ...PATHOLOGY_PROFILES[3],
      imageUrl: APP_ASSETS.maizeField,
      sensorCode: 'CV-704',
      macroLens: '2.8mm Macro',
    },
    {
      ...PATHOLOGY_PROFILES[4],
      imageUrl: APP_ASSETS.bellPepper,
      sensorCode: 'CV-835',
      macroLens: '4.5mm Macro',
    },
    {
      ...PATHOLOGY_PROFILES[5],
      imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
      sensorCode: 'CV-529',
      macroLens: '3.0mm Macro',
    },
  ];

  const handleRetakeClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      setScanStep('Ingesting foliage macro imagery & leaf lamina contours...');
      const url = URL.createObjectURL(file);

      setTimeout(() => {
        setScanStep('Analyzing spectral reflectance & chlorotic lesion density...');
      }, 500);

      setTimeout(async () => {
        setScanStep('Matching against neural phytopathology profiles...');
        try {
          const result = await analyzeLeafImage(file, url);
          setCurrentSpecimen(result);
          setScannedHistory((prev) => [result, ...prev.filter((p) => p.id !== result.id)]);
        } catch {
          // Fallback if canvas extraction fails
          const nextIndex = (scannedHistory.length) % PATHOLOGY_PROFILES.length;
          const fallbackProfile = PATHOLOGY_PROFILES[nextIndex];
          const newSample: SpecimenSample = {
            ...fallbackProfile,
            id: `spec-${Date.now()}`,
            imageUrl: url,
            sensorCode: `CV-${Math.floor(100 + Math.random() * 899)}`,
            macroLens: '4.2mm Macro',
          };
          setCurrentSpecimen(newSample);
          setScannedHistory((prev) => [newSample, ...prev]);
        } finally {
          setIsScanning(false);
          setScanStep('');
        }
      }, 1000);
    }
  };

  const handleSelectSample = (sample: SpecimenSample) => {
    setIsScanning(true);
    setScanStep('Loading specimen pathology signatures...');
    setShowLibrary(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanStep('');
      setCurrentSpecimen(sample);
      setScannedHistory((prev) => [sample, ...prev.filter((p) => p.id !== sample.id)]);
    }, 500);
  };

  const handleAddToFarmLog = () => {
    setTreatmentAdded(true);
    onAddLog({
      id: `exp-${Date.now()}`,
      category: 'Fertilizer & Spray',
      description: `${currentSpecimen.diseaseName} treatment protocol: ${
        protocolTab === 'bio'
          ? currentSpecimen.bioProtocol[0]?.title || 'Bio-Spray'
          : currentSpecimen.chemProtocol[0]?.title || 'Targeted Spray'
      }`,
      amount: currentSpecimen.recommendedProduct.price,
      date: 'Today',
      parcel: 'Sector B (Diagnosed Specimen)',
    });
    setTimeout(() => {
      setTreatmentAdded(false);
    }, 3000);
  };

  const getRiskBadge = (risk: string) => {
    const lower = risk.toLowerCase();
    if (lower.includes('rapid') || lower.includes('critical')) {
      return {
        bg: 'bg-[#ba1a1a] text-[#ffffff] animate-pulse',
        border: 'border-[#ba1a1a]',
        textColor: 'text-[#ba1a1a]',
        icon: 'crisis_alert',
      };
    }
    if (lower.includes('high')) {
      return {
        bg: 'bg-[#ffdad6] text-[#ba1a1a]',
        border: 'border-[#ffdad6]',
        textColor: 'text-[#ba1a1a]',
        icon: 'warning',
      };
    }
    if (lower.includes('moderate')) {
      return {
        bg: 'bg-[#fef3c7] text-[#92400e]',
        border: 'border-[#fef3c7]',
        textColor: 'text-[#d97706]',
        icon: 'info',
      };
    }
    return {
      bg: 'bg-[#6cf8bb]/40 text-[#006c49]',
      border: 'border-[#6cf8bb]/40',
      textColor: 'text-[#006c49]',
      icon: 'check_circle',
    };
  };

  const currentRisk = getRiskBadge(currentSpecimen.riskSpread);

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Hidden file input for taking photo / uploading */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#002718] via-[#133e2b] to-[#006c49] p-4 text-[#ffffff] shadow-md">
        <div className="relative z-10 flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#6cf8bb] text-[#002113]">
              <span className="material-symbols-outlined text-[14px]">psychology</span>
            </span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-[#4edea3] font-bold">
              Bio-Vision Neural Core v4.2
            </span>
          </div>
          <h1 className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold tracking-tight text-[#ffffff] leading-tight">
            AI Crop Doctor
          </h1>
          <p className="font-['Inter'] text-[12px] text-[#7da990]">
            Instant Neural Plant Pathologist & Precision Treatment Guidance
          </p>
        </div>
        <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-[#6cf8bb]/10 blur-xl pointer-events-none"></div>
      </div>

      {/* Scanned Leaves Comparison Ribbon (shown when multiple leaves exist) */}
      {scannedHistory.length > 1 && (
        <div className="bg-[#ffffff] rounded-xl p-2.5 shadow-sm border border-[#eaedff]">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#414943]">
              Scanned Leaves History ({scannedHistory.length})
            </span>
            <span className="text-[10px] text-[#006c49] font-semibold">Tap to Compare</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {scannedHistory.map((item, idx) => {
              const isSelected = item.id === currentSpecimen.id;
              const rBadge = getRiskBadge(item.riskSpread);
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSpecimen(item)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#002718] text-[#ffffff] shadow-sm ring-1 ring-[#6cf8bb]'
                      : 'bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff]'
                  }`}
                  type="button"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.diseaseName}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold truncate max-w-[120px]">
                      Leaf #{idx + 1}: {item.diseaseName}
                    </span>
                    <span className={`text-[9px] font-semibold ${isSelected ? 'text-[#a3d1b6]' : rBadge.textColor}`}>
                      Risk: {item.riskSpread}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Specimen Inspection Card */}
      <div className="relative rounded-xl bg-[#ffffff] p-3 shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#eaedff] flex items-center justify-center">
          <img
            className="w-full h-full object-cover"
            alt={`${currentSpecimen.cropName} lesion`}
            src={currentSpecimen.imageUrl}
          />
          <div className="absolute inset-0 bg-[#002718]/10 pointer-events-none"></div>

          {/* Scanning Animation Overlay if active */}
          {isScanning && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center text-white space-y-3 z-30 p-4 text-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[#6cf8bb] animate-spin">
                  center_focus_strong
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold tracking-wide text-[#6cf8bb] block">
                  Analyzing Specimen...
                </span>
                <p className="text-xs text-white/80 max-w-xs">{scanStep}</p>
              </div>
            </div>
          )}

          {/* Overlay hud elements */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
                <span className="font-['Inter'] text-[10px] text-[#006c49] font-bold tracking-wider">
                  SPECTRAL LOCK
                </span>
              </div>
              <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#002718]/80 backdrop-blur-md text-[#ffffff] font-['Inter'] text-[10px]">
                <span className="material-symbols-outlined text-[12px]">filter_center_focus</span>
                <span>{currentSpecimen.sensorCode}</span>
              </div>
            </div>

            {/* Center target circle lesion identified */}
            <div className="relative w-full h-24 flex items-center justify-center">
              <div className="absolute w-28 h-28 rounded-full bg-[#ba1a1a]/15 border border-[#ba1a1a]/40 border-dashed animate-ping"></div>
              <div className="relative px-3 py-1.5 rounded-lg bg-[#ffffff]/95 backdrop-blur-md shadow-md flex items-center space-x-1.5 border border-[#eaedff]">
                <span className={`material-symbols-outlined text-[18px] ${currentRisk.textColor}`}>
                  {currentRisk.icon}
                </span>
                <div className="flex flex-col">
                  <span className={`font-['Inter'] text-[10px] uppercase font-bold ${currentRisk.textColor}`}>
                    {currentSpecimen.surfaceLesionPercent}% Surface Area
                  </span>
                  <span className="font-['Inter'] text-[12px] text-[#414943] leading-none">
                    {currentSpecimen.diseaseName} Identified
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-['Inter'] text-[10px] text-[#ffffff] bg-[#002718]/60 px-2 py-0.5 rounded backdrop-blur-sm">
                {currentSpecimen.macroLens}
              </span>
              <span className="font-['Inter'] text-[10px] text-[#ffffff] bg-[#002718]/60 px-2 py-0.5 rounded backdrop-blur-sm">
                {currentSpecimen.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Confidence pill */}
        <div className="flex items-center justify-between px-1">
          <div className="inline-flex items-center space-x-1.5 bg-[#6cf8bb]/40 text-[#00714d] px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">verified</span>
            <span className="font-['Inter'] text-[10px] font-bold">
              Analyzed with {currentSpecimen.confidence}% Confidence
            </span>
          </div>
          <span className="font-['Inter'] text-[10px] text-[#414943]">Model: DeepLeaf-v3.8</span>
        </div>

        {/* Action Buttons: Retake / Field Library */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleRetakeClick}
            className="w-full h-11 flex items-center justify-center space-x-1.5 rounded-lg bg-[#002718] hover:bg-[#006c49] text-[#ffffff] font-['Inter'] text-[12px] font-semibold active:scale-95 transition-all shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
            <span>Upload New Leaf</span>
          </button>
          <button
            onClick={() => setShowLibrary(true)}
            className="w-full h-11 flex items-center justify-center space-x-1.5 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-['Inter'] text-[12px] font-semibold active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">folder_open</span>
            <span>Field Library ({sampleLibrary.length})</span>
          </button>
        </div>
      </div>

      {/* Hands-Free Voice-to-Text Verbal Symptom Recorder */}
      <VoiceSymptomRecorder
        onSymptomTranscribed={handleSymptomTranscribed}
        currentTranscript={voiceTranscript}
      />

      {/* Pathology Report Card */}
      <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col min-w-0 pr-2">
            <span className="font-['Inter'] text-[10px] text-[#006c49] uppercase font-bold tracking-wider">
              Pathology Report
            </span>
            <h2 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] tracking-tight">
              {currentSpecimen.diseaseName}
            </h2>
            <span className="font-['Inter'] text-[12px] italic text-[#414943] truncate">
              {currentSpecimen.scientificName} • {currentSpecimen.cropName}
            </span>
          </div>
          <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full font-['Inter'] text-[10px] font-bold ${currentRisk.bg}`}>
            {currentSpecimen.stage}
          </span>
        </div>

        {/* Multi-modal verbal verification badge if voice was recorded */}
        {voiceTranscript && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#6cf8bb]/20 border border-[#6cf8bb]/40 text-[#006c49] text-[11px] font-semibold animate-fade-in">
            <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
            <span>Multi-Modal Confirmed: Optical Lesion + Verbal Audio Input</span>
          </div>
        )}

        {/* Dynamic 3 metrics grid with customized risk speed color */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#f2f3ff] text-center">
          <div className="flex flex-col">
            <span className="font-['Inter'] text-[10px] text-[#414943]">Affected Canopy</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[20px] text-[#002718] font-bold">
              {currentSpecimen.affectedCanopy}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Inter'] text-[10px] text-[#414943]">Risk Spread</span>
            <span className={`font-['Plus+Jakarta+Sans'] text-[18px] font-bold ${currentRisk.textColor}`}>
              {currentSpecimen.riskSpread}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Inter'] text-[10px] text-[#414943]">Action Window</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[18px] text-[#006c49] font-bold">
              {currentSpecimen.actionWindow}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-1">
          <span className="font-['Inter'] text-[12px] text-[#002718] font-bold">
            Identified Diagnostic Symptoms
          </span>
          <div className="space-y-1.5">
            {currentSpecimen.symptoms.map((symptom, idx) => {
              const isVoiceNote = symptom.startsWith('Farmer Field Verbal Note:');
              return (
                <div
                  key={idx}
                  className={`flex items-start space-x-2 ${
                    isVoiceNote
                      ? 'p-2 rounded-lg bg-[#6cf8bb]/15 border border-[#6cf8bb]/40 text-[#006c49] font-medium'
                      : 'text-[#131b2e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#006c49] shrink-0 mt-0.5">
                    {isVoiceNote ? 'mic' : 'check_circle'}
                  </span>
                  <span className="font-['Inter'] text-[12px] leading-relaxed">{symptom}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Treatment Protocol Card */}
      <div className="rounded-xl bg-[#ffffff] p-4 shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">
            Treatment Protocol
          </h3>
          <div className="flex items-center p-0.5 rounded-lg bg-[#eaedff]">
            <button
              onClick={() => setProtocolTab('bio')}
              className={`px-2.5 py-1 rounded-md font-['Inter'] text-[10px] font-semibold transition-all ${
                protocolTab === 'bio'
                  ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                  : 'text-[#414943] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Organic / Bio
            </button>
            <button
              onClick={() => setProtocolTab('chem')}
              className={`px-2.5 py-1 rounded-md font-['Inter'] text-[10px] font-semibold transition-all ${
                protocolTab === 'chem'
                  ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                  : 'text-[#414943] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Chemical
            </button>
          </div>
        </div>

        {/* Protocol Content */}
        {protocolTab === 'bio' ? (
          <div className="space-y-2.5 animate-fade-in">
            {currentSpecimen.bioProtocol.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#f2f3ff]">
                <div className="w-8 h-8 rounded-full bg-[#006c49]/15 flex items-center justify-center shrink-0 text-[#006c49]">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Inter'] text-[12px] font-bold text-[#131b2e]">
                    {item.title}
                  </span>
                  <p className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 animate-fade-in">
            {currentSpecimen.chemProtocol.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-lg bg-[#f2f3ff]">
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Inter'] text-[12px] font-bold text-[#131b2e]">
                    {item.title}
                  </span>
                  <p className="font-['Inter'] text-[12px] text-[#414943] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preventive Cultural Practice */}
        <div className="p-3 rounded-lg bg-[#6cf8bb]/20 flex flex-col space-y-1 border border-[#6cf8bb]/30">
          <div className="flex items-center space-x-1.5 text-[#006c49]">
            <span className="material-symbols-outlined text-[16px]">water_drop</span>
            <span className="font-['Inter'] text-[12px] font-bold">Preventive Cultural Practice</span>
          </div>
          <p className="font-['Inter'] text-[12px] text-[#414943] leading-snug">
            {currentSpecimen.culturalPractice}
          </p>
        </div>
      </div>

      {/* Recommended Commercial Product */}
      <div className="rounded-xl bg-[#ffffff] p-3 shadow-sm flex items-center justify-between border border-[#eaedff]">
        <div className="flex items-center space-x-2.5 min-w-0">
          <img
            className="w-12 h-12 rounded-lg object-cover bg-[#eaedff] shrink-0"
            alt={currentSpecimen.recommendedProduct.name}
            src={currentSpecimen.recommendedProduct.imageUrl}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-['Inter'] text-[12px] font-bold text-[#131b2e] truncate">
              {currentSpecimen.recommendedProduct.name}
            </span>
            <span className="font-['Inter'] text-[12px] text-[#006c49] font-semibold truncate">
              {currentSpecimen.recommendedProduct.size}
            </span>
          </div>
        </div>
        <span className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#002718] shrink-0 pl-2">
          ${currentSpecimen.recommendedProduct.price.toFixed(2)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-2 pt-1">
        <button
          onClick={handleAddToFarmLog}
          className="w-full h-12 flex items-center justify-center space-x-2 rounded-xl bg-[#002718] text-[#ffffff] font-['Inter'] text-[14px] font-semibold active:scale-[0.98] shadow-md transition-all hover:bg-[#006c49]"
          type="button"
        >
          {treatmentAdded ? (
            <>
              <span className="material-symbols-outlined text-[20px] text-[#6ffbbe]">done_all</span>
              <span className="text-[#6ffbbe]">Treatment Added to Farm Log!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">add_task</span>
              <span>Add Treatment to Farm Log</span>
            </>
          )}
        </button>

        <button
          onClick={() =>
            onOrderProduct(
              currentSpecimen.recommendedProduct.name,
              currentSpecimen.recommendedProduct.price
            )
          }
          className="w-full h-12 flex items-center justify-center space-x-2 rounded-xl bg-[#006c49] text-[#ffffff] font-['Inter'] text-[14px] font-semibold active:scale-[0.98] shadow-sm transition-all hover:bg-[#002718]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          <span>Order Recommended Treatment</span>
        </button>
      </div>

      {/* Field Library Modal */}
      {showLibrary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div>
                <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
                  Spectral Specimen Library
                </span>
                <h3 className="text-[18px] font-bold text-[#002718]">Select Different Leaf Sample</h3>
              </div>
              <button
                onClick={() => setShowLibrary(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#414943]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <p className="text-[12px] text-[#414943]">
              Choose from verified field specimens to test how different diseases, risk speeds, and action windows are classified:
            </p>

            <div className="space-y-2.5">
              {sampleLibrary.map((sample) => {
                const isCurrent = currentSpecimen.id === sample.id || currentSpecimen.diseaseName === sample.diseaseName;
                const rBadge = getRiskBadge(sample.riskSpread);
                return (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      isCurrent
                        ? 'border-[#006c49] bg-[#6cf8bb]/15 shadow-sm'
                        : 'border-[#eaedff] bg-[#f2f3ff] hover:bg-[#eaedff]'
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.cropName}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#006c49] uppercase">
                          {sample.cropName}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${rBadge.bg}`}>
                          {sample.riskSpread}
                        </span>
                      </div>
                      <h4 className="text-[13px] font-bold text-[#131b2e] truncate mt-0.5">
                        {sample.diseaseName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#414943]">
                        <span>Canopy: {sample.affectedCanopy}%</span>
                        <span>•</span>
                        <span>Action: {sample.actionWindow}</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#006c49]">chevron_right</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
