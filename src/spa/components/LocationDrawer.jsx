import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationDrawer = ({ location, onClose }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveImageIndex(0);
  }, [location]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!location) return null;

  const images =
    location.images && location.images.length > 0
      ? location.images
      : [location.imageUrl || '/locations/segiriya-rock.jpg'];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBookTour = () => {
    // Navigate to booking section with preselected location in state
    navigate('/booking', {
      state: {
        selectedPackage: location.popularTour || location.name,
        preferredLocation: location.name,
      },
    });

    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'heritage':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'wildlife':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'beach':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'hill_country':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  };

  return (
    <>
      {/* Click-outside dismiss surface - completely transparent, no blur, no darkening */}
      <div
        className="fixed inset-0 z-40 bg-transparent pointer-events-auto"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Location Panel (Bottom Sheet on Mobile, Right Panel on Desktop) */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 max-h-[78vh] rounded-t-3xl md:rounded-none md:inset-y-0 md:left-auto md:right-0 md:w-full md:max-w-lg md:max-h-none bg-white shadow-2xl flex flex-col bottom-sheet-mobile md:drawer-panel-desktop overflow-hidden border-t border-gray-200 md:border-t-0 md:border-l"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="pt-2.5 pb-1 md:hidden flex justify-center shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getCategoryColor(
                location.category
              )}`}
            >
              {location.categoryLabel || location.category || 'Destination'}
            </span>
            {location.province && (
              <span className="text-xs text-gray-500 font-medium">📍 {location.province}</span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors focus:outline-none"
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-md group aspect-16/10">
            <img
              src={images[activeImageIndex]}
              alt={`${location.name} photo ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                e.currentTarget.src = '/locations/segiriya-rock.jpg';
              }}
            />

            {/* Navigation Arrows (shown if > 1 image) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-80 hover:opacity-100 focus:outline-none"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all opacity-80 hover:opacity-100 focus:outline-none"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Counter Badge */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex
                      ? 'border-[#075b95] ring-2 ring-[#075b95]/20 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/locations/segiriya-rock.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Title & Short Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug">{location.name}</h3>
            {location.latitude && location.longitude && (
              <p className="text-xs text-gray-400 font-mono mt-1">
                Coordinates: {Number(location.latitude).toFixed(4)}°N, {Number(location.longitude).toFixed(4)}°E
              </p>
            )}
            <p className="text-gray-700 leading-relaxed mt-3 text-sm md:text-base">
              {location.description}
            </p>
          </div>

          {/* Highlights List */}
          {location.highlights && location.highlights.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="text-[#075b95]">✨</span> Destination Highlights
              </h4>
              <ul className="space-y-2">
                {location.highlights.map((item, i) => (
                  <li key={i} className="text-xs md:text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Best Time to Visit */}
          {location.bestTimeToVisit && (
            <div className="flex items-start gap-3 bg-amber-50/60 rounded-xl p-3.5 border border-amber-100">
              <span className="text-lg">☀️</span>
              <div>
                <span className="block text-xs font-semibold text-amber-900 uppercase tracking-wide">
                  Best Time to Visit
                </span>
                <span className="text-xs md:text-sm text-amber-800">
                  {location.bestTimeToVisit}
                </span>
              </div>
            </div>
          )}

          {/* Recommended Tour Package */}
          {location.popularTour && (
            <div className="bg-blue-50/60 rounded-xl p-3.5 border border-blue-100">
              <span className="block text-xs font-semibold text-blue-900 uppercase tracking-wide">
                Included in Package
              </span>
              <span className="text-sm font-bold text-[#075b95]">
                {location.popularTour}
              </span>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="p-4 md:p-6 border-t border-gray-100 bg-white space-y-2.5">
          <button
            onClick={handleBookTour}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#075b95] to-[#043e68] hover:from-[#064c7d] hover:to-[#032e4d] text-white font-semibold shadow-lg shadow-[#075b95]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 focus:outline-none"
          >
            <span>Plan Tour to {location.shortName || location.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {location.googleMapsUrl && (
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Location on Google Maps</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationDrawer;
