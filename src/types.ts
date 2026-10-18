export type TabType = 'dashboard' | 'crop-ai' | 'disease-scan' | 'market' | 'finances';

export type SoilType = 'Loamy' | 'Clay' | 'Sandy' | 'Black' | 'Silt';

export interface FarmLocation {
  name: string;
  latitude: number;
  longitude: number;
  region?: string;
  isAutoDetected: boolean;
  status: 'idle' | 'requesting' | 'success' | 'denied' | 'unsupported';
  errorMsg?: string;
}

export interface CommodityRate {
  id: string;
  name: string;
  location: string;
  lotId: string;
  price: number;
  unit: string;
  changePercent: number;
  changeValue: number;
  isBullish: boolean;
  insight: string;
  category: 'Cereals' | 'Pulses' | 'Vegetables' | 'Oilseeds';
  imageUrl: string;
  trend: number[];
  recommendation?: string;
  actionLabel?: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  lotCode: string;
  category: string;
  quantityTons: number;
  moisturePercent: number;
  askingPricePerTon: number;
  status: 'Active' | 'Under Offer' | 'Completed';
  imageUrl: string;
  highestBid?: {
    buyerName: string;
    buyerRating: number;
    completedDeals: number;
    bidPricePerTon: number;
    logisticsNote: string;
    bidsCount: number;
  };
}

export interface BuyerMessage {
  id: string;
  buyerName: string;
  avatar: string;
  company: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  lotRef: string;
  history: Array<{
    sender: 'buyer' | 'farmer';
    text: string;
    timestamp: string;
  }>;
}

export interface CropRecommendation {
  id: string;
  title: string;
  scientificName: string;
  variety: string;
  matchScore: number;
  isTopRecommended?: boolean;
  imageUrl: string;
  estYield: string;
  yieldComparison: string;
  maturationDays: string;
  cycleType: string;
  profitMargin: string;
  roiType: string;
  whyItFits: string;
  waterDemand: string;
  keyBenefit: string;
  costBreakdown: {
    seeds: number;
    fertilizers: number;
    irrigation: number;
    labor: number;
    expectedRevenue: number;
    netMargin: number;
  };
  cultivationGuide: {
    soilPreparation: string;
    sowingPeriod: string;
    irrigationMethod: string;
    fertilizerSchedule: string;
    pestVigilance: string;
  };
}

export interface SpecimenSample {
  id: string;
  cropName: string;
  scientificName: string;
  diseaseName: string;
  stage: string;
  confidence: number;
  affectedCanopy: number;
  riskSpread: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Rapid' | string;
  actionWindow: string;
  imageUrl: string;
  surfaceLesionPercent: number;
  sensorCode: string;
  macroLens: string;
  symptoms: string[];
  bioProtocol: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
  chemProtocol: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
  culturalPractice: string;
  recommendedProduct: {
    name: string;
    size: string;
    price: number;
    stockStatus: string;
    imageUrl: string;
  };
}

export interface FarmExpense {
  id: string;
  category: 'Fuel' | 'Seeds' | 'Labor' | 'Fertilizer & Spray' | 'Equipment';
  description: string;
  amount: number;
  date: string;
  parcel: string;
}
