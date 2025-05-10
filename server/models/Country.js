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
  dealsAndPromotions: {
    flightDeals: [{
      title: String,
      description: String,
      provider: String,
      discountPercentage: Number,
      validUntil: Date,
      affiliateLink: String
    }],
    restaurantDiscounts: [{
      restaurantName: String,
      description: String,
      discountPercentage: Number,
      validUntil: Date,
      affiliateLink: String
    }],
    cityPasses: [{
      name: String,
      description: String,
      price: String,
      validityPeriod: String,
      inclusions: [String],
      affiliateLink: String
    }],
    couponCodes: [{
      code: String,
      description: String,
      validFor: String,
      validUntil: Date,
      affiliateLink: String
    }]
  },
  simCardAndCommunication: {
    localOperators: [{
      name: String,
      description: String,
      coverage: String,
      websiteUrl: String
    }],
    purchaseLocations: [String],
    touristPlans: [{
      operatorName: String,
      planName: String,
      data: String,
      validity: String,
      price: String,
      features: [String]
    }],
    airportPurchaseInfo: String,
    internetCoverage: String
  },
  currencyExchange: {
    recommendedExchangeLocations: [{
      name: String,
      type: String, // bank, exchange office, etc.
      location: String,
      rateQuality: String, // good, average, poor
      notes: String
    }],
    atmInfo: {
      commonBanks: [String],
      commissionRates: String,
      withdrawalLimits: String,
      securityTips: String
    },
    cardPaymentInfo: {
      acceptance: String, // widespread, limited, etc.
      commonCardTypes: [String],
      foreignTransactionFees: String,
      tips: String
    },
    cashHandlingTips: String
  },
  localRegulations: {
    alcoholRules: String,
    smokingRules: String,
    dressCodes: String,
    photographyRestrictions: String,
    importRestrictions: String,
    culturalEtiquette: [{
      situation: String,
      doThis: String,
      avoidThis: String
    }],
    commonMistakes: [{
      mistake: String,
      consequence: String,
      howToAvoid: String
    }]
  },
  visaAndImmigration: {
    visaTypes: [{
      type: String,
      eligibility: String,
      duration: String,
      cost: String,
      processingTime: String
    }],
    applicationProcess: {
      steps: [String],
      requiredDocuments: [String],
      whereToApply: String,
      onlineApplication: String
    },
    extensionProcess: String,
    specialConditions: {
      workPermits: String,
      residencePermits: String,
      studentVisas: String
    },
    entryRequirements: String
  },
  regionalFestivals: [{
    name: String,
    type: String, // cultural, music, food, etc.
    date: String,
    location: String,
    description: String,
    ticketInfo: String,
    localSignificance: String,
    touristExperience: String,
    photos: [String]
  }],
  userRecommendations: [{
    userNickname: String,
    date: Date,
    rating: Number,
    title: String,
    content: String,
    category: String, // attraction, restaurant, etc.
    helpfulCount: Number,
    photos: [String],
    tips: [String]
  }],
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