import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Coordinates for the clinic
  const lng = 77.036814;
  const lat = 28.585801;
  const zoom = 16;

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://tiles.openfreemap.org/styles/bright', 
        center: [lng, lat],
        zoom: zoom,
        attributionControl: false
      });

      map.current.on('load', () => {
        setIsLoaded(true);
        map.current?.resize();
      });

      map.current.on('error', (e) => {
      });

      // Add navigation controls
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      map.current.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      // Add a marker for the clinic
      const marker = new maplibregl.Marker({ color: '#0ea5e9', scale: 1.2 })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup({ offset: 35 })
          .setHTML(`
            <div style="padding: 12px; min-width: 200px;">
              <h3 style="margin:0; color:#0ea5e9; font-weight:bold; font-size:16px;">LifeTime Smiles Clinic</h3>
              <p style="margin:6px 0 12px; font-size:13px; color:#666; line-height:1.4;">Flat No. 289, Pocket 3C, Sector 16B Dwarka, Delhi</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=28.585801,77.036814" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="display: block; background-color: #0ea5e9; color: white; text-align: center; padding: 10px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px; transition: background-color 0.2s;">
                GET DIRECTIONS
              </a>
            </div>
          `))
        .addTo(map.current);

      // Auto-open popup
      marker.togglePopup();

    } catch (err) {
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-gray-50 flex items-center justify-center overflow-hidden">
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '100%', opacity: isLoaded ? 1 : 0 }} 
        className="absolute inset-0 z-0 transition-opacity duration-500" 
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-gray-500 font-bold animate-pulse text-sm">Initializing Map...</p>
        </div>
      )}
    </div>
  );
}
