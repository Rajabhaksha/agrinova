import { CommodityRate, MarketplaceListing, BuyerMessage, CropRecommendation, SpecimenSample, FarmExpense } from '../types';

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrIQdwW3jpxYnqjtjF1fFjjv5wWZIehC9fjP69bsoE7GSkkMvbeRsRuVq0r04PhML3TmrTHztiyvwNrli4kTDeyC77uNmVB4AnEpAxK_RZW9hOPX3Q6yh-RBhm-zVr-XITQUjiKiJrSTEyDkVF38HWLxsWLCkcZi7bZ1eBT7lSd2sGd8PAPzrxL42urg1yLtZFdFdXdvMW4Bg1tOmSjsfgPm_lWWMa59A3pFeXBRJNIIQQWYd16IQE',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJ0MdERJ9cfLrhQoFvulLEOdf84I1IWpshUCJWychJh8xl--cFPBGgod2a2_UJ-FT0sHZwACHtqkAM3XLuNiayPY4pWd6IySx_TU6i6NJFD2XMRTFe_-8Jge_OSo5zUSpH63ukVN6aajWJXTJ1cjwr6v374CePAWRFSr2yIaT7V7PqWfhW1jQvCRcAqH9t-vXkjuTY4Qnhoq5fXtK7DygH4anzq1gH7LaWkv73WCqrdfTCe2NX1TsP',
  maizeField: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO0N4b8xroTV4j1mUNfBveAE95oV0_uIvn9HyIxsJRgTAAHKZF741CdIqqSmoGdO-OqcsvJ3qJQ2Zr62rzW7JJWkSqfIrjmiaHUNFu9l0_45OMeNiZJDwLWL75FDrc-xGHsCAQvoyvpt1WNXMNP9nHiRWdojx8CV_3qneQKrN2tr9mXKnOa3uaRZmuPhEXELFR2V4UE2mvSrZZCNdlLhZNd-W5-Zl9LGh_NkzAhw-oIPOR-YVxPaYg',
  bellPepper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4_Ykrloj6TC6P53uSOf5w9DLQeyfnHfZh1b2oD5HXGs2FvueUbN5De2D2z3GzQa2CE3vXlhvqgaLmCqTUDOKxVHjXxRW0kHJrQdpk3CP5yqxcjOvbhFY7CHrnWA75DJ4AFb_4T57HNs_cooXhfcZag0egjp0k7U9o4yQjObgaIIVMj18KLwzjM-FTJYCw2j452lGo5lrm7794wpNxyB1O-n-XmSKaI-dZPRbZWZSfuP_05yjw85yJ',
  sweetCorn: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi2yRh2fXLWiZ_BPhPKOKOiD4s-s0rX0y1rZUk5MMMSv84w_gx4o2Hjjvmftwx_uStyGzQwdT33eo3YUKpDAPMuxPmQfLzITrctZnY8c17z1icya5cAzCUK8LGBgvhV1Ifai4Gkzy6OripOMR80oQYCjVuaMiT0hxWJTGAtcSXI7m9jthCgBtE69ZwSF3F5gt5uHEc9G99WEJrEc2YQ6iI5xgGnw_me6qKKiN-1Zbhpx2eE__6a0BD',
  soyaBeans: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXl4DSsR1R6z30Tc-uQbAfdwzs00FXiVDBDLb5SnkbsUpnjdkKdTKpbUdohmq-i8NcFnra3ULSJpac0xfwYJ5GRZOyIsi5na46jCbRgYgdTFgzGvRN4sAUTBAmDx-VCHc-FmWbkrBIdTpd17njCaB6pMjFFkGb7nPEC9GL87_5bdZIkkLDk_4rxMCtORXWGfSy7on1g-0rjpG2vdFFMX8jfjNzdTW6sbXCczakPIUZAvxqSbba_bC6',
  chickpeas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX2lbg2IgbAGH1XoUqTgsYrr6LsfS3HaJo5g7IVfxKoqNRMXIcp348uoPfHGekzfBsKpg6pjNPcsJYFa2UBwlSKfLOvfB6FS3fNaeO7Uuhx-RMYEfV7CcAb96c45Ms8vZgkk4vmHGBLQA23hryt_yaFb5_VKRCbdhmhrU8K60_MvntDjrKJjyfujRbruJCrpEIsFFSIzz31DdRa2uz72PuohB4idC6fBSsTUCQVjzx76rBzOzS4FfX',
  earlyBlightLeaf: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcljF1a5Z0TxMmdBgaizj_qVt-GoSpRJh1KlNXrLXfAV9C7ByE4EU_u9TnrxpHj-61DuLKYS7A3VdLv9iZCJDptQ_X-2VOsYNpDvWxJCtix0KsbVYZR14mCcLgGSABTUM--afYXtqnCoqCCMPrk_tI8dwNgRXNhyX0GRQtyFIzbYhymxJk3ewUaAeCKc5Li9q6BS6_GbQCXDc0sLT2MMDM1j0gDcrFQARbRavfVRiAsVeb-aCOvbHB',
  serenadeProduct: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB02MNvlMInDK3fqQGsVSmxFI5PrGl9dxnrZIQfLj31B15Lb3rTRflNZsI_yfUmNE79ivr4laayPqq4ai22pR4TPGEZ_66iMJV2gYDa34oHFnBw0f1fxsCbYfIdhY4E1jjGXqY37nPZQW8VTIc7VZ9IrjKtBFqK3ffNvAB0g-OpQ5-sAXblqwe82BZ-HHREdEf2YBmnAkjDJYEhMwVZ5QTuPIW3iB5suuLx7prv5DlDNXRH-n58ZcUZ',
  durumWheat: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzy58rqJQY1PaFh-Zuhr2upL-QzkwJRMizgf9Nc3O-qo6qTLN3wfDUAC2Fz7KFx3oz9UX6932qGOFbbzJvCCJqCxhB1Xb8_8s8kjO4wnXYpkiCX89QiAs7MzPyBIg9Jbcp5jhDnupxAt7XBfxMo5mq5zLbn1zGMIQ3xhzlkvkJV2g3N8-hhx1P7mmOAc7S5VKg160RF1nmtLU19DCxmVWIIjnHhWe-Yi-6KqLwBP58EZQR5EX8v2q',
  romaTomatoes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYeZ7NYUlq3RgL1CmPwcZ8EN89Hvg3kCrYrlwatzO8BTuojcAvC-5_lmGDJSzuBu5fczBvilm55GViFUV6yweqSpIGFEo-l5A-83RYDgE_AblwoV2vb_IhS5zbaRacp9BuD9RffQAqpHb2_QPYqD3ptZx11jt8zkkdbOMnnGBWVGpGSIL2wPP_yY3YjSob99ad50qD7QcwhIQe1BUpnIMIuOhLHPuIu79xTYzRWzp-yMaXNaFJZjqq',
  basmatiRice: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaBu1bNMBzfw8mVL16cuRVoMu98W3qoIgKHOY7Xqkpf5SgZi44dOkP_HB_58fS47khm_twcOF3IX7H0ZzyA7f20GPvA0t3sdhuVlExoHS8kQ8-TYvUAHcQBcFehZC7rmy1-U7oRcxxxemGh9ohj2Xwyg4u5Lwpc8-Pk4LdYAXW0BuVt2OP_MTeL6dq-vFnmUwMOwKUM5PoX4AGyD19198X8aMWHXVfONY_XDHjwtYBBLZcWoB6nJ0_',
  cornListing: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxaB-PoVBnksvuiVJMrV059wcASIT9CTwTdAL5q0FJSyuHjzhMuoRcssIL2x_6r1Qo_ZrDCNCA5owa0UW8PnvKqHeXKBGLXBwxx3SXSac1wu4GlNAhWG3gYracxMv0ap916xg0h5VmlckNhtl-bodl9Dng5d0CT8cCxRm6OIvmBAoUNKqpFCOjNLRPfhcqwqXoe2eTpToTt0vy23v7sKh8jDMAmcBdxu1Sw-ceHc6FZPP4SAaRUNRq',
};

