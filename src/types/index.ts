// TypeScript interfaces for Carbon Calculator

// Assessment flow types
export type AssessmentStep = 
  | 'location'
  | 'food'
  | 'transport' 
  | 'energy'
  | 'digital'
  | 'water'
  | 'waste'
  | 'results';

export interface ProgressState {
  currentStep: AssessmentStep;
  completedSteps: AssessmentStep[];
  totalSteps: number;
}

// Location types
export interface LocationData {
  country: string;
  region: string;
  gridFactor: number; // g CO2/kWh
  isAutoDetected: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Food assessment types
export type DietType = 'omnivorous' | 'vegetarian' | 'vegan' | 'pescatarian';
export type ConsumptionLevel = 'low' | 'medium' | 'high';
export type FoodWasteLevel = 'minimal' | 'average' | 'high';

export interface FoodAssessment {
  dietType: DietType;
  redMeatServingsPerWeek: number;
  whiteMetServingsPerWeek: number;
  fishServingsPerWeek: number;
  dairyConsumption: ConsumptionLevel;
  vegetableConsumption: ConsumptionLevel;
  localFoodPercentage: number;
  foodWasteLevel: FoodWasteLevel;
  organicFoodPercentage: number;
}

// Transport assessment types
export type VehicleType = 
  | 'no_car'
  | 'small_gasoline'
  | 'medium_gasoline'
  | 'large_gasoline'
  | 'hybrid'
  | 'electric'
  | 'diesel';

export type TransportMode = 
  | 'walking'
  | 'cycling'
  | 'escooter'
  | 'bus'
  | 'train'
  | 'subway'
  | 'car'
  | 'motorcycle'
  | 'taxi';

export type FlightFrequency = 'never' | 'rarely' | 'occasionally' | 'frequently';

export interface TransportAssessment {
  primaryTransportMode: TransportMode;
  vehicleType?: VehicleType;
  weeklyDrivingDistance: number;
  publicTransportHoursPerWeek: number;
  walkingCyclingHoursPerWeek: number;
  domesticFlightsPerYear: number;
  shortHaulFlightsPerYear: number;
  longHaulFlightsPerYear: number;
  businessClassPercentage: number;
  carSharingUsage: boolean;
}

// Energy assessment types
export type HousingType = 'apartment' | 'townhouse' | 'detached_house';
export type HousingSize = 'small' | 'medium' | 'large';
export type HeatingSource = 'natural_gas' | 'electricity' | 'oil' | 'heat_pump' | 'wood' | 'district';
export type EnergyEfficiency = 'poor' | 'average' | 'good' | 'excellent';

export interface EnergyAssessment {
  housingType: HousingType;
  housingSize: HousingSize;
  numberOfOccupants: number;
  heatingSource: HeatingSource;
  coolingType: 'none' | 'fan' | 'ac';
  monthlyElectricityBill: number;
  renewableEnergyPercentage: number;
  energyEfficiencyRating: EnergyEfficiency;
  solarPanels: boolean;
  smartThermostat: boolean;
}

// Digital assessment types
export type DeviceReplacement = 'yearly' | 'every_2_years' | 'every_3_years' | 'every_4_plus_years';
export type StreamingQuality = 'sd' | 'hd' | '4k';

export interface DigitalAssessment {
  streamingHoursPerDay: number;
  streamingQuality: StreamingQuality;
  videoCallHoursPerDay: number;
  socialMediaHoursPerDay: number;
  gamingHoursPerDay: number;
  emailsPerDay: number;
  cloudStorageGB: number;
  phoneReplacementFrequency: DeviceReplacement;
  laptopReplacementFrequency: DeviceReplacement;
  onlineShoppingFrequency: 'rarely' | 'monthly' | 'weekly' | 'daily';
}

// Water assessment types
export type WaterHeatingSource = 'gas' | 'electric' | 'solar' | 'heat_pump';

export interface WaterAssessment {
  showerMinutesPerDay: number;
  showerTemperature: 'cold' | 'warm' | 'hot';
  bathsPerWeek: number;
  dishwasherLoadsPerWeek: number;
  washingMachineLoadsPerWeek: number;
  waterHeatingSource: WaterHeatingSource;
  lowFlowFixtures: boolean;
}

// Waste assessment types
export interface WasteAssessment {
  recyclingRate: number; // percentage
  compostingRate: number; // percentage
  singleUsePlasticUsage: ConsumptionLevel;
  clothingPurchasesPerMonth: number;
  fastFashionPercentage: number;
  repairVsReplaceHabit: 'always_repair' | 'sometimes_repair' | 'usually_replace';
}

// Results types
export interface EmissionBreakdown {
  food: number;
  transport: number;
  energy: number;
  digital: number;
  water: number;
  waste: number;
  total: number;
}

export interface UncertaintyRange {
  low: number;
  high: number;
  confidence: number; // percentage
}

export interface CarbonFootprintResult {
  totalEmissions: number; // tCO2e per year
  emissionBreakdown: EmissionBreakdown;
  uncertaintyRange: UncertaintyRange;
  comparison: {
    globalAverage: number;
    countryAverage: number;
    climateTarget2030: number;
    climateTarget2050: number;
  };
  climateCompatibility: 'excellent' | 'good' | 'medium' | 'high_impact';
}

// Behavior modification types
export interface BehaviorModification {
  id: string;
  category: keyof EmissionBreakdown;
  description: string;
  currentValue: number;
  modifiedValue: number;
  emissionReduction: number; // tCO2e saved per year
  difficulty: 'easy' | 'medium' | 'hard';
  cost: 'savings' | 'neutral' | 'low_cost' | 'high_cost';
}

export interface ScenarioComparison {
  baseline: CarbonFootprintResult;
  modified: CarbonFootprintResult;
  modifications: BehaviorModification[];
  totalReduction: number;
  percentageReduction: number;
}

// Calculator state types
export interface CalculatorState {
  progress: ProgressState;
  location: LocationData | null;
  assessments: {
    food: Partial<FoodAssessment>;
    transport: Partial<TransportAssessment>;
    energy: Partial<EnergyAssessment>;
    digital: Partial<DigitalAssessment>;
    water: Partial<WaterAssessment>;
    waste: Partial<WasteAssessment>;
  };
  results: CarbonFootprintResult | null;
  scenarios: ScenarioComparison[];
  isCalculating: boolean;
  errors: string[];
}

// UI Component types
export interface QuestionOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single_choice' | 'multiple_choice' | 'slider' | 'number_input' | 'text_input';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  required: boolean;
  validation?: (value: any) => boolean | string;
}

