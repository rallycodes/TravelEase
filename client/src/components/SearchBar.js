import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ className, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Use useMemo to memoize the countries array
  const countries = useMemo(() => [
    { id: 1, name: "Azerbaijan", region: "Caucasus" },
    { id: 2, name: "United Kingdom", region: "Western Europe" },
    // More countries will be added as they become available
    { id: 3, name: "Turkey", region: "Eurasia", disabled: true },
    { id: 4, name: "France", region: "Western Europe", disabled: true },
    { id: 5, name: "Germany", region: "Central Europe", disabled: true },
    { id: 6, name: "Italy", region: "Southern Europe", disabled: true },
    { id: 7, name: "Spain", region: "Southern Europe", disabled: true }
  ], []); // Empty dependency array as this list is static
  
  // Filter countries based on search query
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.region.toLowerCase().includes(query.toLowerCase())
    );
    
    setResults(filtered);
  }, [query, countries]); // Add countries to the dependency array
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle country selection
  const handleCountrySelect = (country) => {
    if (country.disabled) {
      // Show a message that this country is coming soon
      alert(`${country.name} will be available soon!`);
      return;
    }
    
    setQuery('');
    setShowResults(false);
    navigate('/map', { state: { selectedCountry: country.name } });
  };
  
  // Clear search input
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <div className={`flex items-center rounded-lg border border-gray-300 overflow-hidden ${className}`}>
        <FaSearch className="text-gray-400 ml-3" />
        
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="px-3 py-2 w-full outline-none bg-transparent"
        />
        
        {query && (
          <button 
            onClick={clearSearch} 
            className="text-gray-400 hover:text-gray-600 mr-2"
          >
            <FaTimes />
          </button>
        )}
      </div>
      
      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {results.map(country => (
            <button
              key={country.id}
              onClick={() => handleCountrySelect(country)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between
                ${country.disabled ? 'opacity-70' : ''}`}
            >
              <div>
                <div className="font-medium">{country.name}</div>
                <div className="text-xs text-gray-500">{country.region}</div>
              </div>
              
              {country.disabled && (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      
      {showResults && query && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          No countries found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar; 