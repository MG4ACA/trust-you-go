import { useCallback, useEffect, useMemo, useState } from 'react';
import LocationDrawer from '../components/LocationDrawer';
import SriLankaMap from '../components/SriLankaMap';
import { SRI_LANKA_DESTINATIONS, SRI_LANKA_REGIONS } from '../data/sriLankaLocations';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const mapBackendLocationType = (type) => {
  const map = {
    tourist_spot: 'heritage',
    historical: 'heritage',
    religious: 'heritage',
    wildlife: 'wildlife',
    nature: 'hill_country',
    beach: 'beach',
    adventure: 'wildlife',
    accommodation: 'city',
    restaurant: 'city',
    activity: 'wildlife',
  };
  return map[type] || 'heritage';
};

const InteractiveMapSection = () => {
  const [locations, setLocations] = useState(SRI_LANKA_DESTINATIONS);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Attempt to merge backend live locations if API is available and has coordinates
    const fetchLiveLocations = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/locations?is_active=true&limit=100`);
        if (!res.ok) return;
        const json = await res.json();
        const apiData = json.data || json.locations || (Array.isArray(json) ? json : []);

        const validApiLocations = apiData
          .filter((loc) => loc.latitude && loc.longitude && !isNaN(parseFloat(loc.latitude)))
          .map((loc) => {
            // Check if matches one of the curated destinations by name
            const existing = SRI_LANKA_DESTINATIONS.find(
              (d) => d.name.toLowerCase() === loc.name.toLowerCase()
            );

            const images = loc.images && loc.images.length > 0
              ? loc.images.map((img) => img.image_url || img)
              : loc.image_url
              ? [loc.image_url]
              : existing?.images || ['/locations/segiriya-rock.jpg'];

            return {
              id: loc.location_id || loc.id,
              name: loc.name,
              shortName: loc.name.split(' ')[0],
              category: existing?.category || mapBackendLocationType(loc.location_type),
              categoryLabel: existing?.categoryLabel || loc.location_type || 'Destination',
              province: existing?.province || '',
              latitude: parseFloat(loc.latitude),
              longitude: parseFloat(loc.longitude),
              description: loc.description || existing?.description || '',
              highlights: existing?.highlights || [loc.description?.slice(0, 100)],
              bestTimeToVisit: existing?.bestTimeToVisit || 'Year-round',
              images,
              imageUrl: images[0],
              googleMapsUrl: loc.location_url || existing?.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(loc.name)}`,
              popularTour: existing?.popularTour || 'Custom Tailored Tour',
            };
          });

        if (validApiLocations.length > 0) {
          // Merge: Keep API locations and add any static curated ones not yet in DB
          const apiNames = new Set(validApiLocations.map((l) => l.name.toLowerCase()));
          const remainingStatic = SRI_LANKA_DESTINATIONS.filter(
            (s) => !apiNames.has(s.name.toLowerCase())
          );
          setLocations([...validApiLocations, ...remainingStatic]);
        }
      } catch {
        // Fall back gracefully to curated SRI_LANKA_DESTINATIONS
      }
    };

    fetchLiveLocations();
  }, []);

  const filteredLocations = useMemo(() => {
    if (activeCategory === 'all') return locations;
    return locations.filter((loc) => loc.category === activeCategory);
  }, [locations, activeCategory]);

  const handleSelectLocation = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  return (
    <section id="map" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#075b95]/10 text-[#075b95] text-xs font-semibold uppercase tracking-wider mb-3">
            <i className="pi pi-map-marker text-xs"></i>
            <span>Interactive Map of Sri Lanka</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Iconic <span className="text-[#075b95]">Destinations</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Click on any pin across the island to uncover highlights, photos, ideal visiting seasons, and curated tour packages.
          </p>
        </div>

        {/* Desktop Category Filter Pills (clean centered row) */}
        <div className="hidden md:flex items-center justify-center flex-wrap gap-2.5 lg:gap-3 mb-8">
          {SRI_LANKA_REGIONS.map((region) => {
            const isActive = activeCategory === region.id;
            return (
              <button
                key={region.id}
                onClick={() => setActiveCategory(region.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs focus:outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#075b95] text-white shadow-md shadow-[#075b95]/20 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <i className={`pi ${region.icon} text-xs`}></i>
                <span>{region.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Animated Right-to-Left Marquee Category Pills */}
        <div className="md:hidden relative w-full overflow-hidden mb-6 py-1">
          {/* Subtle edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-2.5 py-1">
            {[...SRI_LANKA_REGIONS, ...SRI_LANKA_REGIONS].map((region, idx) => {
              const isActive = activeCategory === region.id;
              return (
                <button
                  key={`${region.id}-${idx}`}
                  onClick={() => setActiveCategory(region.id)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-xs focus:outline-none cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#075b95] text-white shadow-md shadow-[#075b95]/20 scale-105'
                      : 'bg-white text-gray-700 active:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <i className={`pi ${region.icon} text-xs`}></i>
                  <span className="whitespace-nowrap">{region.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Map Container (8 cols) */}
          <div className="lg:col-span-8 min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] h-full">
            <SriLankaMap
              locations={filteredLocations}
              selectedLocation={selectedLocation}
              onSelectLocation={handleSelectLocation}
            />
          </div>

          {/* Location Quick-list Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">Locations</h3>
                <p className="text-xs text-gray-500">
                  {filteredLocations.length} destination{filteredLocations.length !== 1 ? 's' : ''} available
                </p>
              </div>
              <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                Click pin or card
              </span>
            </div>

            {/* Scrollable list */}
            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[460px] lg:max-h-[500px] pr-1">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 border ${
                      isSelected
                        ? 'border-[#075b95] bg-blue-50/50 shadow-sm ring-1 ring-[#075b95]'
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/80'
                    }`}
                  >
                    <img
                      src={loc.images?.[0] || '/locations/segiriya-rock.jpg'}
                      alt={loc.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 shadow-xs"
                      onError={(e) => {
                        e.currentTarget.src = '/locations/segiriya-rock.jpg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate leading-snug">
                        {loc.name}
                      </h4>
                      <p className="text-xs text-[#075b95] font-medium truncate mt-0.5">
                        {loc.categoryLabel || loc.category}
                      </p>
                      {loc.province && (
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          📍 {loc.province}
                        </p>
                      )}
                    </div>
                    <i className="pi pi-angle-right text-gray-400 text-xs shrink-0"></i>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 mt-3 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Managed in Real-Time via Trust You Go Admin Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Detail Drawer */}
      <LocationDrawer location={selectedLocation} onClose={handleCloseDrawer} />
    </section>
  );
};

export default InteractiveMapSection;
