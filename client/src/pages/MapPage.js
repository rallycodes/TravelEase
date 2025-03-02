import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Map from '../components/Map';
import CountryInfo from '../components/CountryInfo';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const MapPage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const countryInfoRef = useRef(null);
  const location = useLocation();
  
  // Set country from location state if available
  useEffect(() => {
    if (location.state && location.state.selectedCountry) {
      setSelectedCountry(location.state.selectedCountry);
    }
  }, [location.state]);
  
  // Define countrySelect handler
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };
  
  // Define filter change handler
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  // Map loading handlers
  const handleMapLoad = () => {
    setMapLoading(false);
    setMapError(null);
  };
  
  const handleMapError = (error) => {
    console.error("Map loading error:", error);
    setMapLoading(false);
    setMapError("Failed to load map. Please try refreshing the page.");
  };
  
  // Set up global functions for communication between components
  useEffect(() => {
    // Make the restaurant data update function available globally
    window.updateRestaurants = (restaurants) => {
      if (countryInfoRef.current && countryInfoRef.current.setRestaurantData) {
        countryInfoRef.current.setRestaurantData(restaurants);
      }
    };
    
    // Cleanup on unmount
    return () => {
      delete window.updateRestaurants;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="container mx-auto my-6 px-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {mapLoading && (
            <div className="h-[70vh] flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          
          {mapError && (
            <div className="h-[70vh] flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="text-center text-red-500 p-4">
                <p className="mb-4">{mapError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          )}
          
          <Map 
            selectedCountry={selectedCountry} 
            onCountrySelect={handleCountrySelect}
            className={`h-[70vh] ${mapLoading ? 'hidden' : 'block'}`}
            activeFilter={activeFilter}
            onMapLoad={handleMapLoad}
            onMapError={handleMapError}
          />
        </div>
        
        <div className="md:w-1/2">
          <CountryInfo 
            selectedCountry={selectedCountry}
            onFilterChange={handleFilterChange}
            ref={countryInfoRef}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MapPage; 