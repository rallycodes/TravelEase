import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FaInfoCircle, FaUtensils, FaBuilding, FaWalking, FaCar, FaTaxi, FaPlane, FaBus, FaSubway, FaLandmark, FaTicketAlt, FaCalendarAlt, FaCamera, FaHotel } from 'react-icons/fa';

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
      
      {/* Travel Tips Category Content */}
      {activeCategory === 'tips' && (
        <div className="mt-6 fade-in space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Travel Tips</h3>
            <div className="text-sm text-blue-600">See All</div>
        </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
            <h4 className="font-bold text-blue-700 mb-1">Best Time to Visit</h4>
            <p className="text-gray-700">April to June and September to October offer the most pleasant weather for exploring {selectedCountry}.</p>
    </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <FaPlane className="text-blue-500 mr-2" />
                <h4 className="font-semibold">Visa Information</h4>
                </div>
              <p className="text-gray-600 text-sm">Many European citizens can enter {selectedCountry} visa-free for 90 days. Others may need to apply in advance.</p>
        </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-center mb-2">
                <FaHotel className="text-blue-500 mr-2" />
                <h4 className="font-semibold">Accommodation</h4>
              </div>
              <p className="text-gray-600 text-sm">Book accommodations 2-3 months in advance, especially during peak tourist season (summer months).</p>
                </div>
        </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Local Currency</h4>
            <p className="text-gray-600 mb-2">
              {selectedCountry === 'Azerbaijan' ? 'The Azerbaijani Manat (₼) is the local currency. Credit cards are widely accepted in cities, but keep cash for rural areas.' : 
               selectedCountry === 'United Kingdom' ? 'The British Pound (£) is the local currency. Credit cards are accepted almost everywhere.' : 
               'Check the local currency before your trip.'}
            </p>
            {selectedCountry === 'Azerbaijan' && (
              <div className="text-sm text-gray-500">
                <p>Exchange rates (approx):</p>
                <ul className="list-disc list-inside">
                  <li>1 USD ≈ 1.70 ₼</li>
                  <li>1 EUR ≈ 1.85 ₼</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Food & Drink Category Content */}
      {activeCategory === 'food' && (
        <div className="mt-6 fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Popular Restaurants</h3>
            <div className="text-sm text-blue-600 cursor-pointer">Filter</div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="loading-spinner animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Loading restaurants...</p>
                  </div>
          ) : restaurants.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard key={`restaurant-${restaurant.place_id || index}`} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="py-6 text-center bg-gray-50 rounded-lg">
              <FaUtensils className="mx-auto text-gray-300 text-4xl mb-3" />
              <p className="text-gray-500">No restaurant information found for this region.</p>
              <p className="text-gray-400 text-sm mt-1">Try selecting a different area on the map.</p>
            </div>
          )}
          
          {selectedCountry === 'Azerbaijan' && !loading && (
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-gray-800">Traditional Azerbaijani Dishes</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition">
                  <h5 className="font-medium">Plov (Pilaf)</h5>
                  <p className="text-sm text-gray-600">Fragrant rice dish usually topped with saffron and served with lamb or chicken.</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition">
                  <h5 className="font-medium">Dolma</h5>
                  <p className="text-sm text-gray-600">Grape leaves stuffed with minced meat, rice, and herbs.</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition">
                  <h5 className="font-medium">Qutab</h5>
                  <p className="text-sm text-gray-600">Thin flatbread filled with herbs, meat, or pumpkin then folded like a crescent.</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition">
                  <h5 className="font-medium">Dushbara</h5>
                  <p className="text-sm text-gray-600">Tiny dumplings served in a lamb broth with herbs and garlic.</p>
                  </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Transportation Category Content */}
      {activeCategory === 'transport' && (
        <div className="mt-6 fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Transportation Options</h3>
            <div className="text-sm text-blue-600 cursor-pointer">Compare</div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Bolt Kartı */}
            <a 
              href="https://bolt.eu/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-5 border border-gray-200 rounded-lg hover:shadow-md transition duration-200 bg-white group"
            >
              <div className="flex">
                <div className="w-24 h-24 flex-shrink-0 mr-5 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition">
                  <FaTaxi className="text-white text-4xl" />
        </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-bold text-xl text-gray-800">Bolt</h4>
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Recommended</span>
    </div>
                  
                  <p className="text-gray-600 mt-2">
                    Affordable taxis and car rental services in the city. Get special discounts on your first ride.
                  </p>
                  
                  <div className="mt-3 flex flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2 mb-1">
                      <FaCar className="inline mr-1" /> Taxi
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2 mb-1">
                      Fast Delivery
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2 mb-1">
                      E-Scooter
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center ml-3">
                  <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-green-600 transition">
                    →
                  </div>
                </div>
              </div>
            </a>
            
            {/* Public Transportation */}
            <div className="block p-5 border border-gray-200 rounded-lg bg-white">
              <h4 className="font-bold text-gray-800 mb-3">Public Transportation</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FaSubway className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Metro</h5>
                    <p className="text-sm text-gray-600">
                      {selectedCountry === 'Azerbaijan' ? 
                        'Baku has a clean, efficient metro system reaching major parts of the city.' : 
                        'Extensive underground network connecting all major parts of the city.'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Fare: {selectedCountry === 'Azerbaijan' ? '0.5 ₼' : '£2.80'} per trip</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FaBus className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Bus</h5>
                    <p className="text-sm text-gray-600">
                      {selectedCountry === 'Azerbaijan' ? 
                        'Buses cover routes throughout the city and to suburbs.' : 
                        'Comprehensive bus network operating 24/7 in major cities.'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Fare: {selectedCountry === 'Azerbaijan' ? '0.3 ₼' : '£1.65'} per trip</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Car Rental */}
            <div className="block p-5 border border-gray-200 rounded-lg bg-white">
              <h4 className="font-bold text-gray-800 mb-2">Car Rental Services</h4>
              <p className="text-gray-600 mb-3">
                Explore {selectedCountry} at your own pace with a rental car. International driving licenses are accepted.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-medium">Hertz</div>
                  <div className="text-xs text-gray-500">From $35/day</div>
                </div>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-medium">Avis</div>
                  <div className="text-xs text-gray-500">From $40/day</div>
                </div>
                <div className="px-3 py-2 bg-gray-100 rounded-lg">
                  <div className="text-sm font-medium">Local Rentals</div>
                  <div className="text-xs text-gray-500">From $25/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Culture & Events Category Content */}
      {activeCategory === 'culture' && (
        <div className="mt-6 fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Culture & Events</h3>
            <div className="text-sm text-blue-600 cursor-pointer">See Calendar</div>
          </div>
          
          {selectedCountry === 'Azerbaijan' && (
            <>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Popular Attractions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gray-200 relative">
                      <img src='https://georgia.to/media/thumbnails/nVJrVM2hudM8Aebi5PijaX_smedium.jpg' alt='Maiden Tower' className="absolute inset-0 w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h5 className="font-bold">Maiden Tower</h5>
                        <div className="flex items-center text-sm">
                          <FaLandmark className="mr-1" /> UNESCO World Heritage
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between text-sm">
                        <span>
                          <FaTicketAlt className="inline mr-1 text-blue-500" /> Entry: 15 ₼
                        </span>
                        <span className="text-green-600">Open Today</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        12th-century monument in the Old City of Baku, offering panoramic views of the city and Caspian Sea.
                      </p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gray-200 relative">
                      <img src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/83/1a/58/heydar-aliyev-center.jpg?w=900&h=500&s=1' alt='Heydar Aliyev Center' className="absolute inset-0 w-full h-full object-cover"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 p-3 text-white">
                        <h5 className="font-bold">Heydar Aliyev Center</h5>
                        <div className="flex items-center text-sm">
                          <FaBuilding className="mr-1" /> Modern Architecture
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between text-sm">
                        <span>
                          <FaTicketAlt className="inline mr-1 text-blue-500" /> Entry: 12 ₼
                        </span>
                        <span className="text-green-600">Open Today</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Distinctive landmark of modern architecture designed by Zaha Hadid, hosting exhibitions and cultural events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Upcoming Events</h4>
                <div className="space-y-3">
                  <div className="flex border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
                    <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded flex flex-col items-center justify-center mr-4">
                      <span className="text-xs font-medium">JUN</span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Baku Jazz Festival</h5>
                      <p className="text-sm text-gray-600">Annual international jazz festival featuring performances across the city.</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FaCalendarAlt className="mr-1" /> Jun 24 - Jul 2, 2023
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
                    <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded flex flex-col items-center justify-center mr-4">
                      <span className="text-xs font-medium">AUG</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h5 className="font-medium">Gobustan Rock Art Festival</h5>
                      <p className="text-sm text-gray-600">Cultural celebration at the ancient rock art site with music and traditional performances.</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FaCalendarAlt className="mr-1" /> Aug 15 - Aug 16, 2023
                      </div>
                    </div>
                  </div>
          </div>
        </div>
            </>
          )}
          
          {selectedCountry === 'United Kingdom' && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FaCamera className="mx-auto text-gray-300 text-4xl mb-3" />
              <p className="text-gray-500">Content for United Kingdom is currently being updated.</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for cultural attractions and events.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

// Restoran Kartı bileşeni
const RestaurantCard = ({ restaurant }) => {
  // Convert restaurant type to human-friendly format
  const formatType = (type) => {
    if (!type) return '';
    return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };
  
  // Display price level as $
  const getPriceLevel = (level) => {
    if (!level && level !== 0) return 'Price info not available';
    return '$'.repeat(level);
  };
  
  // Create Google Maps URL
  const getGoogleMapsUrl = () => {
    try {
      if (typeof restaurant.geometry.location.lat === 'function') {
        return `https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&query_place_id=${restaurant.place_id}`;
      } else {
        // If lat/lng is an object
        return `https://www.google.com/maps/search/?api=1&query=${restaurant.geometry.location.lat},${restaurant.geometry.location.lng}&query_place_id=${restaurant.place_id}`;
      }
    } catch (error) {
      console.error('Error creating Google Maps URL:', error);
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}`;
    }
  };

  return (
    <a 
      href={getGoogleMapsUrl()} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition duration-200 bg-white"
    >
      <div className="flex">
        {restaurant.photos && restaurant.photos.length > 0 ? (
          <div className="w-24 h-24 rounded-lg overflow-hidden mr-4 flex-shrink-0">
            <img 
              src={restaurant.photos[0].getUrl({maxWidth: 150, maxHeight: 150})} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center">
            <FaUtensils className="text-gray-400 text-xl" />
        </div>
      )}

        <div className="flex-1">
          <h4 className="font-bold text-gray-800">{restaurant.name}</h4>
          
          <div className="flex items-center mt-1">
            <span className="text-yellow-500 mr-1">{restaurant.rating || '?'}</span>
            <span className="text-yellow-500">⭐</span>
            <span className="text-gray-500 text-sm ml-1">
              ({restaurant.user_ratings_total || 0} reviews)
            </span>
          </div>
          
          <div className="mt-1 flex flex-wrap">
            {restaurant.types && restaurant.types.length > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 mr-1 mb-1">
                {formatType(restaurant.types[0])}
              </span>
            )}
            
            {(restaurant.price_level !== undefined) && (
              <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5 mr-1 mb-1">
                {getPriceLevel(restaurant.price_level)}
              </span>
            )}
            
            {restaurant.opening_hours && (
              <span className={`text-xs rounded-full px-2 py-0.5 ${restaurant.opening_hours.open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {restaurant.opening_hours.open_now ? 'Open' : 'Closed'}
              </span>
            )}
            </div>
            </div>

        <div className="flex items-center ml-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            →
          </div>
        </div>
    </div>
    </a>
  );
};

export default CountryInfo; 