// Core calculation engine implementing hybrid LCA methodology
// Based on scientific review and emission factors from academic documentation

import type {
  CalculationInput,
  CalculationResult,
  UncertaintyRange,
  EmissionBreakdown,
  CarbonFootprintResult,
  LocationData,
  FoodAssessment,
  TransportAssessment,
  EnergyAssessment,
  DigitalAssessment,
  WaterAssessment,
  WasteAssessment,
} from '../types';

import {
  getEmissionFactor,
  getGridFactor,
  calculateUncertaintyRange,
  transportationFactors,
  foodFactors,
  energyFactors,
  housingConsumption,
  digitalFactors,
  waterFactors,
  wasteFactors,
  realWorldAdjustments,
  climateTargets,
} from '../data/emissionFactors';

/**
 * Calculate emissions for a single input using hybrid LCA methodology
 */
export const calculateSingleEmission = (
  input: CalculationInput,
  regionalGridFactor?: number
): CalculationResult => {
  const emissionFactor = getEmissionFactor(input.category, input.subcategory);
  
  if (!emissionFactor) {
    throw new Error(`Emission factor not found for ${input.category}:${input.subcategory}`);
  }

  let adjustedFactor = emissionFactor.value;
  let regionalAdjustment = 1;
  let realWorldAdjustment = 1;

  // Apply regional adjustments for electricity-dependent activities
  if (input.category === 'energy' || input.subcategory.includes('electric')) {
    if (regionalGridFactor !== undefined) {
      regionalAdjustment = regionalGridFactor / 480; // Normalize to global average
      adjustedFactor *= regionalAdjustment;
    }
  }

  // Apply real-world adjustments based on scientific findings
  if (input.category === 'transportation') {
    realWorldAdjustment = realWorldAdjustments.vehicle_fuel_economy;
    adjustedFactor *= realWorldAdjustment;
  }

  const emissions = input.value * adjustedFactor;
  
  // Calculate uncertainty range using Monte Carlo-style propagation
  const uncertaintyRange = calculateUncertaintyRange(emissions, emissionFactor.uncertainty);

  return {
    emissions,
    uncertainty: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - emissionFactor.uncertainty,
    },
    factors: {
      emissionFactor: emissionFactor.value,
      regionalAdjustment,
      realWorldAdjustment,
    },
  };
};

/**
 * Calculate food emissions based on assessment data
 */
export const calculateFoodEmissions = (
  assessment: FoodAssessment,
  location: LocationData
): CalculationResult => {
  let totalEmissions = 0;
  let totalUncertainty = 0;
  let factorCount = 0;

  // Calculate based on dietary pattern and specific consumption
  const redMeatEmissions = (assessment.redMeatServingsPerWeek || 0) * 0.15 * 52 * foodFactors.beef.value; // 150g per serving
  const whiteMetEmissions = (assessment.whiteMetServingsPerWeek || 0) * 0.12 * 52 * foodFactors.chicken.value; // 120g per serving
  const fishEmissions = (assessment.fishServingsPerWeek || 0) * 0.1 * 52 * foodFactors.fish_small.value; // 100g per serving

  // Base diet emissions
  totalEmissions += redMeatEmissions + whiteMetEmissions + fishEmissions;

  // Dairy consumption adjustments
  const dairyMultiplier = {
    low: 0.7,
    medium: 1.0,
    high: 1.4,
  }[assessment.dairyConsumption || 'medium'];

  totalEmissions += 365 * 0.4 * foodFactors.milk.value * dairyMultiplier; // 400ml per day baseline

  // Vegetable consumption
  const vegetableMultiplier = {
    low: 0.8,
    medium: 1.0,
    high: 1.3,
  }[assessment.vegetableConsumption || 'medium'];

  totalEmissions += 365 * 0.5 * foodFactors.vegetables_root.value * vegetableMultiplier; // 500g per day baseline

  // Local food adjustment (reduces transport emissions by up to 30%)
  const localFoodReduction = (assessment.localFoodPercentage || 50) / 100 * 0.3;
  totalEmissions *= (1 - localFoodReduction);

  // Food waste adjustment
  const wasteMultiplier = {
    minimal: 1.05,
    average: 1.15,
    high: 1.3,
  }[assessment.foodWasteLevel || 'average'];

  totalEmissions *= wasteMultiplier;

  // Calculate aggregated uncertainty (root sum of squares)
  const uncertainties = [
    foodFactors.beef.uncertainty,
    foodFactors.chicken.uncertainty,
    foodFactors.fish_small.uncertainty,
    foodFactors.milk.uncertainty,
    foodFactors.vegetables_root.uncertainty,
  ];

  totalUncertainty = Math.sqrt(
    uncertainties.reduce((sum, u) => sum + u * u, 0) / uncertainties.length
  );

  const uncertaintyRange = calculateUncertaintyRange(totalEmissions, totalUncertainty);

  return {
    emissions: totalEmissions,
    uncertainty: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - totalUncertainty,
    },
    factors: {
      emissionFactor: totalEmissions / Math.max(1, assessment.redMeatServingsPerWeek || 1),
      regionalAdjustment: 1 - localFoodReduction,
      realWorldAdjustment: wasteMultiplier,
    },
  };
};

