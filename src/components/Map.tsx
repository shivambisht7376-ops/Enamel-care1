import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const lng = 77.036814;
  const lat = 28.585801;
  const zoom = 15;

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Basic style
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add a marker for the clinic
    new maplibregl.Marker({ color: '#0ea5e9' })
      .setLngLat([lng, lat])
      .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML('<h3>LifeTime Smiles Clinic</h3><p>Dwarka, Sector 16B</p>'))
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
