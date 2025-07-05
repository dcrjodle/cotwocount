import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  CalculatorState,
  AssessmentStep,
  LocationData,
  FoodAssessment,
  TransportAssessment,
  EnergyAssessment,
  DigitalAssessment,
  WaterAssessment,
  WasteAssessment,
  CarbonFootprintResult,
  ScenarioComparison,
} from '../types';

import { ASSESSMENT_STEPS } from '../types';

interface CalculatorActions {
  // Navigation actions
  setCurrentStep: (step: AssessmentStep) => void;
  nextStep: () => void;
  previousStep: () => void;
  markStepCompleted: (step: AssessmentStep) => void;
  resetProgress: () => void;

  // Location actions
  setLocation: (location: LocationData) => void;

  // Assessment actions
  updateFoodAssessment: (data: Partial<FoodAssessment>) => void;
  updateTransportAssessment: (data: Partial<TransportAssessment>) => void;
  updateEnergyAssessment: (data: Partial<EnergyAssessment>) => void;
  updateDigitalAssessment: (data: Partial<DigitalAssessment>) => void;
  updateWaterAssessment: (data: Partial<WaterAssessment>) => void;
  updateWasteAssessment: (data: Partial<WasteAssessment>) => void;

  // Results actions
  setResults: (results: CarbonFootprintResult) => void;
  addScenario: (scenario: ScenarioComparison) => void;
  removeScenario: (index: number) => void;
  clearScenarios: () => void;

  // Calculation state
  setCalculating: (isCalculating: boolean) => void;
  addError: (error: string) => void;
  clearErrors: () => void;

  // Utility actions
  resetCalculator: () => void;
  getCompletionPercentage: () => number;
  isStepCompleted: (step: AssessmentStep) => boolean;
  canProceedToResults: () => boolean;
}

type CalculatorStore = CalculatorState & CalculatorActions;

const initialState: CalculatorState = {
  progress: {
    currentStep: 'location',
    completedSteps: [],
    totalSteps: 7, // excluding results step
  },
  location: null,
  assessments: {
    food: {},
    transport: {},
    energy: {},
    digital: {},
    water: {},
    waste: {},
  },
  results: null,
  scenarios: [],
  isCalculating: false,
  errors: [],
};