export const INITIAL_COMMODITIES: CommodityRate[] = [
  {
    id: 'comm-1',
    name: 'Premium Durum Wheat',
    location: 'Central Grain Silo',
    lotId: 'DW-402',
    price: 285,
    unit: 'ton',
    changePercent: 5.3,
    changeValue: 14.50,
    isBullish: true,
    insight: 'Bullish demand from domestic flour mills',
    category: 'Cereals',
    imageUrl: APP_ASSETS.durumWheat,
    trend: [265, 268, 271, 275, 281, 285],
    actionLabel: 'Trade',
  },
  {
    id: 'comm-2',
    name: 'Grade-A Roma Tomatoes',
    location: 'Horticulture Yard 4',
    lotId: 'Perishables',
    price: 1.95,
    unit: 'kg',
    changePercent: -7.1,
    changeValue: -0.15,
    isBullish: false,
    insight: 'Oversupply detected. Suggestion: Hold or solar-process.',
    category: 'Vegetables',
    imageUrl: APP_ASSETS.romaTomatoes,
    trend: [2.15, 2.12, 2.08, 2.02, 1.98, 1.95],
    recommendation: 'Cold Storage',
    actionLabel: 'Cold Storage',
  },
  {
    id: 'comm-3',
    name: 'Basmati Paddy Rice',
    location: 'North Agro Mandi',
    lotId: 'Premium Export',
    price: 410,
    unit: 'ton',
    changePercent: 2.0,
    changeValue: 8.00,
    isBullish: true,
    insight: 'Steady export volume with 4 active procurement desks',
    category: 'Cereals',
    imageUrl: APP_ASSETS.basmatiRice,
    trend: [398, 401, 400, 404, 408, 410],
    actionLabel: 'Trade',
  },
];

