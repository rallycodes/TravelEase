const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Country = require('../models/Country');

// Çevre değişkenlerini yükle
dotenv.config();

// Örnek ülke verileri
const sampleCountries = [
  {
    name: 'Türkiye',
    code: 'TR',
    continent: 'Asya/Avrupa',
    capital: 'Ankara',
    currency: {
      code: 'TRY',
      name: 'Türk Lirası',
      symbol: '₺'
    },
    language: [
      {
        code: 'tr',
        name: 'Türkçe'
      }
    ],
    travelTips: {
      visa: {
        required: false,
        info: 'Türk vatandaşları için vize gerekmez.'
      },
      bestTimeToVisit: 'Nisan-Haziran ve Eylül-Ekim ayları ılıman hava koşulları nedeniyle ziyaret için idealdir.',
      localSim: 'Turkcell, Vodafone ve Türk Telekom operatörlerinden SIM kart satın alabilirsiniz. Pasaport ile kayıt gereklidir.',
      safety: 'Genel olarak güvenli bir ülkedir. Turistik bölgelerde yankesicilere dikkat edilmelidir.',
      emergencyContacts: {
        police: '155',
        ambulance: '112',
        embassy: 'Ülkenizin Türkiye\'deki büyükelçiliğini arayın'
      },
      weather: 'İklim bölgelere göre değişiklik gösterir. Akdeniz kıyıları sıcak ve kuru, iç bölgeler karasal iklime sahiptir.'
    },
    foodAndDrink: {
      localCuisine: [
        'Kebaplar',
        'Döner',
        'Baklava',
        'Türk kahvesi',
        'Meze çeşitleri'
      ],
      popularRestaurants: [
        {
          name: 'Nusr-Et Steakhouse',
          location: 'İstanbul, Etiler',
          cuisine: 'Et Restoranı',
          priceRange: '₺₺₺₺',
          rating: 4.5,
          affiliateLink: 'https://example.com/nusr-et-reservation'
        },
        {
          name: 'Çiya Sofrası',
          location: 'İstanbul, Kadıköy',
          cuisine: 'Geleneksel Türk Mutfağı',
          priceRange: '₺₺',
          rating: 4.7,
          affiliateLink: 'https://example.com/ciya-reservation'
        }
      ],
      streetFood: [
        'Simit',
        'Kumpir',
        'Midye Dolma',
        'Kokoreç',
        'Balık Ekmek'
      ],
      drinks: [
        'Ayran',
        'Şalgam Suyu',
        'Rakı',
        'Türk Çayı'
      ]
    },
    transportation: {
      publicTransport: {
        info: 'Büyük şehirlerde metro, otobüs, tramvay ve vapur hizmetleri mevcuttur. İstanbulkart veya benzeri kartlar toplu taşıma için kullanılabilir.',
        cost: 'Ekonomik',
        options: [
          'Metro',
          'Otobüs',
          'Tramvay',
          'Vapur',
          'Dolmuş'
        ]
      },
      taxi: {
        info: 'Taksiler sarı renktedir ve taksimetreli çalışır. Kısa mesafeler için ekonomik bir seçenektir.',
        apps: [
          'BiTaksi',
          'Uber'
        ],
        estimatedCosts: 'Başlangıç ücreti 10₺, km başına 7₺ civarındadır.'
      },
      carRental: {
        info: 'Uluslararası ve yerel araç kiralama şirketleri havalimanlarında ve şehir merkezlerinde hizmet vermektedir.',
        requirements: [
          'Uluslararası sürücü belgesi',
          'Kredi kartı',
          'En az 21 yaş'
        ],
        affiliateLinks: [
          'https://example.com/avis-turkey',
          'https://example.com/hertz-turkey'
        ]
      }
    },
    cultureAndEvents: {
      traditions: [
        'Türk misafirperverliği',
        'Çay kültürü',
        'Hamam geleneği',
        'Geleneksel el sanatları'
      ],
      festivals: [
        {
          name: 'İstanbul Film Festivali',
          date: 'Nisan',
          description: 'Türkiye\'nin en büyük film festivalidir ve her yıl dünya sinemasından önemli yapımları izleyicilerle buluşturur.'
        },
        {
          name: 'Aspendos Opera ve Bale Festivali',
          date: 'Haziran-Temmuz',
          description: 'Antik Aspendos Tiyatrosu\'nda düzenlenen uluslararası opera ve bale festivali.'
        }
      ],
      museums: [
        {
          name: 'Topkapı Sarayı',
          location: 'İstanbul, Sultanahmet',
          description: 'Osmanlı İmparatorluğu\'nun 400 yıl boyunca yönetim merkezi olan saray.',
          entryFee: '200₺'
        },
        {
          name: 'Ayasofya',
          location: 'İstanbul, Sultanahmet',
          description: 'Bizans döneminden kalma, sonradan camiye ve müzeye dönüştürülen tarihi yapı.',
          entryFee: 'Ücretsiz (Cami olarak hizmet vermektedir)'
        }
      ],
      historicalSites: [
        {
          name: 'Efes Antik Kenti',
          location: 'İzmir, Selçuk',
          description: 'Antik dünyanın en iyi korunmuş Roma kentlerinden biri.',
          entryFee: '150₺'
        },
        {
          name: 'Kapadokya',
          location: 'Nevşehir',
          description: 'Peri bacaları ve yeraltı şehirleriyle ünlü volkanik bölge.',
          entryFee: 'Bölgeye giriş ücretsiz, müzeler için ayrı ücretlendirme'
        }
      ]
    }
  },
  // Diğer ülkeler buraya eklenebilir
];

// MongoDB bağlantısı ve veri ekleme
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB bağlantısı başarılı');
    
    // Önce mevcut verileri temizle
    await Country.deleteMany({});
    console.log('Mevcut ülke verileri silindi');
    
    // Yeni verileri ekle
    await Country.insertMany(sampleCountries);
    console.log(`${sampleCountries.length} ülke başarıyla eklendi`);
    
    mongoose.connection.close();
    console.log('Veritabanı bağlantısı kapatıldı');
  } catch (error) {
    console.error('Veritabanı işlemi sırasında hata:', error);
    process.exit(1);
  }
};

// Veritabanını doldur
seedDatabase();