import { ReactNode } from 'react';
import styles from './PageLayout.module.css';

interface PageLayoutProps {
  title: string;
  description: string;
  estimatedTime: number;
  children: ReactNode;
}

const PageLayout = ({ title, description, estimatedTime, children }: PageLayoutProps) => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>{title}</h2>
        <p className={styles.pageDescription}>{description}</p>
        <div className={styles.estimatedTime}>
          ⏱️ Estimated time: {estimatedTime} minutes
        </div>
      </div>
      <div className={styles.pageContent}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;