export const INITIAL_LISTING: MarketplaceListing = {
  id: 'lst-8902',
  title: 'Organic Golden Corn',
  lotCode: '#LST-8902',
  category: 'Cereals',
  quantityTons: 15,
  moisturePercent: 13.4,
  askingPricePerTon: 270,
  status: 'Active',
  imageUrl: APP_ASSETS.cornListing,
  highestBid: {
    buyerName: 'Sunrise Grain Co.',
    buyerRating: 4.9,
    completedDeals: 120,
    bidPricePerTon: 268,
    logisticsNote: 'Buyer arranges farmgate transport',
    bidsCount: 3,
  },
};

export const BUYER_INQUIRIES: BuyerMessage[] = [
  {
    id: 'msg-1',
    buyerName: 'Agrimax Milling',
    company: 'Agrimax Milling Corp',
    avatar: 'AM',
    lastMessage: '“Can you do 20 tons delivery by Friday?”',
    time: '12m ago',
    unread: true,
    lotRef: '#LST-8902',
    history: [
      { sender: 'buyer', text: 'Hello Alex! We noticed your 15T Golden Corn listing. Can you supply up to 20 tons delivery by Friday?', timestamp: '10:14 AM' },
      { sender: 'farmer', text: 'Hi Agrimax! We have 15 tons bagged ready in Silo A, and another 5 tons coming out of moisture curing tomorrow afternoon.', timestamp: '10:19 AM' },
      { sender: 'buyer', text: 'Can you do 20 tons delivery by Friday?', timestamp: '10:22 AM' }
    ]
  },
  {
    id: 'msg-2',
    buyerName: 'Sunrise Grain Co.',
    company: 'Sunrise Ag Services',
    avatar: 'SG',
    lastMessage: '“Bid submitted at $268/ton. Our truck is in Sector B tomorrow.”',
    time: '45m ago',
    unread: false,
    lotRef: '#LST-8902',
    history: [
      { sender: 'buyer', text: 'Bid submitted at $268/ton. Our truck is in Sector B tomorrow.', timestamp: '9:30 AM' }
    ]
  },
  {
    id: 'msg-3',
    buyerName: 'Harvest Agro Exports',
    company: 'Harvest Global Traders',
    avatar: 'HA',
    lastMessage: '“Requesting moisture certificate and lab test report.”',
    time: '2h ago',
    unread: false,
    lotRef: '#LST-8902',
    history: [
      { sender: 'buyer', text: 'Requesting moisture certificate and lab test report.', timestamp: '8:15 AM' }
    ]
  }
];

