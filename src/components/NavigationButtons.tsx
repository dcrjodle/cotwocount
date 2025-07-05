import { useCalculatorStore } from '../store/calculatorStore';
import styles from './NavigationButtons.module.css';

interface NavigationButtonsProps {
  canProceed: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

const NavigationButtons = ({
  canProceed,
  onNext,
  onPrevious,
  showPrevious = true,
  nextLabel = 'Continue',
  previousLabel = 'Back',
}: NavigationButtonsProps) => {
  const { nextStep, previousStep } = useCalculatorStore();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      previousStep();
    }
  };

  return (
    <div className={styles.navigationContainer}>
      {showPrevious && (
        <button
          className={styles.previousButton}
          onClick={handlePrevious}
          type="button"
        >
          ← {previousLabel}
        </button>
      )}
      <button
        className={`${styles.nextButton} ${!canProceed ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={!canProceed}
        type="button"
      >
        {nextLabel} →
      </button>
    </div>
  );
};

export default NavigationButtons;