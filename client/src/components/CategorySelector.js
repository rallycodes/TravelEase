import React from 'react';
import { FaUtensils, FaCar, FaLandmark, FaHotel, FaInfoCircle, FaPercent, FaMobileAlt, FaExchangeAlt, FaBalanceScale, FaPassport, FaCalendarAlt, FaComments } from 'react-icons/fa';

const CategorySelector = ({ onCategorySelect, activeCategory }) => {
  const categories = [
    { id: 'tips', icon: <FaInfoCircle />, name: 'Travel Tips' },
    { id: 'food', icon: <FaUtensils />, name: 'Food & Drink' },
    { id: 'transport', icon: <FaCar />, name: 'Transportation' },
    { id: 'culture', icon: <FaLandmark />, name: 'Culture & Events' },
    { id: 'stays', icon: <FaHotel />, name: 'Places to Stay' },
    { id: 'deals', icon: <FaPercent />, name: 'Deals & Promotions' },
    { id: 'sim', icon: <FaMobileAlt />, name: 'SIM & Communication' },
    { id: 'currency', icon: <FaExchangeAlt />, name: 'Currency Exchange' },
    { id: 'regulations', icon: <FaBalanceScale />, name: 'Local Regulations' },
    { id: 'visa', icon: <FaPassport />, name: 'Visa & Immigration' },
    { id: 'festivals', icon: <FaCalendarAlt />, name: 'Regional Festivals' },
    { id: 'recommendations', icon: <FaComments />, name: 'User Recommendations' }
  ];

  return (
    <div className="category-selector bg-white rounded-lg shadow-sm p-3 mb-4">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`category-btn flex flex-col items-center justify-center p-2 rounded-md transition ${
              activeCategory === category.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="text-xl mb-1">{category.icon}</div>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;