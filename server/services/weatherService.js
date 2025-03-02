const axios = require('axios');

// OpenWeatherMap API anahtarı
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Belirtilen şehir için hava durumu verilerini getirir
 * @param {string} city - Şehir adı
 * @returns {Promise<Object>} - Hava durumu verileri
 */
exports.getWeatherData = async (city) => {
  try {
    // API anahtarı yoksa hata fırlat
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY çevre değişkeni tanımlanmamış');
    }

    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric', // Celsius cinsinden sıcaklık
        lang: 'tr' // Türkçe açıklamalar
      }
    });

    // Yanıttan gerekli verileri çıkar
    const { main, weather } = response.data;
    
    return {
      temperature: Math.round(main.temp),
      feelsLike: Math.round(main.feels_like),
      humidity: main.humidity,
      description: weather[0].description,
      icon: weather[0].icon
    };
  } catch (error) {
    console.error('Hava durumu verileri alınırken hata:', error.message);
    
    // API hatası durumunda daha anlamlı hata mesajı
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Hava durumu API hatası: ${status} - ${data.message || 'Bilinmeyen hata'}`);
    }
    
    throw error;
  }
}; 