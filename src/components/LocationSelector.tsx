import { useState } from 'react';
import styles from './LocationSelector.module.css';

interface Country {
  code: string;
  name: string;
  region: string;
}

interface LocationSelectorProps {
  selectedCountry: string;
  onCountrySelect: (country: string) => void;
  countries: Country[];
}

const LocationSelector = ({ selectedCountry, onCountrySelect, countries }: LocationSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    onCountrySelect(country.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const groupedCountries = filteredCountries.reduce((groups, country) => {
    const region = country.region;
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(country);
    return groups;
  }, {} as Record<string, Country[]>);

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search for your country..."
          value={searchTerm || selectedCountry}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className={styles.searchInput}
        />
        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownContent}>
              {Object.entries(groupedCountries).map(([region, regionCountries]) => (
                <div key={region} className={styles.regionGroup}>
                  <div className={styles.regionHeader}>{region}</div>
                  {regionCountries.map((country) => (
                    <button
                      key={country.code}
                      className={`${styles.countryOption} ${
                        selectedCountry === country.name ? styles.selected : ''
                      }`}
                      onClick={() => handleSelect(country)}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className={styles.noResults}>
                  No countries found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocationSelector;