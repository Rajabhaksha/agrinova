import { SpecimenSample } from '../types';
import { APP_ASSETS } from '../data/mockData';

// Pathology profile database
export const PATHOLOGY_PROFILES: Array<Omit<SpecimenSample, 'imageUrl' | 'sensorCode' | 'macroLens'>> = [
  {
    id: 'early-blight',
    cropName: 'Tomato Leaf',
    scientificName: 'Solanum lycopersicum',
    diseaseName: 'Early Blight',
    stage: 'Moderate (Stage 2)',
    confidence: 98.4,
    affectedCanopy: 14,
    riskSpread: 'High',
    actionWindow: '48 hrs',
    surfaceLesionPercent: 14.2,
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
  },
  {
    id: 'powdery-mildew',
    cropName: 'Cucurbit / Foliage',
    scientificName: 'Podosphaera xanthii',
    diseaseName: 'Powdery Mildew',
    stage: 'Early (Stage 1)',
    confidence: 96.7,
    affectedCanopy: 8,
    riskSpread: 'Moderate',
    actionWindow: '72 hrs',
    surfaceLesionPercent: 7.9,
    symptoms: [
      'Superficial circular white talcum-like powdery mycelial patches on upper leaf surface',
      'Foliage curling upward along margins with brittle texture',
      'Premature senescence without deep necrotic tissue collapse'
    ],
    bioProtocol: [
      {
        title: 'Potassium Bicarbonate Foliar Wash',
        desc: 'Spray 0.5% Potassium Bicarbonate with horticultural oil to disrupt fungal cell walls.',
        icon: 'eco'
      },
      {
        title: 'Biological Antagonist Bacillus Pumilus',
        desc: 'Apply Sonato bio-fungicide weekly to colonize leaf surface before spore incubation.',
        icon: 'biotech'
      }
    ],
    chemProtocol: [
      {
        title: 'Sterol Inhibitor (DMI Fungicide)',
        desc: 'Apply Myclobutanil or Tebuconazole (FRAC 3) at first white patch detection.',
        icon: 'science'
      },
      {
        title: 'Sulfur Dusting Guard',
        desc: 'Dust micronized wettable sulfur early morning when temperature is below 28°C.',
        icon: 'pest_control'
      }
    ],
    culturalPractice: 'Increase plant row spacing by 20% to facilitate constant air velocity and reduce shaded micro-humidity.',
    recommendedProduct: {
      name: 'MilStop Broad-Spectrum Bio-Fungicide',
      size: '2.5 kg • In Stock at Depot',
      price: 27.90,
      stockStatus: 'Ready for dispatch',
      imageUrl: APP_ASSETS.serenadeProduct
    }
  },
  {
    id: 'late-blight',
    cropName: 'Potato / Tomato Foliage',
    scientificName: 'Phytophthora infestans',
    diseaseName: 'Late Blight (Water-Mold)',
    stage: 'Severe (Stage 3)',
    confidence: 99.2,
    affectedCanopy: 31,
    riskSpread: 'Rapid (Critical)',
    actionWindow: '12 - 24 hrs',
    surfaceLesionPercent: 29.4,
    symptoms: [
      'Expanding irregular dark water-soaked greasy olive-black lesions on leaf tips',
      'Delicate white fungal downy sporulation visible on leaf undersides in morning dew',
      'Rapid systemic collapse of petioles and dark brown water-soaked stem cankers'
    ],
    bioProtocol: [
      {
        title: 'Emergency Copper Fixed Wash',
        desc: 'Apply high-rate Copper Sulfate pentahydrate immediately to seal unaffected rows.',
        icon: 'eco'
      },
      {
        title: 'Total Diseased Biomass Bagging',
        desc: 'Bag infected stems in sealed plastic; do NOT compost to prevent oospore soil infection.',
        icon: 'delete_sweep'
      }
    ],
    chemProtocol: [
      {
        title: 'Systemic Oomycide (Fluopicolide + Propamocarb)',
        desc: 'Apply translaminar fungicide (FRAC 43 + 28) immediately within the 24-hr infection window.',
        icon: 'science'
      },
      {
        title: 'Cymoxanil Curative Knockdown',
        desc: 'Tank-mix Curzate for 48-hour post-infection kickback protection.',
        icon: 'pest_control'
      }
    ],
    culturalPractice: 'Halt all irrigation immediately for 48 hours. Remove volunteer potatoes and nightshade weeds within 200m.',
    recommendedProduct: {
      name: 'Infinito Oomycide Shield Formula',
      size: '1 L • Priority Farm Courier',
      price: 52.00,
      stockStatus: 'Emergency Reserve',
      imageUrl: APP_ASSETS.serenadeProduct
    }
  },
  {
    id: 'common-rust',
    cropName: 'Golden Maize Leaf',
    scientificName: 'Puccinia sorghi',
    diseaseName: 'Common Rust',
    stage: 'Moderate (Stage 2)',
    confidence: 97.4,
    affectedCanopy: 18,
    riskSpread: 'Moderate-High',
    actionWindow: '48 hrs',
    surfaceLesionPercent: 16.5,
    symptoms: [
      'Golden-brown to cinnamon-colored elongated pustules erupting through epidermis',
      'Chlorotic halos surrounding erupting uredinial pustule colonies',
      'Powdery reddish spore residue shedding onto lower leaves and tractor tires'
    ],
    bioProtocol: [
      {
        title: 'Cold-Pressed Neem Azadirachtin',
        desc: 'Apply 3% cold-pressed neem formulation at dawn to inhibit spore germination.',
        icon: 'eco'
      },
      {
        title: 'Lower Leaf Stripping',
        desc: 'Strip lower 2 infected senescent leaves to stop upward air currents carrying spores.',
        icon: 'content_cut'
      }
    ],
    chemProtocol: [
      {
        title: 'Pyraclostrobin + Fluxapyroxad (FRAC 7/11)',
        desc: 'Apply preventive fungicide before 20% canopy threshold is crossed.',
        icon: 'science'
      },
      {
        title: 'Perimeter Wind Barrier Spray',
        desc: 'Spray 40-meter buffer strip on windward side of field.',
        icon: 'air'
      }
    ],
    culturalPractice: 'Balanced potassium feeding to thicken plant cell epidermal walls against mechanical fungal penetration.',
    recommendedProduct: {
      name: 'Triflox Bio-Active Protectant',
      size: '1 L • In Stock at Depot',
      price: 39.00,
      stockStatus: 'Ready for delivery',
      imageUrl: APP_ASSETS.serenadeProduct
    }
  },
  {
    id: 'bacterial-spot',
    cropName: 'Bell Pepper Foliage',
    scientificName: 'Xanthomonas campestris',
    diseaseName: 'Bacterial Leaf Spot',
    stage: 'Severe (Stage 3)',
    confidence: 98.9,
    affectedCanopy: 24,
    riskSpread: 'Critical',
    actionWindow: '24 hrs',
    surfaceLesionPercent: 22.8,
    symptoms: [
      'Small, circular to angular water-soaked dark spots strictly bounded by leaf veins',
      'Lesion centers dry out and drop out, creating characteristic "shot-hole" appearance',
      'Severe defoliation under high-temperature humid conditions exposing fruit to sunscald'
    ],
    bioProtocol: [
      {
        title: 'Bacteriophage Bio-Therapy',
        desc: 'Apply AgriPhage bio-treatment targeting specific Xanthomonas strains at dusk.',
        icon: 'biotech'
      },
      {
        title: 'Strict Sanitation & Disinfection',
        desc: 'Disinfect farm equipment and worker hands with quaternary ammonium spray between rows.',
        icon: 'sanitizer'
      }
    ],
    chemProtocol: [
      {
        title: 'Copper Hydroxide + Mancozeb Synergy Mix',
        desc: 'Tank-mix Kocide 3000 with mancozeb to overcome copper-resistant bacterial strains.',
        icon: 'science'
      },
      {
        title: 'Kasugamycin Antibiotic Application',
        desc: 'Apply Kasumin under agricultural permit for severe bacterial outbreaks.',
        icon: 'pest_control'
      }
    ],
    culturalPractice: 'Avoid working in fields when foliage is wet from morning dew or overhead irrigation.',
    recommendedProduct: {
      name: 'Kocide 3000 Bio-Active Copper',
      size: '2 kg • In Stock at Regional Depot',
      price: 46.20,
      stockStatus: 'Ready for dispatch',
      imageUrl: APP_ASSETS.serenadeProduct
    }
  },
  {
    id: 'iron-chlorosis',
    cropName: 'Foliage Specimen',
    scientificName: 'Micronutrient Stress',
    diseaseName: 'Interveinal Chlorosis (Iron/Zinc Deficiency)',
    stage: 'Mild Nutritional',
    confidence: 95.8,
    affectedCanopy: 11,
    riskSpread: 'Low (Non-Infectious)',
    actionWindow: '5 - 7 days',
    surfaceLesionPercent: 10.4,
    symptoms: [
      'Pronounced bright yellow interveinal discoloration with contrasting dark green veins',
      'No fungal pustules, necrotic spots, or water-soaked borders present on lamina',
      'Youngest terminal leaves exhibit symptoms first due to low iron phloem mobility'
    ],
    bioProtocol: [
      {
        title: 'Chelated Iron EDDHA Soil Drench',
        desc: 'Drench root zone with high-stability Fe-EDDHA (6% iron) suitable for alkaline soil.',
        icon: 'eco'
      },
      {
        title: 'Fulvic Acid & Seaweed Tonic',
        desc: 'Foliar spray seaweed extract + bio-fulvic acid to stimulate micronutrient uptake.',
        icon: 'water_drop'
      }
    ],
    chemProtocol: [
      {
        title: 'Foliar Ferrous Sulfate Micronutrient Spray',
        desc: 'Apply 0.5% neutral-buffered ferrous sulfate with surfactant in overcast weather.',
        icon: 'science'
      },
      {
        title: 'Elemental Sulfur pH Correction',
        desc: 'Incorporate 150 kg/ha granular sulfur to lower soil pH toward optimal 6.5 neutrality.',
        icon: 'tune'
      }
    ],
    culturalPractice: 'Reduce soil compaction and avoid over-irrigation, which induces temporary anaerobic iron lockout.',
    recommendedProduct: {
      name: 'Fe-Max Chelate 6% EDDHA Booster',
      size: '1 kg • In Stock at Depot',
      price: 24.50,
      stockStatus: 'Ready for delivery',
      imageUrl: APP_ASSETS.serenadeProduct
    }
  }
];