export const CROP_RECOMMENDATIONS: CropRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Yellow Sweet Corn / Maize',
    scientificName: 'Zea mays',
    variety: 'Hybrid F1 Apex',
    matchScore: 98,
    isTopRecommended: true,
    imageUrl: APP_ASSETS.sweetCorn,
    estYield: '6.8 t/ac',
    yieldComparison: '+18% vs avg',
    maturationDays: '85-95 d',
    cycleType: 'Fast Cycle',
    profitMargin: '+142%',
    roiType: 'High ROI',
    whyItFits: 'Perfects matches your high Nitrogen loamy soil with warm daytime temperatures. Optimal root aeration and moisture drainage confirmed.',
    waterDemand: 'Moderate (450-600mm)',
    keyBenefit: 'Exceptional biomass conversion with peak commercial spot market premium.',
    costBreakdown: {
      seeds: 420,
      fertilizers: 310,
      irrigation: 180,
      labor: 520,
      expectedRevenue: 3460,
      netMargin: 2030,
    },
    cultivationGuide: {
      soilPreparation: 'Deep tillage to 25cm to break hardpan; incorporate 5 tons/ac composted organic matter.',
      sowingPeriod: 'Early Kharif / spring window as soil temperature exceeds 18°C.',
      irrigationMethod: 'Sub-surface drip at 7-day intervals; critical at tasseling and silking.',
      fertilizerSchedule: 'Base NPK 50-30-20, top-dress 30kg N at knee-high stage and 20kg N at pre-tasseling.',
      pestVigilance: 'Scout weekly for Fall Armyworm whorl feeding and stem borer presence.'
    }
  },
  {
    id: 'rec-2',
    title: 'Organic Soya Beans',
    scientificName: 'Glycine max',
    variety: 'Legume family',
    matchScore: 91,
    imageUrl: APP_ASSETS.soyaBeans,
    estYield: '3.2 t/ac',
    yieldComparison: '+12% vs avg',
    maturationDays: '110 days',
    cycleType: 'Standard Cycle',
    profitMargin: '+118%',
    roiType: 'High ROI',
    whyItFits: 'Fixes atmospheric nitrogen through symbiotic Rhizobium nodules, perfectly balancing your soil matrix for rotation cycles.',
    waterDemand: 'Low-Medium (350-450mm)',
    keyBenefit: 'Naturally replenishes field Nitrogen and requires minimal synthetic booster.',
    costBreakdown: {
      seeds: 350,
      fertilizers: 190,
      irrigation: 140,
      labor: 410,
      expectedRevenue: 2380,
      netMargin: 1290,
    },
    cultivationGuide: {
      soilPreparation: 'Level beds with light harrowing; seed inoculation with Rhizobium japonicum.',
      sowingPeriod: 'Mid June with onset of monsoon rains.',
      irrigationMethod: 'Furrow or sprinkler; avoid waterlogging during pod-fill.',
      fertilizerSchedule: 'P & K focused: 0-40-30 kg/ha; minimal starter nitrogen.',
      pestVigilance: 'Check for pod borer and leaf spot during flowering phase.'
    }
  },
  {
    id: 'rec-3',
    title: 'Chickpeas / Pulses',
    scientificName: 'Cicer arietinum',
    variety: 'Desi Variety',
    matchScore: 86,
    imageUrl: APP_ASSETS.chickpeas,
    estYield: '1.8 t/ac',
    yieldComparison: '+8% vs avg',
    maturationDays: '95-105 d',
    cycleType: 'Drought Resilient',
    profitMargin: '+94%',
    roiType: 'Stable ROI',
    whyItFits: 'Thrives in neutral-to-slightly acidic loamy soil with minimal water availability. High wholesale market rate throughout Q3/Q4.',
    waterDemand: 'Low (250-350mm)',
    keyBenefit: 'Low water demand • High market rate with long shelf storage stability.',
    costBreakdown: {
      seeds: 280,
      fertilizers: 150,
      irrigation: 90,
      labor: 380,
      expectedRevenue: 1750,
      netMargin: 850,
    },
    cultivationGuide: {
      soilPreparation: 'Fine seedbed without excessive compaction to allow taproot penetration.',
      sowingPeriod: 'Post-monsoon autumn / early winter.',
      irrigationMethod: 'Only 1-2 life-saving irrigations needed at pre-flowering and pod development.',
      fertilizerSchedule: 'Apply 20-50-20 kg/ha NPK base dressing.',
      pestVigilance: 'Monitor Helicoverpa armigera (gram pod borer) with pheromone traps.'
    }
  }
];

