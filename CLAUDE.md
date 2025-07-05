# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Personal Carbon Footprint Calculator** built with React, TypeScript, and Vite. The application implements scientifically accurate carbon footprint calculations based on peer-reviewed literature (2020-2025) using hybrid Life Cycle Assessment (LCA) methodology.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Core Architecture

### State Management (Zustand)
- **Global Store**: `src/store/calculatorStore.ts` manages all assessment data and navigation state
- **Persistence**: User progress is automatically saved to localStorage
- **Selectors**: Pre-built selectors for common state access patterns (`useCurrentStep`, `useLocation`, etc.)

### Assessment Flow Architecture
The app follows a **page-by-page assessment flow** like a slide deck:
1. **Location** → Auto-detect or manual country selection for regional emission factors
2. **Food** → Diet patterns, consumption levels, food waste
3. **Transport** → Vehicles, public transport, flights  
4. **Energy** → Housing type, heating source, efficiency
5. **Digital** → Streaming, devices, usage patterns
6. **Water** → Usage patterns and heating source
7. **Waste** → Recycling, consumption habits
8. **Results** → Interactive drag-to-reduce interface with scenarios

### Scientific Calculation Engine

#### Emission Factors Database (`src/data/emissionFactors.ts`)
- **Regional Specificity**: 50+ countries with electricity grid factors (50-783 g CO2/kWh)
- **Scientific Sources**: Based on academic review, IPCC data, national inventories
- **Uncertainty Ranges**: All factors include ±20-50% uncertainty bounds
- **Real-world Adjustments**: Laboratory vs actual performance corrections (+20-40% for vehicles)

#### Calculation Engine (`src/utils/calculationEngine.ts`)
- **Hybrid LCA Methodology**: Combines process-based and input-output analysis (21-32% more accurate)
- **Uncertainty Propagation**: Monte Carlo-style uncertainty aggregation across categories
- **Regional Adjustments**: Electricity-dependent activities adjusted by local grid factors
- **Climate Targets**: Results compared to 1.5°C compatibility (2.9 tCO2e by 2030)

### Component Architecture

#### Page Structure
- **PageLayout**: Consistent wrapper with title, description, estimated time
- **Assessment Pages**: Located in `src/pages/` - each handles one assessment category
- **Navigation**: Shared NavigationButtons component with progress validation

#### Reusable Components
- **LocationSelector**: Country selection with search and regional grouping
- **ProgressBar**: Visual progress tracking across assessment steps
- **NavigationButtons**: Previous/Next with validation and custom handlers

### CSS Modules & Styling
- **CSS Modules**: Scoped styling for all components (`.module.css` files)
- **Design System**: Consistent color palette, typography, spacing
- **Responsive**: Mobile-first design with breakpoints at 768px
- **Scientific UI**: Uncertainty communication, confidence intervals, climate scale visualization

## Key Implementation Patterns

### Assessment Data Flow
1. **User Input** → Component state (controlled components)
2. **Validation** → Real-time validation with visual feedback
3. **Store Update** → Zustand actions update global state
4. **Step Completion** → Auto-mark steps complete when required fields filled
5. **Calculation** → Real-time or on-demand emission calculations

### Context vs Store Usage
- **Zustand Store**: Global state, assessment data, navigation, results
- **React Context**: Page-specific data sharing between sub-components (future implementation)
- **Custom Hooks**: Business logic isolation (`useLocationDetection`, calculation hooks)

### Uncertainty Communication
- All emission factors include uncertainty ranges
- Results display confidence intervals (±25% target accuracy)
- Scientific methodology transparency throughout UI
- Real-world vs laboratory value adjustments clearly shown

## Scientific Accuracy Requirements

### Emission Factor Standards
- **Regional Specificity**: Location-based adjustments for electricity grid factors
- **Uncertainty Quantification**: 20-50% ranges based on scientific literature
- **Hybrid LCA**: Process-based + input-output analysis for completeness
- **Validation**: Cross-reference with academic studies and national inventories

### Calculation Methodology
- **Scope 1, 2, 3**: Direct, electricity, and value chain emissions
- **Real-world Adjustments**: Vehicle fuel economy +20-40%, building energy +20%
- **Aggregation**: Root sum of squares for uncertainty propagation
- **Climate Compatibility**: Results mapped to 1.5°C pathway targets

## Next Implementation Steps

### Phase 1: Core Assessment Modules (Priority: Medium)

#### 1. Food Module Assessment Page (`src/pages/FoodPage.tsx`)
- **Diet Type Selection**: Radio buttons for omnivorous/vegetarian/vegan/pescatarian
- **Meat Consumption**: Slider for red meat servings per week (0-14 range)
- **Dairy & Fish**: Consumption level selectors (low/medium/high)
- **Local Food**: Percentage slider for locally sourced food (0-100%)
- **Food Waste**: Level selector with impact explanation
- **Context Pattern**: Create `src/contexts/FoodContext.tsx` for component data sharing
- **Validation**: Real-time validation with visual feedback and emission preview

#### 2. Transport Module Assessment Page (`src/pages/TransportPage.tsx`)
- **Vehicle Ownership**: Car type selector (none/small/medium/large/hybrid/electric)
- **Driving Distance**: Weekly km input with regional average comparison
- **Public Transport**: Hours per week with mode selection (bus/train/subway)
- **Flight Calculator**: Domestic/short-haul/long-haul flights per year with class selection
- **Active Transport**: Walking/cycling hours for emission credits
- **Context Pattern**: Create `src/contexts/TransportContext.tsx`
- **Real-time Calculation**: Show emission impact as user adjusts inputs