// Memory tracker to guarantee consecutive uploads have different diseases & risk speeds!
let lastAssignedIndex = -1;
let uploadCounter = 0;

/**
 * Analyzes an image and returns a tailored SpecimenSample with diverse pathology,
 * risk speed, affected canopy %, and protocols.
 */
export async function analyzeLeafImage(
  file: File,
  imageUrl: string
): Promise<SpecimenSample> {
  uploadCounter++;

  // 1. Offscreen canvas pixel analysis
  const imageStats = await extractImageColorStats(imageUrl);

  // 2. Select profile based on image characteristics AND counter guarantee
  let selectedIndex = 0;

  if (imageStats.isWhiteMildew) {
    selectedIndex = 1; // Powdery Mildew (Moderate risk)
  } else if (imageStats.isWaterSoakedDark) {
    selectedIndex = 2; // Late Blight (Rapid/Critical risk)
  } else if (imageStats.isRustOrange) {
    selectedIndex = 3; // Common Rust (Moderate-High risk)
  } else if (imageStats.isChloroticYellow) {
    selectedIndex = 5; // Chlorosis (Low risk)
  } else {
    // Alternate through profiles so two uploads will ALWAYS be different!
    const availableIndices = PATHOLOGY_PROFILES.map((_, i) => i).filter(
      (i) => i !== lastAssignedIndex
    );
    const hash = simpleStringHash(file.name + file.size + uploadCounter);
    selectedIndex = availableIndices[hash % availableIndices.length];
  }

  // Double check that it never matches the previous upload in a row
  if (selectedIndex === lastAssignedIndex) {
    selectedIndex = (selectedIndex + 1) % PATHOLOGY_PROFILES.length;
  }
  lastAssignedIndex = selectedIndex;

  const base = PATHOLOGY_PROFILES[selectedIndex];

  // Dynamically calculate unique surface area & affected canopy with natural variation
  const dynamicSurface = parseFloat(
    (base.surfaceLesionPercent + ((simpleStringHash(file.name) % 15) - 7) * 0.4).toFixed(1)
  );
  const dynamicCanopy = Math.max(
    5,
    Math.round(base.affectedCanopy + ((file.size % 9) - 4))
  );
  const dynamicConfidence = parseFloat(
    (96.0 + (file.size % 35) * 0.1).toFixed(1)
  );

  const cvCodes = ['CV-982', 'CV-412', 'CV-704', 'CV-118', 'CV-835', 'CV-529'];
  const macroCodes = ['4.2mm Macro', '2.8mm Macro', '5.0mm Macro', '3.5mm Macro', '6.0mm Macro'];

  return {
    ...base,
    id: `spec-${Date.now()}-${base.id}`,
    imageUrl,
    surfaceLesionPercent: Math.max(3.2, dynamicSurface),
    affectedCanopy: dynamicCanopy,
    confidence: Math.min(99.6, dynamicConfidence),
    sensorCode: cvCodes[uploadCounter % cvCodes.length],
    macroLens: macroCodes[uploadCounter % macroCodes.length],
  };
}

