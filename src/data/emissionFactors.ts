// Emission factors database based on scientific documentation (2020-2025)
// Sources: compass_artifact, co2_emissions_grid, scientific_emissions_table

export interface EmissionFactor {
  value: number;
  unit: string;
  lowEstimate: number;
  highEstimate: number;
  uncertainty: number; // percentage
  notes?: string;
}

export interface RegionalFactor {
  region: string;
  country: string;
  factor: number;
  trend: string;
}

// Electricity Grid Carbon Intensity (g CO2/kWh)
export const electricityGridFactors: RegionalFactor[] = [
  { region: 'Nordic', country: 'Iceland', factor: 0, trend: 'stable' },
  { region: 'Nordic', country: 'Norway', factor: 20, trend: 'stable' },
  { region: 'Nordic', country: 'Sweden', factor: 41, trend: 'stable' },
  { region: 'Europe', country: 'France', factor: 79, trend: 'stable' },
  { region: 'Europe', country: 'Denmark', factor: 115, trend: 'declining' },
  { region: 'Europe', country: 'UK', factor: 193, trend: 'declining' },
  { region: 'Europe', country: 'EU Average', factor: 275, trend: 'declining' },
  { region: 'North America', country: 'California', factor: 290, trend: 'declining' },
  { region: 'North America', country: 'US Average', factor: 386, trend: 'declining' },
  { region: 'Europe', country: 'Germany', factor: 420, trend: 'declining' },
  { region: 'Asia', country: 'Japan', factor: 462, trend: 'stable' },
  { region: 'Europe', country: 'Russia', factor: 322, trend: 'stable' },
  { region: 'Asia', country: 'China', factor: 554, trend: 'declining' },
  { region: 'Asia', country: 'India', factor: 632, trend: 'stable' },
  { region: 'Europe', country: 'Poland', factor: 662, trend: 'declining' },
  { region: 'Africa', country: 'South Africa', factor: 783, trend: 'stable' },
];

// Transportation Emission Factors (g CO2e per km)
export const transportationFactors = {
  walking: { value: 5, unit: 'g CO2e/km', lowEstimate: 3, highEstimate: 8, uncertainty: 20 },
  cycling: { value: 21, unit: 'g CO2e/km', lowEstimate: 15, highEstimate: 25, uncertainty: 15 },
  escooter: { value: 65, unit: 'g CO2e/km', lowEstimate: 45, highEstimate: 85, uncertainty: 25 },
  bus_urban: { value: 95, unit: 'g CO2e/km', lowEstimate: 80, highEstimate: 110, uncertainty: 20 },
  bus_intercity: { value: 33, unit: 'g CO2e/km', lowEstimate: 25, highEstimate: 40, uncertainty: 20 },
  subway: { value: 45, unit: 'g CO2e/km', lowEstimate: 30, highEstimate: 65, uncertainty: 30 },
  train_electric: { value: 35, unit: 'g CO2e/km', lowEstimate: 27, highEstimate: 49, uncertainty: 25 },
  train_diesel: { value: 90, unit: 'g CO2e/km', lowEstimate: 85, highEstimate: 95, uncertainty: 10 },
  motorcycle: { value: 175, unit: 'g CO2e/km', lowEstimate: 110, highEstimate: 240, uncertainty: 35 },
  car_small_gasoline: { value: 117, unit: 'g CO2e/km', lowEstimate: 105, highEstimate: 130, uncertainty: 30 },
  car_medium_gasoline: { value: 145, unit: 'g CO2e/km', lowEstimate: 130, highEstimate: 160, uncertainty: 30 },
  car_large_gasoline: { value: 192, unit: 'g CO2e/km', lowEstimate: 170, highEstimate: 210, uncertainty: 30 },
  car_hybrid: { value: 88, unit: 'g CO2e/km', lowEstimate: 73, highEstimate: 103, uncertainty: 25 },
  car_electric_clean: { value: 15, unit: 'g CO2e/km', lowEstimate: 7, highEstimate: 25, uncertainty: 25 },
  car_electric_mixed: { value: 65, unit: 'g CO2e/km', lowEstimate: 45, highEstimate: 80, uncertainty: 25 },
  car_electric_dirty: { value: 125, unit: 'g CO2e/km', lowEstimate: 100, highEstimate: 150, uncertainty: 25 },
  flight_domestic: { value: 153, unit: 'g CO2e/km', lowEstimate: 140, highEstimate: 170, uncertainty: 40 },
  flight_short_haul: { value: 195, unit: 'g CO2e/km', lowEstimate: 170, highEstimate: 220, uncertainty: 40 },
  flight_long_haul_economy: { value: 100, unit: 'g CO2e/km', lowEstimate: 80, highEstimate: 120, uncertainty: 40 },
  flight_business: { value: 200, unit: 'g CO2e/km', lowEstimate: 160, highEstimate: 240, uncertainty: 40 },
  flight_first_class: { value: 525, unit: 'g CO2e/km', lowEstimate: 400, highEstimate: 650, uncertainty: 40 },
};