/**
 * Calculate transport emissions based on assessment data
 */
export const calculateTransportEmissions = (
  assessment: TransportAssessment,
  location: LocationData
): CalculationResult => {
  let totalEmissions = 0;
  let totalUncertainty = 0;

  // Vehicle emissions
  if (assessment.vehicleType && assessment.vehicleType !== 'no_car') {
    let carFactor = transportationFactors.car_medium_gasoline;
    
    switch (assessment.vehicleType) {
      case 'small_gasoline':
        carFactor = transportationFactors.car_small_gasoline;
        break;
      case 'large_gasoline':
        carFactor = transportationFactors.car_large_gasoline;
        break;
      case 'hybrid':
        carFactor = transportationFactors.car_hybrid;
        break;
      case 'electric':
        // Adjust electric car emissions based on grid factor
        const gridFactor = location?.gridFactor || 480;
        if (gridFactor < 150) {
          carFactor = transportationFactors.car_electric_clean;
        } else if (gridFactor < 400) {
          carFactor = transportationFactors.car_electric_mixed;
        } else {
          carFactor = transportationFactors.car_electric_dirty;
        }
        break;
    }

    const weeklyDistance = assessment.weeklyDrivingDistance || 0;
    const vehicleEmissions = weeklyDistance * 52 * carFactor.value / 1000; // Convert to kg CO2e
    totalEmissions += vehicleEmissions;
    totalUncertainty += carFactor.uncertainty;
  }

  // Public transport emissions
  const publicTransportHours = assessment.publicTransportHoursPerWeek || 0;
  const avgPublicTransportSpeed = 25; // km/h average
  const publicTransportDistance = publicTransportHours * avgPublicTransportSpeed * 52;
  const publicTransportEmissions = publicTransportDistance * transportationFactors.bus_urban.value / 1000;
  totalEmissions += publicTransportEmissions;

  // Flight emissions
  const domesticFlights = assessment.domesticFlightsPerYear || 0;
  const shortHaulFlights = assessment.shortHaulFlightsPerYear || 0;
  const longHaulFlights = assessment.longHaulFlightsPerYear || 0;

  const avgDomesticDistance = 800; // km
  const avgShortHaulDistance = 1200; // km
  const avgLongHaulDistance = 8000; // km

  const flightEmissions = 
    domesticFlights * avgDomesticDistance * transportationFactors.flight_domestic.value / 1000 +
    shortHaulFlights * avgShortHaulDistance * transportationFactors.flight_short_haul.value / 1000 +
    longHaulFlights * avgLongHaulDistance * transportationFactors.flight_long_haul_economy.value / 1000;

  // Business class adjustment
  const businessClassPercentage = (assessment.businessClassPercentage || 0) / 100;
  const businessClassAdjustment = 1 + businessClassPercentage; // Business class has ~2x emissions
  totalEmissions += flightEmissions * businessClassAdjustment;

  // Apply real-world adjustment for transportation
  totalEmissions *= realWorldAdjustments.vehicle_fuel_economy;

  // Aggregate uncertainty
  totalUncertainty = Math.sqrt(totalUncertainty * totalUncertainty / 4); // Average uncertainty across transport modes

  const uncertaintyRange = calculateUncertaintyRange(totalEmissions, Math.max(totalUncertainty, 30));

  return {
    emissions: totalEmissions,
    uncertainty: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - Math.max(totalUncertainty, 30),
    },
    factors: {
      emissionFactor: totalEmissions,
      regionalAdjustment: location?.gridFactor ? location.gridFactor / 480 : 1,
      realWorldAdjustment: realWorldAdjustments.vehicle_fuel_economy,
    },
  };
};

