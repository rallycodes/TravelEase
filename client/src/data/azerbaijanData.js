export const azerbaijanData = {
  name: "Azerbaijan",
  capital: "Baku",
  population: "10 million",
  language: "Azerbaijani",
  
  weather: {
    temperature: 22,
    description: "Mostly sunny",
    humidity: 55,
    wind: 10,
    location: "Baku, Azerbaijan"
  },
  
  currency: {
    name: "Azerbaijani Manat",
    code: "AZN",
    symbol: "₼",
    exchangeRate: 1.7,
    lastUpdated: "2023-10-15",
    exchangeRates: {
      "USD": 1.70,
      "EUR": 1.85
    },
    info: "The Azerbaijani Manat (₼) is the local currency. Credit cards are widely accepted in cities, but keep cash for rural areas."
  },
  
  travelTips: {
    visa: {
      required: false,
      info: "Many European citizens can enter Azerbaijan visa-free for 90 days. Others may need to apply in advance."
    },
    bestTimeToVisit: "April to June and September to October offer the most pleasant weather for exploring Azerbaijan.",
    localSim: "SIM cards are available from providers like Azercell, Bakcell, and Nar at the airport and mobile stores.",
    safety: "Azerbaijan is generally safe for tourists. Exercise normal precautions and be aware of your surroundings.",
    emergencyContacts: {
      "Police": "102",
      "Ambulance": "103",
      "Fire": "101",
      "Tourist Police": "+994 12 404 0285"
    },
    accommodation: "Book accommodations 2-3 months in advance, especially during peak tourist season (summer months)."
  },
  
  foodDrink: {
    traditionalDishes: [
      {
        name: "Plov",
        description: "Azerbaijan's national dish - rice cooked with meat, herbs, and dried fruits."
      },
      {
        name: "Dolma",
        description: "Stuffed vine leaves or vegetables filled with minced meat and rice."
      },
      {
        name: "Qutab",
        description: "Thin flatbread filled with meat, cheese, or pumpkin, then folded and cooked."
      }
    ],
    drinks: [
      {
        name: "Azerbaijani Tea",
        description: "Strong black tea served with jam or sugar cubes, an essential part of Azerbaijani hospitality."
      },
      {
        name: "Sherbet",
        description: "A sweet cold drink made from fruit juices and sugar."
      }
    ],
    restaurants: [
      {
        name: "Firuze",
        cuisine: "Traditional Azerbaijani",
        priceRange: "$$$",
        address: "Khagani St 14, Baku",
        recommendation: "Try their plov and traditional kebabs."
      },
      {
        name: "Nakhchivan",
        cuisine: "Regional Azerbaijani",
        priceRange: "$$",
        address: "Rashid Behbudov St, Baku",
        recommendation: "Known for authentic regional dishes from Nakhchivan."
      }
    ]
  },
  
  transportation: {
    publicTransport: {
      description: "Baku has a well-developed public transportation system including metro, buses, and taxis.",
      options: [
        {
          type: "metro",
          name: "Metro",
          info: "Baku has a clean, efficient metro system reaching major parts of the city.",
          fare: "0.5 ₼ per trip"
        },
        {
          type: "bus",
          name: "Bus",
          info: "Buses cover routes throughout the city and to suburbs.",
          fare: "0.3 ₼ per trip"
        }
      ]
    },
    taxi: {
      description: "Affordable taxis and car rental services in the city. Get special discounts on your first ride.",
      apps: [
        {
          name: "Bolt",
          info: "Recommended",
          services: ["Taxi", "Fast Delivery", "E-Scooter"]
        },
        {
          name: "Uber",
          info: "Available in Baku"
        }
      ]
    },
    carRental: {
      description: "Explore Azerbaijan at your own pace with a rental car. International driving licenses are accepted.",
      options: [
        {
          name: "Hertz",
          priceFrom: "$35/day"
        },
        {
          name: "Avis",
          priceFrom: "$40/day"
        },
        {
          name: "Local Rentals",
          priceFrom: "$25/day"
        }
      ],
      tips: [
        "Traffic in Baku can be congested during rush hours.",
        "Parking in city centers can be difficult to find.",
        "Road conditions outside major cities may vary."
      ]
    }
  },
  
  cultureEvents: {
    attractions: [
      {
        name: "Maiden Tower",
        description: "12th-century monument in the Old City of Baku, offering panoramic views of the city and Caspian Sea.",
        type: "UNESCO World Heritage",
        openingHours: "Open 24 hours (public area)",
        entryFee: "15 ₼",
        status: "Open Today"
      },
      {
        name: "Heydar Aliyev Center",
        description: "Distinctive landmark of modern architecture designed by Zaha Hadid, hosting exhibitions and cultural events.",
        type: "Modern Architecture",
        openingHours: "11:00 AM - 7:00 PM, closed on Mondays",
        entryFee: "12 ₼",
        status: "Open Today"
      }
    ],
    festivals: [
      {
        name: "Baku Jazz Festival",
        date: "Jun 24 - Jul 2, 2023",
        description: "Annual international jazz festival featuring performances across the city."
      },
      {
        name: "Gobustan Rock Art Festival",
        date: "Aug 15 - Aug 16, 2023",
        description: "Cultural celebration at the ancient rock art site with music and traditional performances."
      },
      {
        name: "Novruz Bayram",
        date: "March (Spring Equinox)",
        description: "Traditional New Year celebration with cultural performances, special foods, and festivities."
      }
    ],
    etiquette: [
      "Azerbaijanis are known for their hospitality. If invited to someone's home, bringing a small gift is appreciated.",
      "Dress modestly when visiting religious sites.",
      "Remove shoes before entering someone's home if you notice shoes by the door.",
      "Respect local customs and traditions, especially during religious holidays."
    ]
  }
};