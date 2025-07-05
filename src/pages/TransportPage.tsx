import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const TransportPage = () => {
  return (
    <PageLayout
      title="How do you get around?"
      description="Transportation is often the largest part of an individual's carbon footprint. Let's understand your travel patterns."
      estimatedTime={3}
    >
      <div>
        <p>Transport assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default TransportPage;