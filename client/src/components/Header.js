import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGlobe, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './SearchBar';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaGlobe className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">VisitEase</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/map" 
              className={`text-sm font-medium ${isActive('/map') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Explore Map
            </Link>
            <Link 
              to="/destinations" 
              className={`text-sm font-medium ${isActive('/destinations') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Destinations
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              About
            </Link>
          </nav>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-48">
              <SearchBar 
                placeholder="Search countries..." 
                className="bg-gray-100 hover:bg-gray-200 focus:bg-white text-sm py-1"
              />
            </div>
            <button className="text-gray-700 hover:text-blue-600">
              <FaUser className="text-xl" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
              Sign In
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-sm font-medium ${isActive('/') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/map" 
                className={`text-sm font-medium ${isActive('/map') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Map
              </Link>
              <Link 
                to="/destinations" 
                className={`text-sm font-medium ${isActive('/destinations') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium ${isActive('/about') ? 'text-blue-600' : 'text-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            
            <div className="mt-4 flex flex-col space-y-3">
              <SearchBar 
                placeholder="Search countries..." 
                className="bg-gray-100 hover:bg-gray-200 focus:bg-white text-sm py-1"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm w-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;