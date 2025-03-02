import React, { useState, useEffect, useRef } from 'react';

const Chatbot = ({ selectedCountry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Bot initial message
  useEffect(() => {
    if (selectedCountry) {
      setMessages([
        {
          id: 1,
          text: `Hello! You can ask me anything about ${selectedCountry}.`,
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedCountry]);
  
  // Scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: userInput,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    
    try {
      // Normally, here we would make an API call
      // For now, let's simulate it
      setTimeout(() => {
        let botResponse;
        
        if (userInput.toLowerCase().includes('visa')) {
          botResponse = `Visa processing for ${selectedCountry} typically takes 7-14 business days. You'll need your passport, photos, and travel itinerary for the visa application.`;
        } else if (userInput.toLowerCase().includes('weather') || userInput.toLowerCase().includes('climate')) {
          botResponse = `${selectedCountry}'s climate varies seasonally. Summers are typically warm, and winters can be cold. I recommend checking the weather forecast before your trip.`;
        } else if (userInput.toLowerCase().includes('money') || userInput.toLowerCase().includes('currency')) {
          botResponse = `${selectedCountry === 'Azerbaijan' ? 'Azerbaijani Manat (AZN)' : 'British Pound (GBP)'} is the local currency. Credit cards are widely accepted in major cities.`;
        } else if (userInput.toLowerCase().includes('food') || userInput.toLowerCase().includes('restaurant')) {
          botResponse = `${selectedCountry} has many delicious local dishes to try. Feel free to ask for specific restaurant recommendations.`;
        } else {
          botResponse = `If you have more questions about ${selectedCountry}, please feel free to ask. I'm happy to help!`;
        }
        
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Error message
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I cannot respond right now. Please try again later.',
        isBot: true,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  
  // Send message with Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-10">
      {/* Chatbot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Travel Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Message list */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>Get information about countries with the Travel Assistant</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot 
                        ? 'bg-white text-gray-800 shadow-sm mr-auto' 
                        : 'bg-blue-600 text-white ml-auto'
                    } ${message.isError ? 'bg-red-100 text-red-600' : ''}`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                ))}
                {isLoading && (
                  <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-800 shadow-sm mr-auto">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Message input area */}
          <div className="p-3 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask something about ${selectedCountry || 'countries'}...`}
                className="flex-1 border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isLoading}
                className={`bg-blue-600 text-white rounded-r-full px-4 py-2 ${
                  !userInput.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 