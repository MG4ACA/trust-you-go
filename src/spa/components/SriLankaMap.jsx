import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Pin color palette matching brand and category themes
const getMarkerColor = (category) => {
  switch (category) {
    case 'heritage':
      return { bg: '#d97706', border: '#b45309', icon: '🏛️' };
    case 'wildlife':
      return { bg: '#ea580c', border: '#c2410c', icon: '🐆' };
    case 'beach':
      return { bg: '#0284c7', border: '#0369a1', icon: '🏖️' };
    case 'hill_country':
      return { bg: '#059669', border: '#047857', icon: '🍃' };
    case 'city':
      return { bg: '#7c3aed', border: '#6d28d9', icon: '🏙️' };
    default:
      return { bg: '#075b95', border: '#054673', icon: '📍' };
  }
};

const createCustomIcon = (location, isSelected) => {
  const { bg, border, icon } = getMarkerColor(location.category);

  const html = `
    <div class="relative group cursor-pointer">
      ${
        isSelected
          ? `<div class="absolute -inset-2 rounded-full animate-ping opacity-60" style="background-color: ${bg}"></div>`
          : ''
      }
      <div 
        class="relative flex items-center justify-center w-9 h-9 rounded-full shadow-lg transition-transform duration-200 ${
          isSelected ? 'scale-125 ring-4 ring-white' : 'hover:scale-115'
        }"
        style="background: ${bg}; border: 2px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.25);"
      >
        <span class="text-sm select-none">${icon}</span>
      </div>
      <div 
        class="w-2 h-2 rotate-45 mx-auto -mt-1 shadow-xs"
        style="background: ${bg};"
      ></div>
      <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover:block pointer-events-none z-50">
        <span class="bg-gray-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
          ${location.shortName || location.name}
        </span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [36, 42],
    iconAnchor: [18, 42],
    popupAnchor: [0, -42],
  });
};

const SriLankaMap = ({ locations, selectedLocation, onSelectLocation }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Sri Lanka geographical bounds
    const southWest = L.latLng(5.5, 79.0);
    const northEast = L.latLng(10.2, 82.5);
    const bounds = L.latLngBounds(southWest, northEast);

    const isMobile = window.innerWidth < 768;
    const initialZoom = isMobile ? 7.2 : 7.8;
    const center = [7.8731, 80.7718];

    const map = L.map(mapContainerRef.current, {
      center,
      zoom: initialZoom,
      minZoom: 6.8,
      maxZoom: 13,
      maxBounds: bounds,
      maxBoundsViscosity: 0.85,
      zoomControl: false,
    });

    // Clean, modern map tiles from OpenStreetMap Carto / OSM standard
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control placed at top right
    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers whenever locations or selection change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers for locations with coordinates
    locations.forEach((loc) => {
      const lat = parseFloat(loc.latitude);
      const lng = parseFloat(loc.longitude);

      if (isNaN(lat) || isNaN(lng)) return;

      const isSelected = selectedLocation && (selectedLocation.id === loc.id || selectedLocation.locationId === loc.locationId);
      const icon = createCustomIcon(loc, isSelected);

      const marker = L.marker([lat, lng], { icon }).addTo(map);

      marker.on('click', () => {
        onSelectLocation(loc);
        map.flyTo([lat, lng], Math.max(map.getZoom(), 9.2), {
          duration: 0.8,
          easeLinearity: 0.25,
        });
      });

      markersRef.current.push(marker);
    });
  }, [locations, selectedLocation, onSelectLocation]);

  // Handle fly-to when selectedLocation is set from external UI
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedLocation) return;

    const lat = parseFloat(selectedLocation.latitude);
    const lng = parseFloat(selectedLocation.longitude);

    if (!isNaN(lat) && !isNaN(lng)) {
      map.flyTo([lat, lng], Math.max(map.getZoom(), 9.2), {
        duration: 0.8,
      });
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-gray-200">
      <div ref={mapContainerRef} className="w-full h-full min-h-[480px] lg:min-h-[580px] z-10" />

      {/* Floating Map Legend & Reset View Button */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-gray-200/80 text-xs">
        <span className="font-semibold text-gray-800">Quick Guide:</span>
        <span className="inline-flex items-center gap-1 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Heritage
        </span>
        <span className="inline-flex items-center gap-1 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Safari
        </span>
        <span className="inline-flex items-center gap-1 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Beach
        </span>
        <span className="inline-flex items-center gap-1 text-gray-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Nature
        </span>
      </div>

      {/* Reset Sri Lanka View Button */}
      <button
        onClick={() => {
          const map = mapInstanceRef.current;
          if (map) {
            map.flyTo([7.8731, 80.7718], window.innerWidth < 768 ? 7.2 : 7.8, { duration: 0.8 });
          }
        }}
        className="absolute top-4 left-4 z-20 bg-white/95 hover:bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-md border border-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-all focus:outline-none"
        title="Reset map view to whole island"
      >
        <svg className="w-3.5 h-3.5 text-[#075b95]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Island View</span>
      </button>
    </div>
  );
};

export default SriLankaMap;
