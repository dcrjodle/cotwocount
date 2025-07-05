import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const WaterPage = () => {
  return (
    <PageLayout
      title="Water usage patterns"
      description="Water heating and usage contribute to your carbon footprint, especially when using fossil fuel-based heating."
      estimatedTime={2}
    >
      <div>
        <p>Water assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default WaterPage;