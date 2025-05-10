import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="mb-8">
          <FaCompass className="mx-auto text-blue-500 text-6xl animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          It seems you've ventured off the VisitEase map. The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Go Home
          </Link>
          
          <Link 
            to="/map" 
            className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center"
          >
            <FaCompass className="mr-2" /> Explore Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;