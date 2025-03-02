import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About TravelEase</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              TravelEase is dedicated to making travel planning easier and more enjoyable. 
              We provide interactive maps, local insights, and practical information to help 
              travelers explore new destinations with confidence.
            </p>
            <p className="text-gray-600">
              Our goal is to connect travelers with authentic experiences and hidden gems that 
              might otherwise be missed, while providing all the essential information needed 
              for a successful trip.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">What Makes Us Different</h2>
            <ul className="space-y-2 text-gray-600 list-disc pl-5">
              <li>Interactive maps that highlight the best places in each destination</li>
              <li>Curated recommendations from locals and experienced travelers</li>
              <li>Practical information on transportation, food, and accommodation</li>
              <li>Cultural insights to help you understand and respect local customs</li>
              <li>Regularly updated content to ensure accuracy</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Our Team</h2>
            <p className="text-gray-600 mb-4">
              TravelEase was founded by a team of passionate travelers and technology enthusiasts 
              who wanted to create the travel planning tool they always wished existed.
            </p>
            <p className="text-gray-600">
              Our diverse team includes travel writers, developers, UX designers, and local experts 
              from around the world, all working together to create the best possible travel resource.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Get In Touch</h2>
            <p className="text-gray-600 mb-4">
              We love hearing from our users! If you have any questions, suggestions, or just want 
              to share your travel experiences, please don't hesitate to reach out.
            </p>
            <Link to="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 