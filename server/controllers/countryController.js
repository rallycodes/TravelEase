const Country = require('../models/Country');
const { getWeatherData } = require('../services/weatherService');
const { getCurrencyRates } = require('../services/currencyService');

// Tüm ülkeleri getir
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find({}, 'name code continent capital');
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Ülkeler getirilirken hata oluştu', error: error.message });
  }
};

// Belirli bir ülkeyi getir
exports.getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const country = await Country.findOne({ 
      $or: [
        { name: { $regex: new RegExp(name, 'i') } },
        { 'name': { $regex: new RegExp(name, 'i') } }
      ]
    });

    if (!country) {
      return res.status(404).json({ message: 'Ülke bulunamadı' });
    }

    // Kategori filtreleme
    const { category } = req.query;
    let result = { ...country.toObject() };

    if (category) {
      switch (category) {
        case 'travel-tips':
          result = {
            name: country.name,
            code: country.code,
            capital: country.capital,
            currency: country.currency,
            travelTips: country.travelTips
          };
          
          // Güncel hava durumu bilgisini ekle
          try {
            const weatherData = await getWeatherData(country.capital);
            result.currentWeather = weatherData;
          } catch (weatherError) {
            console.error('Hava durumu verisi alınamadı:', weatherError);
          }
          
          // Güncel döviz kuru bilgisini ekle
          try {
            const currencyRates = await getCurrencyRates(country.currency.code);
            result.currentCurrencyRates = currencyRates;
          } catch (currencyError) {
            console.error('Döviz kuru verisi alınamadı:', currencyError);
          }
          
          break;
        case 'food-drink':
          result = {
            name: country.name,
            foodAndDrink: country.foodAndDrink
          };
          break;
        case 'transportation':
          result = {
            name: country.name,
            transportation: country.transportation
          };
          break;
        case 'culture-events':
          result = {
            name: country.name,
            cultureAndEvents: country.cultureAndEvents
          };
          break;
        case 'deals-promotions':
          result = {
            name: country.name,
            dealsAndPromotions: country.dealsAndPromotions
          };
          break;
        case 'sim-communication':
          result = {
            name: country.name,
            simCardAndCommunication: country.simCardAndCommunication
          };
          break;
        case 'currency-exchange':
          result = {
            name: country.name,
            currencyExchange: country.currencyExchange
          };
          
          // Güncel döviz kuru bilgisini ekle
          try {
            const currencyRates = await getCurrencyRates(country.currency.code);
            result.currentCurrencyRates = currencyRates;
          } catch (currencyError) {
            console.error('Döviz kuru verisi alınamadı:', currencyError);
          }
          
          break;
        case 'local-regulations':
          result = {
            name: country.name,
            localRegulations: country.localRegulations
          };
          break;
        case 'visa-immigration':
          result = {
            name: country.name,
            visaAndImmigration: country.visaAndImmigration
          };
          break;
        case 'regional-festivals':
          result = {
            name: country.name,
            regionalFestivals: country.regionalFestivals
          };
          break;
        case 'user-recommendations':
          result = {
            name: country.name,
            userRecommendations: country.userRecommendations
          };
          break;
        default:
          // Kategori belirtilmemişse tüm veriyi döndür
          break;
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Ülke bilgisi getirilirken hata oluştu', error: error.message });
  }
};

// Ülke ara
exports.searchCountries = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Arama sorgusu gerekli' });
    }
    
    const countries = await Country.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { capital: { $regex: new RegExp(query, 'i') } }
      ]
    }, 'name code capital');
    
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Arama yapılırken hata oluştu', error: error.message });
  }
};

// Yeni ülke ekle (admin için)
exports.createCountry = async (req, res) => {
  try {
    const newCountry = new Country(req.body);
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (error) {
    res.status(400).json({ message: 'Ülke eklenirken hata oluştu', error: error.message });
  }
};

// Ülke bilgilerini güncelle (admin için)
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCountry) {
      return res.status(404).json({ message: 'Ülke bulunamadı' });
    }
    
    res.json(updatedCountry);
  } catch (error) {
    res.status(400).json({ message: 'Ülke güncellenirken hata oluştu', error: error.message });
  }
};