export const useCalculatorStore = create<CalculatorStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Navigation actions
        setCurrentStep: (step: AssessmentStep) => {
          set((state) => ({
            progress: { ...state.progress, currentStep: step },
          }));
        },

        nextStep: () => {
          const { progress } = get();
          const currentIndex = ASSESSMENT_STEPS.indexOf(progress.currentStep);
          const nextIndex = Math.min(currentIndex + 1, ASSESSMENT_STEPS.length - 1);
          const nextStep = ASSESSMENT_STEPS[nextIndex];
          
          set((state) => ({
            progress: { ...state.progress, currentStep: nextStep },
          }));
        },

        previousStep: () => {
          const { progress } = get();
          const currentIndex = ASSESSMENT_STEPS.indexOf(progress.currentStep);
          const prevIndex = Math.max(currentIndex - 1, 0);
          const prevStep = ASSESSMENT_STEPS[prevIndex];
          
          set((state) => ({
            progress: { ...state.progress, currentStep: prevStep },
          }));
        },

        markStepCompleted: (step: AssessmentStep) => {
          set((state) => ({
            progress: {
              ...state.progress,
              completedSteps: state.progress.completedSteps.includes(step)
                ? state.progress.completedSteps
                : [...state.progress.completedSteps, step],
            },
          }));
        },

        resetProgress: () => {
          set((state) => ({
            progress: {
              ...initialState.progress,
            },
          }));
        },

        // Location actions
        setLocation: (location: LocationData) => {
          set({ location });
          get().markStepCompleted('location');
        },

        // Assessment actions
        updateFoodAssessment: (data: Partial<FoodAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              food: { ...state.assessments.food, ...data },
            },
          }));
          
          // Mark as completed if all required fields are present
          const assessment = { ...get().assessments.food, ...data };
          if (assessment.dietType && assessment.redMeatServingsPerWeek !== undefined) {
            get().markStepCompleted('food');
          }
        },

        updateTransportAssessment: (data: Partial<TransportAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              transport: { ...state.assessments.transport, ...data },
            },
          }));
          
          const assessment = { ...get().assessments.transport, ...data };
          if (assessment.primaryTransportMode && assessment.weeklyDrivingDistance !== undefined) {
            get().markStepCompleted('transport');
          }
        },

        updateEnergyAssessment: (data: Partial<EnergyAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              energy: { ...state.assessments.energy, ...data },
            },
          }));
          
          const assessment = { ...get().assessments.energy, ...data };
          if (assessment.housingType && assessment.heatingSource) {
            get().markStepCompleted('energy');
          }
        },

        updateDigitalAssessment: (data: Partial<DigitalAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              digital: { ...state.assessments.digital, ...data },
            },
          }));
          
          const assessment = { ...get().assessments.digital, ...data };
          if (assessment.streamingHoursPerDay !== undefined) {
            get().markStepCompleted('digital');
          }
        },

        updateWaterAssessment: (data: Partial<WaterAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              water: { ...state.assessments.water, ...data },
            },
          }));
          
          const assessment = { ...get().assessments.water, ...data };
          if (assessment.showerMinutesPerDay !== undefined) {
            get().markStepCompleted('water');
          }
        },

        updateWasteAssessment: (data: Partial<WasteAssessment>) => {
          set((state) => ({
            assessments: {
              ...state.assessments,
              waste: { ...state.assessments.waste, ...data },
            },
          }));
          
          const assessment = { ...get().assessments.waste, ...data };
          if (assessment.recyclingRate !== undefined) {
            get().markStepCompleted('waste');
          }
        },

        // Results actions
        setResults: (results: CarbonFootprintResult) => {
          set({ results });
          get().markStepCompleted('results');
        },

        addScenario: (scenario: ScenarioComparison) => {
          set((state) => ({
            scenarios: [...state.scenarios, scenario],
          }));
        },

        removeScenario: (index: number) => {
          set((state) => ({
            scenarios: state.scenarios.filter((_, i) => i !== index),
          }));
        },

        clearScenarios: () => {
          set({ scenarios: [] });
        },

        // Calculation state
        setCalculating: (isCalculating: boolean) => {
          set({ isCalculating });
        },

        addError: (error: string) => {
          set((state) => ({
            errors: [...state.errors, error],
          }));
        },

        clearErrors: () => {
          set({ errors: [] });
        },

        // Utility actions
        resetCalculator: () => {
          set(initialState);
        },

        getCompletionPercentage: (): number => {
          const { progress } = get();
          return Math.round((progress.completedSteps.length / progress.totalSteps) * 100);
        },

        isStepCompleted: (step: AssessmentStep): boolean => {
          return get().progress.completedSteps.includes(step);
        },

        canProceedToResults: (): boolean => {
          const requiredSteps: AssessmentStep[] = ['location', 'food', 'transport', 'energy'];
          return requiredSteps.every(step => get().isStepCompleted(step));
        },
      }),
      {
        name: 'carbon-calculator-store',
        partialize: (state) => ({
          // Only persist certain parts of the state
          location: state.location,
          assessments: state.assessments,
          progress: state.progress,
        }),
      }
    ),
    {
      name: 'carbon-calculator',
    }
  )
);

// Selectors for commonly used state
export const useCurrentStep = () => useCalculatorStore((state) => state.progress.currentStep);
export const useLocation = () => useCalculatorStore((state) => state.location);
export const useAssessments = () => useCalculatorStore((state) => state.assessments);
export const useResults = () => useCalculatorStore((state) => state.results);
export const useScenarios = () => useCalculatorStore((state) => state.scenarios);
export const useIsCalculating = () => useCalculatorStore((state) => state.isCalculating);
export const useErrors = () => useCalculatorStore((state) => state.errors);
export const useCompletionPercentage = () => useCalculatorStore((state) => state.getCompletionPercentage());

// Action selectors
export const useNavigationActions = () => useCalculatorStore((state) => ({
  setCurrentStep: state.setCurrentStep,
  nextStep: state.nextStep,
  previousStep: state.previousStep,
  markStepCompleted: state.markStepCompleted,
  resetProgress: state.resetProgress,
}));

export const useAssessmentActions = () => useCalculatorStore((state) => ({
  updateFoodAssessment: state.updateFoodAssessment,
  updateTransportAssessment: state.updateTransportAssessment,
  updateEnergyAssessment: state.updateEnergyAssessment,
  updateDigitalAssessment: state.updateDigitalAssessment,
  updateWaterAssessment: state.updateWaterAssessment,
  updateWasteAssessment: state.updateWasteAssessment,
}));

export const useResultsActions = () => useCalculatorStore((state) => ({
  setResults: state.setResults,
  addScenario: state.addScenario,
  removeScenario: state.removeScenario,
  clearScenarios: state.clearScenarios,
}));