// Food Emission Factors (kg CO2e per kg food)
export const foodFactors = {
  beef: { value: 60, unit: 'kg CO2e/kg', lowEstimate: 50, highEstimate: 100, uncertainty: 50 },
  lamb: { value: 24, unit: 'kg CO2e/kg', lowEstimate: 20, highEstimate: 35, uncertainty: 45 },
  cheese_hard: { value: 21, unit: 'kg CO2e/kg', lowEstimate: 18, highEstimate: 25, uncertainty: 20 },
  shrimp_farmed: { value: 18, unit: 'kg CO2e/kg', lowEstimate: 15, highEstimate: 25, uncertainty: 30 },
  pork: { value: 6.5, unit: 'kg CO2e/kg', lowEstimate: 5, highEstimate: 8, uncertainty: 35 },
  chicken: { value: 6, unit: 'kg CO2e/kg', lowEstimate: 5, highEstimate: 7, uncertainty: 25 },
  eggs: { value: 4.2, unit: 'kg CO2e/kg', lowEstimate: 3.5, highEstimate: 5, uncertainty: 25 },
  rice: { value: 4, unit: 'kg CO2e/kg', lowEstimate: 3.5, highEstimate: 4.5, uncertainty: 15 },
  milk: { value: 3.2, unit: 'kg CO2e/kg', lowEstimate: 2.8, highEstimate: 3.5, uncertainty: 30 },
  fish_small: { value: 1.4, unit: 'kg CO2e/kg', lowEstimate: 0.8, highEstimate: 2, uncertainty: 40 },
  legumes: { value: 1.5, unit: 'kg CO2e/kg', lowEstimate: 1, highEstimate: 2.5, uncertainty: 40 },
  wheat_bread: { value: 1.4, unit: 'kg CO2e/kg', lowEstimate: 1.2, highEstimate: 1.8, uncertainty: 20 },
  vegetables_root: { value: 0.4, unit: 'kg CO2e/kg', lowEstimate: 0.3, highEstimate: 0.8, uncertainty: 60 },
  vegetables_leafy: { value: 1, unit: 'kg CO2e/kg', lowEstimate: 0.5, highEstimate: 1.5, uncertainty: 60 },
  fruits_citrus: { value: 0.5, unit: 'kg CO2e/kg', lowEstimate: 0.3, highEstimate: 0.7, uncertainty: 40 },
  fruits_berries: { value: 1.1, unit: 'kg CO2e/kg', lowEstimate: 0.8, highEstimate: 2, uncertainty: 50 },
};

// Energy Source Factors
export const energyFactors = {
  electricity: { value: 480, unit: 'g CO2/kWh', lowEstimate: 50, highEstimate: 783, uncertainty: 50 },
  natural_gas: { value: 53.06, unit: 'kg CO2/GJ', lowEstimate: 50, highEstimate: 56, uncertainty: 5 },
  heating_oil: { value: 74.1, unit: 'kg CO2/GJ', lowEstimate: 70, highEstimate: 78, uncertainty: 5 },
  propane: { value: 5.62, unit: 'kg CO2/gallon', lowEstimate: 5.3, highEstimate: 5.9, uncertainty: 5 },
  wood_sustainable: { value: 0.02, unit: 'kg CO2/kg', lowEstimate: 0.01, highEstimate: 0.03, uncertainty: 50 },
  wood_nonsustainable: { value: 1.8, unit: 'kg CO2/kg', lowEstimate: 1.5, highEstimate: 2.1, uncertainty: 20 },
};

