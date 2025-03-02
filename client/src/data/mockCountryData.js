export const mockCountryData = {
  name: "Turkey",
  capital: "Ankara",
  population: "84 million",
  language: "Turkish",
  
  weather: {
    temperature: 25,
    description: "Sunny",
    humidity: 45,
    wind: 12,
    location: "Istanbul, Turkey"
  },
  
  currency: {
    name: "Turkish Lira",
    code: "TRY",
    symbol: "₺",
    exchangeRate: 29.5,
    lastUpdated: "2023-10-15"
  },
  
  travelTips: {
    visa: {
      required: true,
      info: "Most visitors need to obtain an e-Visa before arrival. The process is simple and can be completed online."
    },
    bestTimeToVisit: "Spring (April to May) and Autumn (September to October) offer pleasant temperatures and fewer crowds.",
    localSim: "You can purchase a local SIM card at the airport or at mobile operator stores in the city. Turkcell, Vodafone, and Türk Telekom are the main providers.",
    safety: "Turkey is generally safe for tourists, but be cautious in crowded areas and tourist spots. Avoid political demonstrations.",
    emergencyContacts: {
      "Police": "155",
      "Ambulance": "112",
      "Fire": "110",
      "Tourist Police": "0212 527 4503"
    }
  },
  
  foodDrink: {
    traditionalDishes: [
      {
        name: "Kebab",
        description: "Grilled or skewered meat dishes, often served with rice, vegetables, and bread."
      },
      {
        name: "Baklava",
        description: "Sweet pastry made of layers of filo filled with chopped nuts and sweetened with syrup or honey."
      },
      {
        name: "Meze",
        description: "Small dishes served as appetizers, including hummus, stuffed vine leaves, and eggplant salad."
      }
    ],
    drinks: [
      {
        name: "Turkish Tea (Çay)",
        description: "Strong black tea served in small tulip-shaped glasses, an essential part of Turkish culture."
      },
      {
        name: "Turkish Coffee",
        description: "Finely ground coffee beans boiled in a small pot (cezve), served unfiltered."
      },
      {
        name: "Ayran",
        description: "A cold yogurt beverage mixed with salt, popular especially in summer."
      }
    ],
    restaurants: [
      {
        name: "Mikla",
        cuisine: "Modern Turkish",
        priceRange: "$$$",
        address: "The Marmara Pera, Meşrutiyet Caddesi 15, Beyoğlu, Istanbul",
        recommendation: "Try the tasting menu for a modern take on traditional Turkish flavors."
      },
      {
        name: "Çiya Sofrası",
        cuisine: "Traditional Anatolian",
        priceRange: "$$",
        address: "Caferağa Mah, Kadıköy, Istanbul",
        recommendation: "Known for preserving ancient and regional recipes from across Turkey."
      }
    ]
  },
  
  transportation: {
    publicTransport: {
      description: "Major cities in Turkey have well-developed public transportation systems including metros, trams, buses, and ferries.",
      options: [
        {
          type: "metro",
          name: "Metro",
          info: "Available in Istanbul, Ankara, Izmir, and other major cities. Clean, efficient, and affordable."
        },
        {
          type: "bus",
          name: "Bus",
          info: "Extensive network covering most areas. Use an Istanbulkart in Istanbul for all public transport."
        },
        {
          type: "tram",
          name: "Tram",
          info: "Convenient for tourist areas in Istanbul and other cities."
        }
      ]
    },
    taxi: {
      description: "Taxis are widely available and relatively affordable. Make sure the meter is running or agree on a price beforehand.",
      apps: [
        {
          name: "BiTaksi",
          info: "Popular in Istanbul"
        },
        {
          name: "iTaksi",
          info: "Official Istanbul Municipality app"
        }
      ]
    },
    rental: {
      description: "Car rental is available in all major cities and airports. International driving license is recommended.",
      tips: [
        "Traffic in major cities can be congested and chaotic.",
        "Parking in city centers can be difficult to find.",
        "Fuel prices are relatively high compared to the US."
      ]
    }
  },
  
  cultureEvents: {
    attractions: [
      {
        name: "Hagia Sophia",
        description: "A former Greek Orthodox Christian patriarchal cathedral, later an Ottoman imperial mosque, now a museum in Istanbul.",
        openingHours: "9:00 AM - 5:00 PM, closed on Mondays",
        entryFee: "200 TL"
      },
      {
        name: "Cappadocia",
        description: "Famous for its unique rock formations, underground cities, and hot air balloon rides.",
        openingHours: "Open 24 hours (natural landscape)",
        entryFee: "Varies by specific site"
      }
    ],
    festivals: [
      {
        name: "Istanbul Film Festival",
        date: "April",
        description: "One of Turkey's most important film events, showcasing international and Turkish cinema."
      },
      {
        name: "Mevlana Whirling Dervishes Festival",
        date: "December",
        description: "Commemorates the death of Rumi with traditional Sufi ceremonies in Konya."
      }
    ],
    etiquette: [
      "Remove shoes before entering someone's home or a mosque.",
      "Dress modestly when visiting religious sites.",
      "It's customary to bring a small gift when invited to someone's home.",
      "Avoid public displays of affection, especially in conservative areas."
    ]
  }
}; 