import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const DigitalPage = () => {
  return (
    <PageLayout
      title="Your digital footprint"
      description="Digital activities and device usage contribute to your carbon footprint through energy consumption and manufacturing."
      estimatedTime={2}
    >
      <div>
        <p>Digital assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default DigitalPage;