import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const WastePage = () => {
  return (
    <PageLayout
      title="Consumption and waste habits"
      description="Your purchasing decisions and waste management practices affect your overall environmental impact."
      estimatedTime={2}
    >
      <div>
        <p>Waste assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default WastePage;