#### 3. Energy Module Assessment Page (`src/pages/EnergyPage.tsx`)
- **Housing Profile**: Type (apartment/townhouse/house) and size (small/medium/large)
- **Heating Source**: Selection with efficiency indicators and grid factor impact
- **Occupancy**: Number of people for per-capita adjustments
- **Efficiency Measures**: Checkboxes for insulation, smart thermostat, etc.
- **Renewable Energy**: Percentage slider for renewable electricity
- **Monthly Bill**: Optional input for validation against calculated consumption
- **Context Pattern**: Create `src/contexts/EnergyContext.tsx`

### Phase 2: Results & Interaction (Priority: Medium)

#### 4. Results Page with Interactive Scenarios (`src/pages/ResultsPage.tsx`)
- **CO2 Score Display**: Large prominence with uncertainty range (±25% target)
- **Climate Scale Visualization**: 
  - Horizontal scale with user position marker
  - Color-coded zones (🔴 High >8t, 🟡 Medium 4-8t, 🟢 Low 2-4t, 🌟 Excellent <2t)
  - Target lines for 2030 (2.9 tCO2e) and 2050 (1.4 tCO2e)
- **Category Breakdown**: Pie/bar chart showing food/transport/energy/digital percentages
- **Regional Comparison**: User vs country average vs global average

#### 5. Interactive Drag-to-Reduce Interface (`src/components/ScenarioBuilder.tsx`)
- **Top Impact Factors**: Display 3-5 highest contributors with drag controls
- **Real-time Sliders**: 
  - Red meat servings: Current → Modified with tCO2e savings
  - Driving distance: Weekly km with immediate feedback
  - Flight frequency: Annual trips with business class toggle
- **Scenario Comparison**: Side-by-side current vs modified with % reduction
- **Target Achievement**: Progress bar toward 1.5°C compatibility
- **Action Difficulty**: Easy/Medium/Hard indicators for behavior changes

#### 6. Uncertainty Ranges & Scientific Credibility (`src/components/UncertaintyDisplay.tsx`)
- **Confidence Intervals**: Display ±25% ranges throughout results
- **Methodology Transparency**: Expandable sections explaining hybrid LCA approach
- **Data Sources**: References to scientific documentation and IPCC factors
- **Regional Specificity**: Show how location affects accuracy
- **Validation Indicators**: Comparison with academic studies where available

### Phase 3: Enhanced User Experience (Priority: Low)

#### 7. Optional Assessment Modules
- **Digital Activities Page**: Streaming hours, device replacement frequency, gaming
- **Water Usage Page**: Shower duration, water heating source, efficiency measures  
- **Waste Management Page**: Recycling rates, consumption habits, repair vs replace

#### 8. Page Transitions with Framer Motion (`src/components/PageTransition.tsx`)
- **Slide Animations**: Smooth transitions between assessment pages
- **Progress Animations**: Visual feedback for step completion
- **Micro-interactions**: Button hover states, form validation feedback
- **Loading States**: Calculation progress indicators

#### 9. Mobile Responsiveness & Accessibility
- **Touch Interactions**: Optimize sliders and selectors for mobile
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Tab order and keyboard shortcuts
- **WCAG 2.1 AA Compliance**: Color contrast, text sizing, alt text

#### 10. Social Sharing Functionality (`src/components/SocialShare.tsx`)
- **Shareable Results Card**: Instagram-story optimized (1080x1920px)
- **Content Elements**: CO2 score, climate position, top reduction opportunity
- **Platform Integration**: Instagram, Twitter, LinkedIn, Facebook, WhatsApp
- **Custom Messaging**: User-generated content with calculator CTA

### Development Approach for Each Module

#### Component Architecture Pattern
```typescript
// Page structure for each assessment module
const AssessmentPage = () => {
  const { assessment, updateAssessment } = useAssessmentActions();
  const [localState, setLocalState] = useState();
  
  return (
    <PageLayout title="..." description="..." estimatedTime={3}>
      <AssessmentProvider> {/* React Context for data sharing */}
        <QuestionSection />
        <EmissionPreview />
        <NavigationButtons canProceed={isValid} />
      </AssessmentProvider>
    </PageLayout>
  );
};
```

#### Calculation Integration
- **Real-time Updates**: Call calculation engine on input changes
- **Debounced Calculations**: Avoid excessive computation during typing
- **Error Handling**: Graceful degradation for calculation failures
- **Caching**: Store intermediate results for performance

#### Validation Strategy
- **Progressive Validation**: Show errors only after user interaction
- **Visual Feedback**: Red borders, check marks, progress indicators
- **Contextual Help**: Tooltips explaining emission factors and ranges
- **Skip Options**: Allow progression with reasonable defaults

This detailed roadmap provides clear implementation guidance while maintaining the scientific accuracy and user experience standards established in the foundation.

## Development Notes

### TypeScript Patterns
- Comprehensive type system in `src/types/index.ts`
- Union types for assessment options (`DietType`, `VehicleType`, etc.)
- Interface inheritance for assessment data structures
- Utility types for partial updates and validation

### Performance Considerations
- Zustand store with selective subscriptions to prevent unnecessary re-renders
- CSS Modules for optimized styling bundle size
- Lazy loading for assessment pages (future optimization)
- Efficient uncertainty calculation algorithms

### Testing Strategy (When Implemented)
- Unit tests for calculation engine with known input/output pairs
- Integration tests for assessment flow navigation
- Validation tests for emission factor database integrity
- E2E tests for complete user journeys