import { useCompletionPercentage } from '../store/calculatorStore';
import { ASSESSMENT_STEPS } from '../types';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const completionPercentage = useCompletionPercentage();
  
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressHeader}>
        <span className={styles.progressText}>
          Progress: {completionPercentage}%
        </span>
        <span className={styles.stepText}>
          {ASSESSMENT_STEPS.length - 1} steps remaining
        </span>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;