// Housing Energy Consumption (kWh per day)
export const housingConsumption = {
  apartment_small: { value: 20, unit: 'kWh/day', lowEstimate: 15, highEstimate: 25, uncertainty: 25 },
  apartment_medium: { value: 30, unit: 'kWh/day', lowEstimate: 25, highEstimate: 35, uncertainty: 25 },
  apartment_large: { value: 42.5, unit: 'kWh/day', lowEstimate: 35, highEstimate: 50, uncertainty: 25 },
  townhouse_small: { value: 30, unit: 'kWh/day', lowEstimate: 25, highEstimate: 35, uncertainty: 25 },
  townhouse_medium: { value: 42.5, unit: 'kWh/day', lowEstimate: 35, highEstimate: 50, uncertainty: 25 },
  townhouse_large: { value: 60, unit: 'kWh/day', lowEstimate: 50, highEstimate: 70, uncertainty: 25 },
  house_small: { value: 42.5, unit: 'kWh/day', lowEstimate: 35, highEstimate: 50, uncertainty: 25 },
  house_medium: { value: 62.5, unit: 'kWh/day', lowEstimate: 50, highEstimate: 75, uncertainty: 25 },
  house_large: { value: 97.5, unit: 'kWh/day', lowEstimate: 75, highEstimate: 120, uncertainty: 25 },
};

// Digital Activities (kg CO2e per unit)
export const digitalFactors = {
  streaming_hd: { value: 0.036, unit: 'kg CO2e/hour', lowEstimate: 0.025, highEstimate: 0.050, uncertainty: 40 },
  streaming_4k: { value: 0.075, unit: 'kg CO2e/hour', lowEstimate: 0.050, highEstimate: 0.100, uncertainty: 40 },
  video_calls: { value: 0.015, unit: 'kg CO2e/hour', lowEstimate: 0.010, highEstimate: 0.025, uncertainty: 40 },
  social_media: { value: 0.003, unit: 'kg CO2e/minute', lowEstimate: 0.002, highEstimate: 0.004, uncertainty: 40 },
  web_browsing: { value: 0.005, unit: 'kg CO2e/hour', lowEstimate: 0.003, highEstimate: 0.008, uncertainty: 40 },
  email_text: { value: 0.0004, unit: 'kg CO2e/email', lowEstimate: 0.0003, highEstimate: 0.0005, uncertainty: 30 },
  email_attachments: { value: 0.03, unit: 'kg CO2e/email', lowEstimate: 0.01, highEstimate: 0.05, uncertainty: 60 },
  cloud_storage: { value: 0.01, unit: 'kg CO2e/GB/month', lowEstimate: 0.005, highEstimate: 0.015, uncertainty: 50 },
  online_gaming: { value: 0.025, unit: 'kg CO2e/hour', lowEstimate: 0.015, highEstimate: 0.040, uncertainty: 40 },
};

// Device Manufacturing (kg CO2e per device)
export const deviceFactors = {
  smartphone: { value: 75, unit: 'kg CO2e/device', lowEstimate: 55, highEstimate: 95, uncertainty: 30 },
  laptop: { value: 300, unit: 'kg CO2e/device', lowEstimate: 200, highEstimate: 400, uncertainty: 25 },
  desktop: { value: 400, unit: 'kg CO2e/device', lowEstimate: 300, highEstimate: 500, uncertainty: 25 },
  tablet: { value: 125, unit: 'kg CO2e/device', lowEstimate: 100, highEstimate: 150, uncertainty: 20 },
  tv_55: { value: 500, unit: 'kg CO2e/device', lowEstimate: 400, highEstimate: 600, uncertainty: 20 },
};

// Water Usage (kg CO2e per unit)
export const waterFactors = {
  shower_cold: { value: 0.001, unit: 'kg CO2e/minute', lowEstimate: 0.0005, highEstimate: 0.0015, uncertainty: 50 },
  shower_hot_gas: { value: 0.115, unit: 'kg CO2e/minute', lowEstimate: 0.10, highEstimate: 0.13, uncertainty: 20 },
  shower_hot_electric: { value: 0.35, unit: 'kg CO2e/minute', lowEstimate: 0.2, highEstimate: 0.5, uncertainty: 50 },
  bath_cold: { value: 0.005, unit: 'kg CO2e/bath', lowEstimate: 0.003, highEstimate: 0.007, uncertainty: 40 },
  bath_hot_gas: { value: 1.4, unit: 'kg CO2e/bath', lowEstimate: 1.2, highEstimate: 1.6, uncertainty: 20 },
  bath_hot_electric: { value: 4, unit: 'kg CO2e/bath', lowEstimate: 2.5, highEstimate: 6, uncertainty: 50 },
  dishwasher: { value: 1.8, unit: 'kg CO2e/load', lowEstimate: 1.5, highEstimate: 3.5, uncertainty: 40 },
  washing_machine: { value: 1.8, unit: 'kg CO2e/load', lowEstimate: 1.2, highEstimate: 2.8, uncertainty: 40 },
};

