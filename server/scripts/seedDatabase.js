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
    },
    dealsAndPromotions: {
      flightDeals: [
        {
          title: 'İstanbul-Antalya Özel Fiyat',
          description: 'Yaz sezonu için indirimli uçuşlar',
          provider: 'Türk Hava Yolları',
          discountPercentage: 25,
          validUntil: new Date('2023-12-31'),
          affiliateLink: 'https://example.com/thy-istanbul-antalya'
        },
        {
          title: 'Avrupa Turu Fırsatı',
          description: 'Türkiye çıkışlı Avrupa turlarında %30 indirim',
          provider: 'ETS Tur',
          discountPercentage: 30,
          validUntil: new Date('2023-10-15'),
          affiliateLink: 'https://example.com/ets-europe-tour'
        }
      ],
      restaurantDiscounts: [
        {
          restaurantName: 'Köşebaşı',
          description: 'İki kişilik menülerde %15 indirim',
          discountPercentage: 15,
          validUntil: new Date('2023-11-30'),
          affiliateLink: 'https://example.com/kosebasi-discount'
        }
      ],
      cityPasses: [
        {
          name: 'İstanbul Tourist Pass',
          description: 'İstanbul\'un en popüler 30+ aktivitesi için geçerli kart',
          price: '€95',
          validityPeriod: '5 gün',
          inclusions: ['Topkapı Sarayı', 'Ayasofya', 'Boğaz Turu', 'Havalimanı Transferi'],
          affiliateLink: 'https://example.com/istanbul-tourist-pass'
        }
      ],
      couponCodes: [
        {
          code: 'TURKEY2023',
          description: 'Booking.com üzerinden yapılan rezervasyonlarda %10 indirim',
          validFor: 'Tüm Türkiye otelleri',
          validUntil: new Date('2023-12-31'),
          affiliateLink: 'https://example.com/booking-discount'
        }
      ]
    },
    simCardAndCommunication: {
      localOperators: [
        {
          name: 'Turkcell',
          description: 'Türkiye\'nin en geniş kapsama alanına sahip operatörü',
          coverage: 'Ülke genelinde %98',
          websiteUrl: 'https://www.turkcell.com.tr'
        },
        {
          name: 'Vodafone',
          description: 'Uluslararası dolaşım için avantajlı paketler',
          coverage: 'Ülke genelinde %96',
          websiteUrl: 'https://www.vodafone.com.tr'
        },
        {
          name: 'Türk Telekom',
          description: 'Ekonomik fiyatlı internet paketleri',
          coverage: 'Ülke genelinde %95',
          websiteUrl: 'https://www.turktelekom.com.tr'
        }
      ],
      purchaseLocations: [
        'Havalimanı telekomünikasyon standları',
        'Şehir merkezlerindeki operatör mağazaları',
        'Büyük alışveriş merkezleri'
      ],
      touristPlans: [
        {
          operatorName: 'Turkcell',
          planName: 'Tourist Welcome Pack',
          data: '20GB',
          validity: '15 gün',
          price: '300₺',
          features: ['Sınırsız sosyal medya', 'WhatsApp kullanımı dahil', '120 dakika yurtiçi arama']
        },
        {
          operatorName: 'Vodafone',
          planName: 'Holiday Pass',
          data: '15GB',
          validity: '10 gün',
          price: '250₺',
          features: ['Navigasyon uygulamaları dahil', '100 dakika yurtiçi arama']
        }
      ],
      airportPurchaseInfo: 'İstanbul, Antalya, İzmir ve Bodrum havalimanlarında 7/24 hizmet veren telekomünikasyon standlarından pasaportunuzla SIM kart satın alabilirsiniz.',
      internetCoverage: 'Büyük şehirlerde 5G, turistik bölgelerde 4.5G hizmeti yaygındır. Kırsal alanlarda 3G bağlantısı bulunabilir.'
    },
    currencyExchange: {
      recommendedExchangeLocations: [
        {
          name: 'Atatürk Havalimanı Döviz Büroları',
          type: 'Döviz bürosu',
          location: 'İstanbul, Havalimanı Terminal 1 ve 2',
          rateQuality: 'Ortalama',
          notes: '24 saat hizmet vermektedir, ancak komisyon oranları yüksek olabilir.'
        },
        {
          name: 'Sultanahmet Döviz',
          type: 'Döviz bürosu',
          location: 'İstanbul, Sultanahmet Meydanı',
          rateQuality: 'İyi',
          notes: 'Turistik bölgede olmasına rağmen rekabetçi kurlar sunmaktadır.'
        }
      ],
      atmInfo: {
        commonBanks: ['İş Bankası', 'Ziraat Bankası', 'Garanti BBVA', 'Yapı Kredi'],
        commissionRates: 'Yabancı kartlarla ATM kullanımında genellikle %1-3 arası komisyon alınmaktadır.',
        withdrawalLimits: 'Günlük çekim limiti genellikle 2000-3000₺ arasındadır, banka ve kart türüne göre değişiklik gösterebilir.',
        securityTips: 'Şehir merkezlerindeki banka ATM\'lerini tercih edin, kart kopyalama cihazlarına karşı dikkatli olun.'
      },
      cardPaymentInfo: {
        acceptance: 'Yaygın',
        commonCardTypes: ['Visa', 'Mastercard', 'Troy'],
        foreignTransactionFees: 'Yabancı kartlarla yapılan ödemelerde bankanız %1-3 arası dönüşüm ücreti alabilir.',
        tips: 'Küçük işletmelerde ve pazarlarda nakit bulundurmak faydalıdır. Büyük şehirlerde kredi kartı kullanımı yaygındır.'
      },
      cashHandlingTips: 'Büyük miktarda nakit taşımaktan kaçının. Pasaport ve para çantanızı ayrı yerlerde muhafaza edin. Turistik bölgelerde yankesicilere karşı dikkatli olun.'
    },
    localRegulations: {
      alcoholRules: 'Alkol satışı 22:00\'dan sonra marketlerde yasaktır. 18 yaş altına alkol satışı yapılmaz. Ramazan ayında bazı bölgelerde açık alanlarda alkol tüketimi sınırlandırılabilir.',
      smokingRules: 'Kapalı alanlarda sigara içmek yasaktır. Restoranların kapalı alanlarında, toplu taşıma araçlarında ve kamu binalarında sigara içilemez.',
      dressCodes: 'Camileri ziyaret ederken kadınların başörtüsü takması ve herkesin omuzları ve dizleri kapatan kıyafetler giymesi gerekmektedir. Turistik bölgelerde kıyafet konusunda esneklik vardır.',
      photographyRestrictions: 'Askeri bölgelerde ve bazı müzelerde fotoğraf çekmek yasaktır. İzin işaretlerini takip edin.',
      importRestrictions: 'Kişisel kullanım için 1 litre alkol, 2 paket sigara ve makul miktarda hediyelik eşya gümrüksüz getirilebilir.',
      culturalEtiquette: [
        {
          situation: 'Ev ziyareti',
          doThis: 'Küçük bir hediye getirin (tatlı, çikolata veya çiçek)',
          avoidThis: 'Ayakkabılarınızla eve girmeyin, genellikle kapıda çıkarılır'
        },
        {
          situation: 'Yemek daveti',
          doThis: 'Sunulan her şeyi tatmaya çalışın, bu bir nezaket göstergesidir',
          avoidThis: 'Sol elinizle yemek yemeyin, bazı kültürlerde bu saygısızlık olarak görülebilir'
        }
      ],
      commonMistakes: [
        {
          mistake: 'Pazarlık yapmamak',
          consequence: 'Turistik bölgelerde ve çarşılarda fiyatlar genellikle pazarlığa açıktır, pazarlık yapmazsanız fazla ödeyebilirsiniz',
          howToAvoid: 'Fiyatın yaklaşık %30-40 altında bir teklifle başlayın ve orta noktada buluşun'
        },
        {
          mistake: 'Camilere uygun olmayan kıyafetle girmek',
          consequence: 'Girişte durdurulabilir veya rahatsız edici bakışlara maruz kalabilirsiniz',
          howToAvoid: 'Kadınlar için başörtüsü ve uzun etek/pantolon, erkekler için uzun pantolon giyin'
        }
      ]
    },
    visaAndImmigration: {
      visaTypes: [
        {
          type: 'Turist Vizesi',
          eligibility: 'Çoğu ülke vatandaşları',
          duration: '90 güne kadar',
          cost: '60-80€ arası',
          processingTime: '3-15 iş günü'
        },
        {
          type: 'e-Vize',
          eligibility: 'Belirli ülke vatandaşları',
          duration: '30 güne kadar',
          cost: '25-50$ arası',
          processingTime: '24-72 saat'
        },
        {
          type: 'Çalışma Vizesi',
          eligibility: 'Türkiye\'de çalışma izni olanlar',
          duration: 'Çalışma izni süresince',
          cost: '150-200$ arası',
          processingTime: '30-60 gün'
        }
      ],
      applicationProcess: {
        steps: [
          'Online başvuru formunu doldurun',
          'Gerekli belgeleri hazırlayın (pasaport, fotoğraf, uçuş rezervasyonu, otel rezervasyonu)',
          'Vize ücretini ödeyin',
          'Randevu alın (gerekiyorsa)',
          'Başvurunuzu takip edin'
        ],
        requiredDocuments: [
          'Geçerli pasaport (en az 6 ay geçerlilik süresi)',
          'Biometrik fotoğraf',
          'Uçuş rezervasyonu',
          'Konaklama kanıtı',
          'Seyahat sigortası',
          'Finansal yeterlilik kanıtı'
        ],
        whereToApply: 'Türk Büyükelçiliği veya Konsolosluğu, bazı ülkeler için online e-Vize sistemi',
        onlineApplication: 'https://www.evisa.gov.tr adresinden e-Vize başvurusu yapılabilir'
      },
      extensionProcess: 'Türkiye\'de kalış sürenizi uzatmak için bulunduğunuz ildeki Göç İdaresi Müdürlüğü\'ne başvurmanız gerekmektedir. Başvuru için pasaport, fotoğraf ve uzatma gerekçenizi belirten dilekçe gereklidir.',
      specialConditions: {
        workPermits: 'Çalışma izni başvuruları işveren tarafından yapılır ve Çalışma ve Sosyal Güvenlik Bakanlığı tarafından değerlendirilir.',
        residencePermits: 'Kısa dönem ikamet izni için en az 6 aylık pasaport geçerliliği ve sağlık sigortası gereklidir.',
        studentVisas: 'Türkiye\'deki bir eğitim kurumundan kabul mektubu gereklidir.'
      },
      entryRequirements: 'Türkiye\'ye giriş yapan yabancıların geçerli bir pasaporta veya seyahat belgesine sahip olmaları gerekmektedir. Bazı ülke vatandaşları için vize gereklidir.'
    },
    regionalFestivals: [
      {
        name: 'Mesir Macunu Festivali',
        type: 'Kültürel',
        date: 'Nisan ayı',
        location: 'Manisa',
        description: 'Sultan Süleyman döneminde şifa olarak dağıtılan mesir macununun halka saçılması geleneğini yaşatan festival.',
        ticketInfo: 'Ücretsiz etkinlik',
        localSignificance: 'UNESCO Somut Olmayan Kültürel Miras Listesi\'nde yer alan önemli bir kültürel etkinlik.',
        touristExperience: 'Renkli kostümler, geleneksel müzik ve dans gösterileri, mesir macunu dağıtımı.',
        photos: ['https://example.com/mesir-festival-1.jpg', 'https://example.com/mesir-festival-2.jpg']
      },
      {
        name: 'Uluslararası İzmir Festivali',
        type: 'Müzik ve Sanat',
        date: 'Haziran-Temmuz',
        location: 'İzmir',
        description: 'Klasik müzik, opera, bale ve tiyatro gösterilerinin sunulduğu uluslararası festival.',
        ticketInfo: 'Biletler 100-500₺ arasında değişmektedir. Biletix üzerinden satın alınabilir.',
        localSignificance: 'İzmir\'in kültür sanat hayatının en önemli etkinliklerinden biri.',
        touristExperience: 'Efes Antik Tiyatro gibi tarihi mekanlarda düzenlenen konserler, dünyaca ünlü sanatçıların performansları.',
        photos: ['https://example.com/izmir-festival-1.jpg', 'https://example.com/izmir-festival-2.jpg']
      },
      {
        name: 'Uluslararası Antalya Film Festivali',
        type: 'Sinema',
        date: 'Ekim',
        location: 'Antalya',
        description: 'Türkiye\'nin en prestijli film festivali, ulusal ve uluslararası film gösterimleri ve yarışmalar.',
        ticketInfo: 'Film gösterimleri için biletler 30-50₺ arasında değişmektedir.',
        localSignificance: 'Türk sinemasının en önemli etkinliği, Altın Portakal ödülleri.',
        touristExperience: 'Film gösterimleri, yönetmen ve oyuncularla söyleşiler, kırmızı halı etkinlikleri.',
        photos: ['https://example.com/antalya-festival-1.jpg', 'https://example.com/antalya-festival-2.jpg']
      }
    ],
    userRecommendations: [
      {
        userNickname: 'WorldTraveler42',
        date: new Date('2023-05-15'),
        rating: 5,
        title: 'İstanbul\'da Unutulmaz Bir Hafta',
        content: 'İstanbul\'da geçirdiğim bir hafta inanılmazdı. Özellikle Kapalıçarşı\'da alışveriş yapmak ve Boğaz turu çok keyifliydi. Yerel rehberimiz sayesinde turistik olmayan yerleri de keşfettik.',
        category: 'Şehir Turu',
        helpfulCount: 127,
        photos: ['https://example.com/user-istanbul-1.jpg', 'https://example.com/user-istanbul-2.jpg'],
        tips: ['Toplu taşıma için İstanbulkart alın', 'Sultanahmet bölgesinde erken saatlerde gezin', 'Karaköy\'deki yeni nesil kafeleri deneyin']
      },
      {
        userNickname: 'FoodieExplorer',
        date: new Date('2023-06-22'),
        rating: 4.5,
        title: 'Gaziantep: Lezzet Cenneti',
        content: 'Gaziantep mutfağı gerçekten dünya çapında bir hazine. Baklava, kebap çeşitleri ve yerel kahvaltı kültürü muhteşem. Zeugma Müzesi de görülmeye değer.',
        category: 'Yemek Turu',
        helpfulCount: 89,
        photos: ['https://example.com/user-gaziantep-1.jpg', 'https://example.com/user-gaziantep-2.jpg'],
        tips: ['İmam Çağdaş\'ta kebap yiyin', 'Baklavayı Koçak veya Güllüoğlu\'ndan alın', 'Yerel pazarlardan baharat almayı unutmayın']
      },
      {
        userNickname: 'BeachLover2023',
        date: new Date('2023-07-10'),
        rating: 5,
        title: 'Fethiye\'nin Muhteşem Koyları',
        content: 'Ölüdeniz ve Butterfly Valley inanılmaz güzellikte. 12 adalara tekne turu yaparak gizli koyları keşfettik. Paragliding deneyimi ise hayatımın en heyecanlı anlarından biriydi.',
        category: 'Plaj Tatili',
        helpfulCount: 156,
        photos: ['https://example.com/user-fethiye-1.jpg', 'https://example.com/user-fethiye-2.jpg'],
        tips: ['Ölüdeniz\'de mutlaka paragliding yapın', 'Kayaköy hayalet köyünü ziyaret edin', 'Çalış plajında gün batımını izleyin']
      }
    ]
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