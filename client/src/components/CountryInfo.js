import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FaInfoCircle, FaUtensils, FaBuilding, FaWalking, FaCar, FaTaxi, FaPlane, FaBus, FaSubway, FaLandmark, FaTicketAlt, FaCalendarAlt, FaCamera, FaHotel, FaPercent, FaMobileAlt, FaExchangeAlt, FaBalanceScale, FaPassport, FaComments, FaCreditCard, FaMoneyBillWave, FaGlobe, FaIdCard, FaUniversity, FaStore, FaShoppingBag, FaPhone } from 'react-icons/fa';
import { azerbaijanData } from '../data/azerbaijanData';

// Using forwardRef to provide external access to the component
const CountryInfo = forwardRef(({ selectedCountry, onFilterChange }, ref) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Timer reference
  const loadingTimerRef = React.useRef(null);

  // Expose ref for communication with Map component
  useImperativeHandle(ref, () => ({
    setRestaurantData: (data) => {
      console.log('Restaurant data received:', data?.length || 0);
      setRestaurants(data || []);
      setLoading(false);
      
      // Clear timer
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    }
  }));

  // Will activate when a category is clicked
  const handleCategoryClick = (category) => {
    console.log(`Category ${category} clicked`);
    
    if (activeCategory === category) {
      // If the same category is clicked again, close it
      setActiveCategory(null);
      if (onFilterChange) onFilterChange(null);
      
      // Clear loading state
      setLoading(false);
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
        loadingTimerRef.current = null;
      }
    } else {
      // New category activated
      setActiveCategory(category);
      if (onFilterChange) onFilterChange(category);
      
      // Loading restaurants when Food category is selected
      if (category === 'food') {
        setLoading(true);
        console.log('Restaurant loading started...');
        
        // Call function in Map.js
        if (window.loadHighRatedFoodAndDrink && typeof window.loadHighRatedFoodAndDrink === 'function') {
          window.loadHighRatedFoodAndDrink();
          
          // If data doesn't arrive within 20 seconds, close loading state
          loadingTimerRef.current = setTimeout(() => {
            console.log('Loading timed out');
            setLoading(false);
          }, 20000);
        } else {
          console.error('loadHighRatedFoodAndDrink function not found!');
          // Close loading state after 3 seconds (temporary solution)
          loadingTimerRef.current = setTimeout(() => setLoading(false), 3000);
        }
      }
    }
  };
  
  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  if (!selectedCountry) return null;

  // Get festival data for Azerbaijan
  const getFestivalInfo = () => {
    if (selectedCountry === 'Azerbaijan' && azerbaijanData.cultureEvents?.festivals) {
      return (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Festivals in Azerbaijan</h3>
          <div className="space-y-4">
            {azerbaijanData.cultureEvents.festivals.map((festival, index) => (
              <div key={index} className="p-3 bg-white rounded-md shadow-sm">
                <h4 className="font-medium text-blue-600">{festival.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{festival.date}</p>
                <p className="text-gray-600 mt-2">{festival.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Default message for other countries
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Festival information for {selectedCountry} is being updated.</p>
        <p className="text-gray-400 text-sm mt-1">Check back soon for upcoming events.</p>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{selectedCountry}</h1>
        {selectedCountry === 'Azerbaijan' && (
          <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">Trending</div>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        <div className="text-sm text-blue-600 hover:underline cursor-pointer">View All</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <button 
          className={`category-button flex flex-col items-center justify-center p-4 rounded-xl transition ${activeCategory === 'tips' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          onClick={() => handleCategoryClick('tips')}
        >
          <FaInfoCircle className="text-2xl mb-2" />
          <span className="font-medium">Travel Tips</span>
        </button>
        
        <button 
          className={`category-button food-drink-btn flex flex-col items-center justify-center p-4 rounded-xl transition ${activeCategory === 'food' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          onClick={() => handleCategoryClick('food')}
        >
          <FaUtensils className="text-2xl mb-2" />
          <span className="font-medium">Food & Drink</span>
        </button>
        
        <button 
          className={`category-button flex flex-col items-center justify-center p-4 rounded-xl transition ${activeCategory === 'transport' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          onClick={() => handleCategoryClick('transport')}
        >
          <FaWalking className="text-2xl mb-2" />
          <span className="font-medium">Transportation</span>
        </button>
        
        <button 
          className={`category-button flex flex-col items-center justify-center p-4 rounded-xl transition ${activeCategory === 'culture' ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          onClick={() => handleCategoryClick('culture')}
        >
          <FaBuilding className="text-2xl mb-2" />
          <span className="font-medium">Culture & Events</span>
        </button>
      </div>
      
      {/* Festival information section */}
      {getFestivalInfo()}
    </div>
  );
});

export default CountryInfo;