import axios from 'axios';
import { mockCountryData } from '../data/mockCountryData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'your_openweathermap_api_key';
const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_API_KEY || 'your_exchangerate_api_key';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hava durumu verilerini getir
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    
    return {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed),
      location: `${city}, ${response.data.sys.country}`,
      icon: response.data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Hata durumunda varsayılan veri döndür
    return null;
  }
};

// Döviz kuru verilerini getir
const fetchCurrencyData = async (currencyCode) => {
  try {
    const response = await axios.get(
      `https://open.er-api.com/v6/latest/USD`
    );
    
    const rate = response.data.rates[currencyCode];
    
    if (!rate) {
      throw new Error(`Currency rate not found for ${currencyCode}`);
    }
    
    const currencyInfo = {
      TRY: { name: 'Turkish Lira', symbol: '₺' },
      AZN: { name: 'Azerbaijani Manat', symbol: '₼' },
      USD: { name: 'US Dollar', symbol: '$' },
      EUR: { name: 'Euro', symbol: '€' },
      GBP: { name: 'British Pound', symbol: '£' }
    };
    
    return {
      name: currencyInfo[currencyCode]?.name || currencyCode,
      code: currencyCode,
      symbol: currencyInfo[currencyCode]?.symbol || currencyCode,
      exchangeRate: rate.toFixed(2),
      lastUpdated: new Date(response.data.time_last_update_utc).toLocaleDateString()
    };
  } catch (error) {
    console.error('Error fetching currency data:', error);
    // Hata durumunda varsayılan veri döndür
    return null;
  }
};

