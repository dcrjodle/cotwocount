import { useState, useEffect } from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { useLocationDetection } from '../hooks/useLocationDetection';
import { electricityGridFactors } from '../data/emissionFactors';
import LocationSelector from '../components/LocationSelector';
import NavigationButtons from '../components/NavigationButtons';
import PageLayout from '../components/PageLayout';
import type { LocationData } from '../types';
import styles from './LocationPage.module.css';

const LocationPage = () => {
  const { location, setLocation, nextStep } = useCalculatorStore();
  const { detectLocation, isDetecting, error } = useLocationDetection();
  const [selectedCountry, setSelectedCountry] = useState<string>(location?.country || '');
  const [isManualSelection, setIsManualSelection] = useState(false);

  useEffect(() => {
    if (location) {
      setSelectedCountry(location.country);
    }
  }, [location]);

  const handleAutoDetect = async () => {
    try {
      const detectedLocation = await detectLocation();
      if (detectedLocation) {
        const gridFactor = electricityGridFactors.find(
          f => f.country.toLowerCase() === detectedLocation.country.toLowerCase()
        );
        
        const locationData: LocationData = {
          country: detectedLocation.country,
          region: detectedLocation.region,
          gridFactor: gridFactor?.factor || 480, // Default to global average
          isAutoDetected: true,
          coordinates: {
            latitude: detectedLocation.latitude,
            longitude: detectedLocation.longitude,
          },
        };
        
        setLocation(locationData);
        setSelectedCountry(detectedLocation.country);
      }
    } catch (err) {
      console.error('Location detection failed:', err);
    }
  };

  const handleManualSelection = (country: string) => {
    const gridFactor = electricityGridFactors.find(
      f => f.country.toLowerCase() === country.toLowerCase()
    );
    
    if (gridFactor) {
      const locationData: LocationData = {
        country: gridFactor.country,
        region: gridFactor.region,
        gridFactor: gridFactor.factor,
        isAutoDetected: false,
      };
      
      setLocation(locationData);
      setSelectedCountry(country);
    }
  };

  const handleNext = () => {
    if (location) {
      nextStep();
    }
  };

  const canProceed = !!location;

  const getGridFactorInfo = () => {
    if (!location) return null;
    
    const factor = location.gridFactor;
    let category = '';
    let description = '';
    
    if (factor < 100) {
      category = 'Very Clean';
      description = 'Excellent! Your electricity grid has very low carbon emissions.';
    } else if (factor < 300) {
      category = 'Clean';
      description = 'Good! Your electricity grid has relatively low carbon emissions.';
    } else if (factor < 500) {
      category = 'Mixed';
      description = 'Your electricity grid has moderate carbon emissions.';
    } else {
      category = 'Carbon Intensive';
      description = 'Your electricity grid relies heavily on fossil fuels.';
    }
    
    return { category, description, factor };
  };

  const gridInfo = getGridFactorInfo();

  return (
    <PageLayout
      title="Where are you located?"
      description="We need your location to calculate accurate emissions based on your local electricity grid and transportation systems."
      estimatedTime={2}
    >
      <div className={styles.locationContainer}>
        {/* Auto-detection section */}
        <div className={styles.autoDetectSection}>
          <h3>Automatic Detection</h3>
          <p>Let us automatically detect your location for the most accurate results.</p>
          <button
            className={styles.autoDetectButton}
            onClick={handleAutoDetect}
            disabled={isDetecting}
          >
            {isDetecting ? (
              <span className={styles.loading}>Detecting location...</span>
            ) : (
              <>
                📍 Detect My Location
              </>
            )}
          </button>
          {error && (
            <p className={styles.error}>
              Could not detect location: {error}
            </p>
          )}
        </div>

        {/* Manual selection divider */}
        <div className={styles.divider}>
          <span>or</span>
        </div>

        {/* Manual selection section */}
        <div className={styles.manualSection}>
          <h3>Select Manually</h3>
          <LocationSelector
            selectedCountry={selectedCountry}
            onCountrySelect={handleManualSelection}
            countries={electricityGridFactors.map(f => ({
              code: f.country,
              name: f.country,
              region: f.region,
            }))}
          />
        </div>

        {/* Grid factor display */}
        {gridInfo && (
          <div className={styles.gridInfo}>
            <h4>Electricity Grid Information</h4>
            <div className={styles.gridFactorCard}>
              <div className={styles.gridFactorHeader}>
                <span className={styles.gridCategory}>{gridInfo.category}</span>
                <span className={styles.gridFactor}>
                  {gridInfo.factor} g CO₂/kWh
                </span>
              </div>
              <p className={styles.gridDescription}>{gridInfo.description}</p>
              <div className={styles.gridComparison}>
                <div className={styles.comparisonItem}>
                  <span>Global Average:</span>
                  <span>480 g CO₂/kWh</span>
                </div>
                <div className={styles.comparisonItem}>
                  <span>Your Grid:</span>
                  <span 
                    className={`${styles.yourGrid} ${
                      gridInfo.factor < 480 ? styles.better : styles.worse
                    }`}
                  >
                    {gridInfo.factor < 480 ? '✓ Cleaner' : '× More Carbon Intensive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <NavigationButtons
          canProceed={canProceed}
          onNext={handleNext}
          showPrevious={false}
        />
      </div>
    </PageLayout>
  );
};

export default LocationPage;