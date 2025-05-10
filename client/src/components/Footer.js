import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaGlobe className="text-blue-400 text-2xl" />
              <span className="text-xl font-bold">VisitEase</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your interactive guide to exploring the world's most fascinating destinations.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/map" className="text-gray-400 hover:text-white text-sm">Explore Map</Link></li>
              <li><Link to="/destinations" className="text-gray-400 hover:text-white text-sm">Destinations</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-3">Stay updated with our latest destinations and features.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-l-lg w-full text-gray-800 text-sm" 
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition text-sm">
                Send
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p className="text-sm">&copy; {new Date().getFullYear()} VisitEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;