import PageLayout from '../components/PageLayout';
import NavigationButtons from '../components/NavigationButtons';

const FoodPage = () => {
  return (
    <PageLayout
      title="Tell us about your diet"
      description="Your food choices have a significant impact on your carbon footprint. This helps us calculate your dietary emissions accurately."
      estimatedTime={3}
    >
      <div>
        <p>Food assessment coming soon...</p>
        <NavigationButtons canProceed={true} />
      </div>
    </PageLayout>
  );
};

export default FoodPage;