/**
 * Calculate energy emissions based on assessment data
 */
export const calculateEnergyEmissions = (
  assessment: EnergyAssessment,
  location: LocationData
): CalculationResult => {
  let totalEmissions = 0;
  const gridFactor = location?.gridFactor || 480; // g CO2/kWh

  // Base energy consumption from housing type and size
  const housingKey = `${assessment.housingType}_${assessment.housingSize}` as keyof typeof housingConsumption;
  const baseConsumption = housingConsumption[housingKey]?.value || housingConsumption.apartment_medium.value;

  // Adjust for number of occupants
  const occupantAdjustment = Math.sqrt(assessment.numberOfOccupants || 2) / Math.sqrt(2);
  const adjustedConsumption = baseConsumption * occupantAdjustment;

  // Electricity emissions
  const electricityEmissions = adjustedConsumption * 365 * gridFactor / 1000; // Convert to kg CO2e

  // Heating source emissions
  let heatingEmissions = 0;
  const heatingPortion = 0.6; // Heating typically 60% of energy use

  switch (assessment.heatingSource) {
    case 'natural_gas':
      // Convert kWh to GJ and apply gas emission factor
      const gasConsumption = adjustedConsumption * heatingPortion * 365 * 0.0036; // kWh to GJ
      heatingEmissions = gasConsumption * energyFactors.natural_gas.value;
      break;
    case 'heat_pump':
      // Heat pumps use electricity but are more efficient
      const heatPumpEfficiency = 3.5; // COP of 3.5
      const heatPumpConsumption = adjustedConsumption * heatingPortion / heatPumpEfficiency;
      heatingEmissions = heatPumpConsumption * 365 * gridFactor / 1000;
      break;
    case 'electricity':
      // Electric heating already included in electricity consumption
      break;
    default:
      // For other heating sources, assume similar to gas
      heatingEmissions = adjustedConsumption * heatingPortion * 365 * 0.2; // kg CO2e
  }

  totalEmissions = electricityEmissions + heatingEmissions;

  // Efficiency adjustments
  const efficiencyMultiplier = {
    poor: 1.3,
    average: 1.0,
    good: 0.8,
    excellent: 0.6,
  }[assessment.energyEfficiencyRating || 'average'];

  totalEmissions *= efficiencyMultiplier;

  // Renewable energy adjustment
  const renewablePercentage = (assessment.renewableEnergyPercentage || 0) / 100;
  totalEmissions *= (1 - renewablePercentage * 0.8); // 80% reduction for renewable sources

  // Apply real-world adjustment
  totalEmissions *= realWorldAdjustments.building_energy_models;

  const uncertainty = 35; // 35% uncertainty for energy calculations
  const uncertaintyRange = calculateUncertaintyRange(totalEmissions, uncertainty);

  return {
    emissions: totalEmissions,
    uncertainty: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - uncertainty,
    },
    factors: {
      emissionFactor: gridFactor,
      regionalAdjustment: gridFactor / 480,
      realWorldAdjustment: realWorldAdjustments.building_energy_models,
    },
  };
};

/**
 * Calculate digital emissions based on assessment data
 */
