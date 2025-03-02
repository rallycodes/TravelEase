import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaGlobe, FaUser, FaBars } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <FaGlobe className="text-blue-600 text-2xl" />
              <span className="text-xl font-bold text-gray-800">TravelEase</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/map" className="text-gray-700 hover:text-blue-600 font-medium">Explore Map</Link>
              <Link to="/destinations" className="text-gray-700 hover:text-blue-600 font-medium">Destinations</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
              
              {/* Country Search Bar */}
              <SearchBar 
                placeholder="Search countries..." 
                className="w-48 bg-gray-100 hover:bg-gray-200 focus:bg-white"
              />
            </nav>
            
            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 py-3 border-t border-gray-100">
              <nav className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                <Link to="/map" className="text-gray-700 hover:text-blue-600 font-medium">Explore Map</Link>
                <Link to="/destinations" className="text-gray-700 hover:text-blue-600 font-medium">Destinations</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
                
                <SearchBar 
                  placeholder="Search countries..." 
                  className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white"
                />
                
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                  Sign In
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Discover the world with TravelEase</h1>
            <p className="text-lg text-gray-600 mb-6">
              TravelEase helps you explore destinations with interactive maps, local recommendations, and cultural insights.
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                to="/map" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center"
              >
                <FaMapMarkedAlt className="mr-2" /> Explore Map
              </Link>
              <button className="bg-blue-700 text-light px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                Popular Destinations
              </button>
            </div>
          </div>
        </section>
        
        {/* Featured Destinations */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Featured Destination Cards */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-48 bg-gray-200">
                  <img 
                    src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fb/6a/azerbaijan.jpg?w=1400&h=1400&s=1' 
                    alt='Azerbaijan'
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">Azerbaijan</h3>
                  <p className="text-gray-700 mb-3">Discover the vibrant blend of East and West in this fascinating Caucasus country.</p>
                  <Link to="/map" className="text-blue-600 font-medium hover:underline">Explore →</Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-48 bg-gray-200"><img 
                    src='https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/reasons-to-visit-the-uk-1531732471-785X440.jpg' 
                    alt='Azerbaijan'
                    className="w-full h-full object-cover" 
                  /></div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">United Kingdom</h3>
                  <p className="text-gray-700 mb-3">Experience the rich history and diverse landscapes of this iconic island nation.</p>
                  <Link to="/map" className="text-blue-600 font-medium hover:underline">Explore →</Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">Coming Soon</h3>
                  <p className="text-gray-700 mb-3">More destinations are being added to our interactive guide. Stay tuned!</p>
                  <span className="text-gray-400 font-medium">Available Soon →</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Travel Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkedAlt className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Maps</h3>
                <p className="text-gray-600">Explore destinations with our detailed interactive maps and discover points of interest.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Tips</h3>
                <p className="text-gray-600">Get insider information and travel tips from locals and experienced travelers.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaGlobe className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Worldwide Coverage</h3>
                <p className="text-gray-600">Our guide is constantly growing, with new destinations being added regularly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TravelEase</h3>
              <p className="text-gray-400">Your interactive guide to exploring the world's most fascinating destinations.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/map" className="text-gray-400 hover:text-white">Explore Map</Link></li>
                <li><Link to="/destinations" className="text-gray-400 hover:text-white">Destinations</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-3">Stay updated with our latest destinations and features.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-lg w-full text-gray-800" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">Send</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TravelEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 