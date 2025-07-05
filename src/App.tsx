import { useCurrentStep } from './store/calculatorStore';
import LocationPage from './pages/LocationPage';
import FoodPage from './pages/FoodPage';
import TransportPage from './pages/TransportPage';
import EnergyPage from './pages/EnergyPage';
import DigitalPage from './pages/DigitalPage';
import WaterPage from './pages/WaterPage';
import WastePage from './pages/WastePage';
import ResultsPage from './pages/ResultsPage';
import ProgressBar from './components/ProgressBar';
import './App.css';

function App() {
  const currentStep = useCurrentStep();

  const getPageComponent = () => {
    switch (currentStep) {
      case 'location':
        return <LocationPage />;
      case 'food':
        return <FoodPage />;
      case 'transport':
        return <TransportPage />;
      case 'energy':
        return <EnergyPage />;
      case 'digital':
        return <DigitalPage />;
      case 'water':
        return <WaterPage />;
      case 'waste':
        return <WastePage />;
      case 'results':
        return <ResultsPage />;
      default:
        return <LocationPage />;
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Personal Carbon Calculator</h1>
        <ProgressBar />
      </div>
      <main className="app-main">
        {getPageComponent()}
      </main>
    </div>
  );
}

export default App;