export const PRIMARY_SPECIMEN: SpecimenSample = {
  id: 'spec-tomato-early-blight',
  cropName: 'Tomato Leaf',
  scientificName: 'Solanum lycopersicum',
  diseaseName: 'Early Blight',
  stage: 'Moderate (Stage 2)',
  confidence: 98.4,
  affectedCanopy: 14,
  riskSpread: 'High',
  actionWindow: '48 hrs',
  imageUrl: APP_ASSETS.earlyBlightLeaf,
  surfaceLesionPercent: 14.2,
  sensorCode: 'CV-982',
  macroLens: '4.2mm Macro',
  symptoms: [
    'Concentric dark brown rings (“target spots”) localized on foliage lamina',
    'Chlorotic yellow halo surrounding mature necrotic lesions',
    'Premature senescence and early drop on lower canopy cluster'
  ],
  bioProtocol: [
    {
      title: 'Foliar Bio-Fungicide Spray',
      desc: 'Apply Copper Octanoate or Bacillus subtilis foliar bio-spray every 7 days until spread halts.',
      icon: 'eco'
    },
    {
      title: 'Sanitation Pruning',
      desc: 'Prune infected lower foliage 4 inches above ground level to eliminate fungal soil splashback.',
      icon: 'content_cut'
    }
  ],
  chemProtocol: [
    {
      title: 'Targeted Synthetic Fungicide',
      desc: 'Apply Chlorothalonil or Azoxystrobin (FRAC 11) early morning. Respect 7-day pre-harvest interval.',
      icon: 'science'
    },
    {
      title: 'Rotation Strategy',
      desc: 'Rotate chemical active ingredient with Mancozeb after second application to avoid resistance development.',
      icon: 'pest_control'
    }
  ],
  culturalPractice: 'Switch immediately from overhead sprinkler to precision drip irrigation to keep leaf canopy dry during incubation windows.',
  recommendedProduct: {
    name: 'Serenade ASO Bio-Fungicide',
    size: '1 L • In Stock at Regional Depot',
    price: 34.50,
    stockStatus: 'Ready for delivery',
    imageUrl: APP_ASSETS.serenadeProduct
  }
};

export const INITIAL_EXPENSES: FarmExpense[] = [
  { id: 'exp-1', category: 'Fuel', description: 'Tractor Diesel for Harrowing & Furrows', amount: 145.00, date: 'Oct 17, 2026', parcel: 'Sector A-1' },
  { id: 'exp-2', category: 'Fertilizer & Spray', description: 'Serenade Bio-Fungicide (2x 1L)', amount: 69.00, date: 'Oct 16, 2026', parcel: 'Greenhouse B-4' },
  { id: 'exp-3', category: 'Labor', description: 'Canopy pruning & drip calibration (3 workers)', amount: 210.00, date: 'Oct 15, 2026', parcel: 'Sector B' },
  { id: 'exp-4', category: 'Seeds', description: 'Hybrid F1 Apex Maize Seed Stock', amount: 420.00, date: 'Oct 12, 2026', parcel: 'Sector A-1' },
];