// Ülke verilerini getir
export const fetchCountryData = async (countryName, category) => {
  try {
    console.log(`Fetching data for ${countryName}, category: ${category}`);
    
    let countryData;
    
    // Ülkeye göre veri hazırla
    if (countryName === 'Azerbaijan') {
      countryData = {
        ...mockCountryData,
        name: "Azerbaijan",
        capital: "Baku",
        population: "10 million",
        language: "Azerbaijani",
        travelTips: {
          ...mockCountryData.travelTips,
          visa: {
            required: true,
            info: "Most visitors need to obtain an e-Visa before arrival through the ASAN Visa system."
          },
          bestTimeToVisit: "Spring (April to June) and Fall (September to October) offer the most pleasant weather."
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
        }
      };
      
      // Gerçek hava durumu verilerini getir
      try {
        const weatherData = await fetchWeatherData('Baku');
        if (weatherData) {
          countryData.weather = weatherData;
        }
      } catch (error) {
        console.error('Error fetching weather for Baku:', error);
      }
      
      // Gerçek döviz kuru verilerini getir
      try {
        const currencyData = await fetchCurrencyData('AZN');
        if (currencyData) {
          countryData.currency = currencyData;
        }
      } catch (error) {
        console.error('Error fetching currency for AZN:', error);
      }
      
    } else if (countryName === 'United Kingdom') {
      countryData = {
        ...mockCountryData,
        name: "United Kingdom",
        capital: "London",
        population: "68 million",
        language: "English",
        weather: {
          temperature: 15,
          description: "Cloudy with occasional rain",
          humidity: 80,
          wind: 20,
          location: "London, United Kingdom"
        },
        currency: {
          name: "British Pound",
          code: "GBP",
          symbol: "£",
          exchangeRate: 0.82,
          lastUpdated: "2023-10-15"
        },
        travelTips: {
          visa: {
            required: false,
            info: "EU citizens don't need a visa for visits under 90 days. Other nationalities may need a visa."
          },
          bestTimeToVisit: "May to September offers the warmest weather, though rain is possible year-round.",
          localSim: "SIM cards are available from providers like EE, Vodafone, O2, and Three at airports and shops.",
          safety: "The UK is generally safe for tourists, but be aware of pickpocketing in crowded tourist areas and city centers.",
          emergencyContacts: {
            "Emergency": "999",
            "Police (non-emergency)": "101",
            "NHS Health (non-emergency)": "111"
          }
        },
        foodDrink: {
          traditionalDishes: [
            {
              name: "Fish and Chips",
              description: "Battered fish (usually cod or haddock) served with chips and often accompanied by mushy peas."
            },
            {
              name: "Full English Breakfast",
              description: "A hearty breakfast including eggs, bacon, sausages, baked beans, toast, and grilled tomatoes."
            },
            {
              name: "Sunday Roast",
              description: "Roasted meat (beef, chicken, lamb or pork) served with roast potatoes, vegetables, Yorkshire pudding and gravy."
            }
          ],
          drinks: [
            {
              name: "Tea",
              description: "Britain's national drink, typically served with milk and sometimes sugar."
            },
            {
              name: "Real Ale",
              description: "Traditional cask-conditioned beer served in pubs throughout the country."
            }
          ],
          restaurants: [
            {
              name: "The Ivy",
              cuisine: "British",
              priceRange: "$$$$",
              address: "5 West St, London WC2H 9NQ",
              recommendation: "Iconic British restaurant with classic dishes."
            },
            {
              name: "Gordon Ramsay Restaurant",
              cuisine: "Fine Dining",
              priceRange: "$$$$",
              address: "68 Royal Hospital Rd, London SW3 4HP",
              recommendation: "World-class dining experience from celebrity chef Gordon Ramsay."
            }
          ]
        },
        transportation: {
          publicTransport: {
            options: [
              "London Underground (Tube) - Extensive subway system in London",
              "National Rail - Train network connecting cities across the UK",
              "Buses - Comprehensive bus services in cities and rural areas",
              "Black Cabs - Iconic taxis in London, other taxi services available elsewhere"
            ],
            paymentMethods: [
              "Oyster Card in London",
              "Contactless payment on most services",
              "Cash (less common now)",
              "Mobile tickets via apps"
            ],
            tips: "The Oyster card or contactless payment card is the easiest way to pay for travel in London. For intercity travel, booking train tickets in advance is usually cheaper."
          },
          drivingTips: [
            "Drive on the left side of the road",
            "Roundabouts are very common - give way to vehicles from the right",
            "Distances are measured in miles, not kilometers",
            "Parking in cities can be expensive and difficult to find"
          ]
        },
        cultureEvents: {
          attractions: [
            {
              name: "British Museum",
              description: "World-famous museum of human history, art, and culture with a collection of over 8 million works.",
              openingHours: "10:00-17:00 daily",
              entryFee: "Free (donations welcome)"
            },
            {
              name: "Tower of London",
              description: "Historic castle on the north bank of the River Thames, home to the Crown Jewels.",
              openingHours: "9:00-16:30 in winter, 9:00-17:30 in summer",
              entryFee: "£29.90 for adults"
            },
            {
              name: "Buckingham Palace",
              description: "The London residence and administrative headquarters of the monarch of the United Kingdom.",
              openingHours: "State Rooms open to visitors typically July-September",
              entryFee: "£30 for adults during summer opening"
            }
          ],
          festivals: [
            {
              name: "Notting Hill Carnival",
              date: "August Bank Holiday weekend",
              description: "Europe's biggest street festival celebrating Caribbean culture with music, dancing, and food."
            },
            {
              name: "Edinburgh Festival Fringe",
              date: "August",
              description: "The world's largest arts festival featuring thousands of performances."
            }
          ],
          etiquette: [
            "Queuing (standing in line) is taken seriously - don't cut in line",
            "Saying 'please' and 'thank you' is important in British culture",
            "Tipping around 10-15% is customary in restaurants if service isn't included",
            "British people value personal space and may be reserved with strangers initially"
          ]
        }
      };
      
      // Gerçek hava durumu verilerini getir
      try {
        const weatherData = await fetchWeatherData('London');
        if (weatherData) {
          countryData.weather = weatherData;
        }
      } catch (error) {
        console.error('Error fetching weather for London:', error);
      }
      
      // Gerçek döviz kuru verilerini getir
      try {
        const currencyData = await fetchCurrencyData('GBP');
        if (currencyData) {
          countryData.currency = currencyData;
        }
      } catch (error) {
        console.error('Error fetching currency for GBP:', error);
      }
      
    } else {
      // Diğer ülkeler için varsayılan veri
      countryData = { ...mockCountryData };
      
      // Gerçek hava durumu verilerini getir (varsayılan olarak London)
      try {
        const weatherData = await fetchWeatherData('London');
        if (weatherData) {
          countryData.weather = weatherData;
        }
      } catch (error) {
        console.error('Error fetching weather for London:', error);
      }
      
      // Gerçek döviz kuru verilerini getir (varsayılan olarak EUR)
      try {
        const currencyData = await fetchCurrencyData('EUR');
        if (currencyData) {
          countryData.currency = currencyData;
        }
      } catch (error) {
        console.error('Error fetching currency for EUR:', error);
      }
    }
    
    return countryData;
    
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};

// Ülke arama
export const searchCountries = async (query) => {
  try {
    // API bağlantısı yoksa örnek veri döndür (geliştirme için)
    // Gerçek uygulamada bu kısmı kaldırın
    const mockData = [
      { name: 'Azerbaijan', code: 'AZ', capital: 'Baku' },
      { name: 'United Kingdom', code: 'GB', capital: 'London' }
    ];
    
    // Arama sorgusu ile filtreleme yap
    const filteredData = mockData.filter(country => {
      // Tam eşleşme kontrolü
      if (country.code.toLowerCase() === query.toLowerCase()) {
        return true;
      }
      
      // Kısmi eşleşme kontrolü
      if (query.toLowerCase() === 'uk' || query.toLowerCase() === 'gb') {
        return country.code.toLowerCase() === 'gb';
      }
      
      // Normal filtreleme
      return country.name.toLowerCase().includes(query.toLowerCase()) || 
             country.code.toLowerCase().includes(query.toLowerCase()) ||
             country.capital.toLowerCase().includes(query.toLowerCase());
    });
    
    return filteredData;
    
    // Gerçek API çağrısı (şu an devre dışı)
    // const response = await api.get('/countries/search', {
    //   params: { query },
    // });
    // return response.data;
  } catch (error) {
    console.error('Error searching countries:', error);
    throw error;
  }
};

// Tüm ülkeleri getir
export const fetchAllCountries = async () => {
  try {
    const response = await api.get('/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

export default api; 