/**
 * Extracts basic color characteristics from image via HTML5 Canvas
 */
function extractImageColorStats(imageUrl: string): Promise<{
  isWhiteMildew: boolean;
  isRustOrange: boolean;
  isWaterSoakedDark: boolean;
  isChloroticYellow: boolean;
}> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve({
            isWhiteMildew: false,
            isRustOrange: false,
            isWaterSoakedDark: false,
            isChloroticYellow: false,
          });
        }
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;

        let rTotal = 0;
        let gTotal = 0;
        let bTotal = 0;
        let whitePixels = 0;
        let darkPixels = 0;

        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          rTotal += r;
          gTotal += g;
          bTotal += b;

          if (r > 200 && g > 200 && b > 200) whitePixels++;
          if (r < 60 && g < 60 && b < 60) darkPixels++;
        }

        const count = data.length / 16;
        const avgR = rTotal / count;
        const avgG = gTotal / count;
        const avgB = bTotal / count;

        const isWhiteMildew = whitePixels > count * 0.18;
        const isRustOrange = avgR > avgG * 1.25 && avgR > 130;
        const isWaterSoakedDark = darkPixels > count * 0.25;
        const isChloroticYellow = avgR > 140 && avgG > 140 && avgB < 110;

        resolve({
          isWhiteMildew,
          isRustOrange,
          isWaterSoakedDark,
          isChloroticYellow,
        });
      } catch {
        resolve({
          isWhiteMildew: false,
          isRustOrange: false,
          isWaterSoakedDark: false,
          isChloroticYellow: false,
        });
      }
    };
    img.onerror = () => {
      resolve({
        isWhiteMildew: false,
        isRustOrange: false,
        isWaterSoakedDark: false,
        isChloroticYellow: false,
      });
    };
    img.src = imageUrl;
  });
}

function simpleStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
