const axios = require('axios');

// ExchangeRate-API anahtarı
const CURRENCY_API_KEY = process.env.CURRENCY_API_KEY;
const CURRENCY_API_URL = 'https://v6.exchangerate-api.com/v6';

/**
 * Belirtilen para birimi için döviz kurlarını getirir
 * @param {string} baseCurrency - Baz para birimi kodu (örn. USD, EUR)
 * @returns {Promise<Object>} - Döviz kurları
 */
exports.getCurrencyRates = async (baseCurrency) => {
  try {
    // API anahtarı yoksa hata fırlat
    if (!CURRENCY_API_KEY) {
      throw new Error('CURRENCY_API_KEY çevre değişkeni tanımlanmamış');
    }

    // Varsayılan olarak USD kullan
    const currency = baseCurrency || 'USD';
    
    const response = await axios.get(`${CURRENCY_API_URL}/${CURRENCY_API_KEY}/latest/${currency}`);
    
    // API yanıtı başarılı değilse hata fırlat
    if (response.data.result !== 'success') {
      throw new Error(`Döviz kuru API hatası: ${response.data.error || 'Bilinmeyen hata'}`);
    }
    
    // Sadece popüler para birimlerini döndür
    const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'TRY', 'AUD', 'CAD', 'CHF'];
    const filteredRates = {};
    
    popularCurrencies.forEach(code => {
      if (code !== currency && response.data.conversion_rates[code]) {
        filteredRates[code] = response.data.conversion_rates[code];
      }
    });
    
    return filteredRates;
  } catch (error) {
    console.error('Döviz kuru verileri alınırken hata:', error.message);
    
    // API hatası durumunda daha anlamlı hata mesajı
    if (error.response) {
      const { status, data } = error.response;
      throw new Error(`Döviz kuru API hatası: ${status} - ${JSON.stringify(data)}`);
    }
    
    throw error;
  }
}; 