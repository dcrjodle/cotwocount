import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const EnergyPage = () => {
  return (
    <PageLayout
      title="Tell us about your home energy use"
      description="Home energy consumption varies greatly based on housing type, heating source, and efficiency measures."
      estimatedTime={3}
    >
      <div>
        <p>Energy assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default EnergyPage;