export const calculateDigitalEmissions = (
  assessment: DigitalAssessment,
  location: LocationData
): CalculationResult => {
  let totalEmissions = 0;

  // Streaming emissions
  const streamingHours = assessment.streamingHoursPerDay || 0;
  const streamingQuality = assessment.streamingQuality || 'hd';
  const streamingFactor = streamingQuality === '4k' ? digitalFactors.streaming_4k : digitalFactors.streaming_hd;
  const streamingEmissions = streamingHours * 365 * streamingFactor.value;

  // Other digital activities
  const videoCallEmissions = (assessment.videoCallHoursPerDay || 0) * 365 * digitalFactors.video_calls.value;
  const socialMediaEmissions = (assessment.socialMediaHoursPerDay || 0) * 60 * 365 * digitalFactors.social_media.value;
  const gamingEmissions = (assessment.gamingHoursPerDay || 0) * 365 * digitalFactors.online_gaming.value;

  // Device manufacturing (amortized over device lifetime)
  let deviceEmissions = 0;
  const phoneLifetime = {
    yearly: 1,
    every_2_years: 2,
    every_3_years: 3,
    every_4_plus_years: 4,
  }[assessment.phoneReplacementFrequency || 'every_3_years'];

  const laptopLifetime = {
    yearly: 1,
    every_2_years: 2,
    every_3_years: 3,
    every_4_plus_years: 5,
  }[assessment.laptopReplacementFrequency || 'every_4_plus_years'];

  deviceEmissions += 75 / phoneLifetime; // Smartphone manufacturing per year
  deviceEmissions += 300 / laptopLifetime; // Laptop manufacturing per year

  totalEmissions = streamingEmissions + videoCallEmissions + socialMediaEmissions + 
                  gamingEmissions + deviceEmissions;

  const uncertainty = 40; // 40% uncertainty for digital activities
  const uncertaintyRange = calculateUncertaintyRange(totalEmissions, uncertainty);

  return {
    emissions: totalEmissions,
    uncertainty: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - uncertainty,
    },
    factors: {
      emissionFactor: streamingFactor.value,
      regionalAdjustment: 1,
      realWorldAdjustment: 1,
    },
  };
};

/**
 * Calculate comprehensive carbon footprint from all assessments
 */
export const calculateComprehensiveFootprint = (
  location: LocationData,
  assessments: {
    food: Partial<FoodAssessment>;
    transport: Partial<TransportAssessment>;
    energy: Partial<EnergyAssessment>;
    digital: Partial<DigitalAssessment>;
    water: Partial<WaterAssessment>;
    waste: Partial<WasteAssessment>;
  }
): CarbonFootprintResult => {
  // Calculate emissions for each category
  const foodResult = calculateFoodEmissions(assessments.food as FoodAssessment, location);
  const transportResult = calculateTransportEmissions(assessments.transport as TransportAssessment, location);
  const energyResult = calculateEnergyEmissions(assessments.energy as EnergyAssessment, location);
  const digitalResult = calculateDigitalEmissions(assessments.digital as DigitalAssessment, location);

  // TODO: Implement water and waste calculations
  const waterEmissions = 0.5; // Placeholder
  const wasteEmissions = 0.3; // Placeholder

  const emissionBreakdown: EmissionBreakdown = {
    food: foodResult.emissions / 1000, // Convert to tCO2e
    transport: transportResult.emissions / 1000,
    energy: energyResult.emissions / 1000,
    digital: digitalResult.emissions / 1000,
    water: waterEmissions,
    waste: wasteEmissions,
    total: 0,
  };

  emissionBreakdown.total = Object.values(emissionBreakdown).reduce((sum, val) => sum + val, 0) - emissionBreakdown.total;

  // Aggregate uncertainty using root sum of squares
  const uncertainties = [foodResult, transportResult, energyResult, digitalResult];
  const aggregateUncertainty = Math.sqrt(
    uncertainties.reduce((sum, result) => {
      const relativeUncertainty = (result.uncertainty.high - result.uncertainty.low) / (2 * result.emissions);
      return sum + relativeUncertainty * relativeUncertainty;
    }, 0) / uncertainties.length
  ) * 100;

  const uncertaintyRange = calculateUncertaintyRange(emissionBreakdown.total, aggregateUncertainty);

  // Determine climate compatibility
  let climateCompatibility: 'excellent' | 'good' | 'medium' | 'high_impact';
  if (emissionBreakdown.total <= 2.0) {
    climateCompatibility = 'excellent';
  } else if (emissionBreakdown.total <= 2.9) {
    climateCompatibility = 'good';
  } else if (emissionBreakdown.total <= 6.3) {
    climateCompatibility = 'medium';
  } else {
    climateCompatibility = 'high_impact';
  }

  return {
    totalEmissions: emissionBreakdown.total,
    emissionBreakdown,
    uncertaintyRange: {
      low: uncertaintyRange[0],
      high: uncertaintyRange[1],
      confidence: 100 - aggregateUncertainty,
    },
    comparison: {
      globalAverage: climateTargets.current_global_average,
      countryAverage: climateTargets.middle_income_current, // TODO: Make country-specific
      climateTarget2030: climateTargets.target_2030,
      climateTarget2050: climateTargets.target_2050,
    },
    climateCompatibility,
  };
};