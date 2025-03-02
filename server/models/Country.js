const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  continent: {
    type: String,
    required: true
  },
  capital: {
    type: String,
    required: true
  },
  currency: {
    code: String,
    name: String,
    symbol: String
  },
  language: [{
    code: String,
    name: String
  }],
  travelTips: {
    visa: {
      required: Boolean,
      info: String
    },
    bestTimeToVisit: String,
    localSim: String,
    safety: String,
    emergencyContacts: {
      police: String,
      ambulance: String,
      embassy: String
    },
    weather: String
  },
  foodAndDrink: {
    localCuisine: [String],
    popularRestaurants: [{
      name: String,
      location: String,
      cuisine: String,
      priceRange: String,
      rating: Number,
      affiliateLink: String
    }],
    streetFood: [String],
    drinks: [String]
  },
  transportation: {
    publicTransport: {
      info: String,
      cost: String,
      options: [String]
    },
    taxi: {
      info: String,
      apps: [String],
      estimatedCosts: String
    },
    carRental: {
      info: String,
      requirements: [String],
      affiliateLinks: [String]
    }
  },
  cultureAndEvents: {
    traditions: [String],
    festivals: [{
      name: String,
      date: String,
      description: String
    }],
    museums: [{
      name: String,
      location: String,
      description: String,
      entryFee: String
    }],
    historicalSites: [{
      name: String,
      location: String,
      description: String,
      entryFee: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Güncellenme tarihini otomatik güncelle
countrySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Country', countrySchema); 