export interface PageConfig {
  step: AssessmentStep;
  title: string;
  description: string;
  questions: Question[];
  estimatedTime: number; // minutes
}

// Calculation types
export interface CalculationInput {
  category: string;
  subcategory: string;
  value: number;
  unit: string;
  regionAdjustment?: number;
}

export interface CalculationResult {
  emissions: number; // kg CO2e
  uncertainty: UncertaintyRange;
  factors: {
    emissionFactor: number;
    regionalAdjustment: number;
    realWorldAdjustment: number;
  };
}

// Social sharing types
export interface ShareableResult {
  totalEmissions: number;
  climateCompatibility: string;
  topReduction: BehaviorModification;
  chartData: string; // base64 encoded image
  message: string;
}

// API types for location detection
export interface LocationAPIResponse {
  country: string;
  country_code: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
}

// Validation types
export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Constants
export const ASSESSMENT_STEPS: AssessmentStep[] = [
  'location',
  'food', 
  'transport',
  'energy',
  'digital',
  'water', 
  'waste',
  'results'
];

export const CLIMATE_THRESHOLDS = {
  excellent: 2.0, // tCO2e per year
  good: 2.9, // 2030 target
  medium: 6.3, // global average
  high_impact: Infinity
} as const;

export const UNCERTAINTY_TARGETS = {
  excellent: 15, // ±15%
  good: 25, // ±25%
  acceptable: 35, // ±35%
  poor: 50 // ±50%
} as const;