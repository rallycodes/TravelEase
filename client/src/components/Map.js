import React, { useRef, useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// CSS düzeltmeleri için stil ekleyin
const mapStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
};

const Map = ({ onCountrySelect, selectedCountry, className, activeFilter, onMapLoad, onMapError }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Seçilebilir ülkeler
  const selectableCountries = ['Azerbaijan', 'United Kingdom'];
  
  // Ülke isimlerini standartlaştırma
  const normalizeCountryName = (name) => {
    const nameMap = {
      'England': 'United Kingdom',
      'Great Britain': 'United Kingdom',
      'UK': 'United Kingdom',
      'Britain': 'United Kingdom'
    };
    
    return nameMap[name] || name;
  };

  // Haritayı manuel olarak oluşturma
  useEffect(() => {
    if (!mapInstanceRef.current && mapContainerRef.current) {
      try {
        // Leaflet haritasını başlat
        const map = L.map(mapContainerRef.current).setView([40, 45], 3);
        
        // Harita katmanı ekle
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        mapInstanceRef.current = map;
        
        // Harita yüklendi bilgisi
        setTimeout(() => {
          setIsLoading(false);
          if (onMapLoad) onMapLoad();
        }, 500);
      } catch (error) {
        console.error("Map initialization error:", error);
        if (onMapError) onMapError("Failed to initialize map");
      }
    }
    
    // Temizleme fonksiyonu
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onMapLoad, onMapError]);

  // GeoJSON verilerini yükleme
  useEffect(() => {
    if (!mapInstanceRef.current || isLoading) return;
    
    let geoJsonLayer = null;
    
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load country data');
        }
        return response.json();
      })
      .then(data => {
        // Eski GeoJSON katmanını temizle
        if (geoJsonLayer) {
          geoJsonLayer.clearLayers();
          mapInstanceRef.current.removeLayer(geoJsonLayer);
        }
        
        // Yeni GeoJSON katmanı ekle
        geoJsonLayer = L.geoJSON(data, {
          style: feature => {
            const countryName = feature.properties.name;
            const normalizedName = normalizeCountryName(countryName);
            const isSelectable = selectableCountries.includes(normalizedName);
            const isSelected = normalizedName === selectedCountry;
            
            if (isSelectable) {
              return {
                fillColor: 'white',
                fillOpacity: 0.05,
                color: isSelected ? '#10b981' : '#3b82f6',
                weight: isSelected ? 3 : 2,
                opacity: 1
              };
            } else {
              return {
                fillColor: 'white',
                fillOpacity: 0,
                color: '#d1d5db',
                weight: 0.5,
                opacity: 0.6
              };
            }
          },
          onEachFeature: (feature, layer) => {
            const countryName = feature.properties.name;
            const normalizedName = normalizeCountryName(countryName);
            
            if (selectableCountries.includes(normalizedName)) {
              layer.on({
                click: () => {
                  onCountrySelect(normalizedName);
                  mapInstanceRef.current.fitBounds(layer.getBounds(), { padding: [100, 100] });
                },
                mouseover: e => {
                  e.target.setStyle({ fillOpacity: 0.2 });
                },
                mouseout: e => {
                  e.target.setStyle({ fillOpacity: 0.05 });
                }
              });
            }
          }
        }).addTo(mapInstanceRef.current);
      })
      .catch(error => {
        console.error("Error loading country data:", error);
        if (onMapError) {
          onMapError(error.message);
        }
      });
      
    return () => {
      if (geoJsonLayer) {
        geoJsonLayer.clearLayers();
        if (mapInstanceRef.current) {
          mapInstanceRef.current.removeLayer(geoJsonLayer);
        }
      }
    };
  }, [isLoading, selectedCountry, onCountrySelect, onMapError]);

  return (
    <div className={className}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.8)',
          zIndex: 1000,
          borderRadius: '8px'
        }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Harita yükleniyor...</p>
          </div>
        </div>
      )}
      <div ref={mapContainerRef} style={mapStyle}></div>
    </div>
  );
};

export default Map; 