// Waste Factors (kg CO2e per kg waste)
export const wasteFactors = {
  landfill_mixed: { value: 0.781, unit: 'kg CO2e/kg', lowEstimate: 0.7, highEstimate: 0.9, uncertainty: 15 },
  landfill_paper: { value: 0.9, unit: 'kg CO2e/kg', lowEstimate: 0.8, highEstimate: 1.0, uncertainty: 15 },
  landfill_plastic: { value: 1.2, unit: 'kg CO2e/kg', lowEstimate: 1.0, highEstimate: 1.4, uncertainty: 20 },
  landfill_organic: { value: 1.5, unit: 'kg CO2e/kg', lowEstimate: 1.3, highEstimate: 1.7, uncertainty: 20 },
  recycling_paper: { value: -0.2, unit: 'kg CO2e/kg', lowEstimate: -0.3, highEstimate: -0.1, uncertainty: 50 },
  recycling_plastic: { value: -0.3, unit: 'kg CO2e/kg', lowEstimate: -0.4, highEstimate: -0.2, uncertainty: 40 },
  recycling_glass: { value: -0.1, unit: 'kg CO2e/kg', lowEstimate: -0.15, highEstimate: -0.05, uncertainty: 50 },
  recycling_metals: { value: -2.0, unit: 'kg CO2e/kg', lowEstimate: -2.5, highEstimate: -1.5, uncertainty: 25 },
  composting: { value: 0.035, unit: 'kg CO2e/kg', lowEstimate: 0.02, highEstimate: 0.05, uncertainty: 40 },
};

// Annual Dietary Footprints (tCO2e per person per year)
export const dietaryPatterns = {
  high_meat_omnivorous: { value: 3.3, unit: 'tCO2e/year', lowEstimate: 2.5, highEstimate: 4.0, uncertainty: 25 },
  average_omnivorous: { value: 2.5, unit: 'tCO2e/year', lowEstimate: 2.0, highEstimate: 3.0, uncertainty: 25 },
  low_meat: { value: 2.0, unit: 'tCO2e/year', lowEstimate: 1.5, highEstimate: 2.5, uncertainty: 25 },
  vegetarian: { value: 1.7, unit: 'tCO2e/year', lowEstimate: 1.3, highEstimate: 2.0, uncertainty: 25 },
  vegan: { value: 1.5, unit: 'tCO2e/year', lowEstimate: 1.0, highEstimate: 1.8, uncertainty: 25 },
};

// Climate Targets (tCO2e per capita)
export const climateTargets = {
  current_global_average: 6.3,
  target_2030: 2.9,
  target_2050: 1.4,
  high_income_current: 15,
  middle_income_current: 6,
  low_income_current: 2,
};

// Real-world adjustment factors
export const realWorldAdjustments = {
  vehicle_fuel_economy: 1.3, // 30% higher than laboratory values
  heat_pump_efficiency: 0.8, // 20% lower than rated COP
  solar_panel_output: 0.825, // 17.5% lower than STC rating
  building_energy_models: 1.2, // 20% higher than design prediction
};

// Behavioral intervention effectiveness (percentage point improvements)
export const behavioralInterventions = {
  social_comparison: { min: 2, max: 12, average: 7 },
  financial_incentives: { min: 2, max: 12, average: 7 },
  feedback_mechanisms: { min: 1, max: 10, average: 5 },
  information_education: { min: 0, max: 5, average: 2 },
  carbon_pricing: { min: 3, max: 25, average: 13 },
};

// Utility functions for working with emission factors
export const getEmissionFactor = (category: string, item: string): EmissionFactor | undefined => {
  const categories: Record<string, Record<string, EmissionFactor>> = {
    transportation: transportationFactors,
    food: foodFactors,
    energy: energyFactors,
    housing: housingConsumption,
    digital: digitalFactors,
    devices: deviceFactors,
    water: waterFactors,
    waste: wasteFactors,
  };
  
  return categories[category]?.[item];
};

export const getGridFactor = (country: string): number => {
  const gridFactor = electricityGridFactors.find(f => f.country === country);
  return gridFactor ? gridFactor.factor : 480; // Default to global average
};

export const calculateUncertaintyRange = (value: number, uncertainty: number): [number, number] => {
  const range = (value * uncertainty) / 100;
  return [value - range, value + range];
};