import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocationImages, packagesData } from './data/packagesData';
import { useLanguage } from './hooks/useLanguage';
import useSEO from './utils/useSEO';

const Packages = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [expandedDay, setExpandedDay] = useState({});

  useSEO({ title: t('packages.seo.title'), description: t('packages.seo.description') });

  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
    setExpandedDay({});
  };

  const toggleDay = (packageId, dayNum) => {
    const key = `${packageId}-${dayNum}`;
    setExpandedDay((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBookNow = (packageName) => {
    navigate('/booking', { state: { selectedPackage: packageName } });
  };

  return (
    <section id="packages" className="py-20 px-6 bg-gradient-to-br from-[#075b95]/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t('packages.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('packages.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('packages.description')}</p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesData.map((pkg, index) => {
            const packageInfo = t(`packages.items.${index}`);
            const isExpanded = expandedPackage === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                {/* Card Header with Background Image */}
                <div className="relative h-64 overflow-hidden group">
                  {/* Image Carousel */}
                  <div className="absolute inset-0 flex">
                    {pkg.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="min-w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(/package-locations/${pkg.locationFolders[idx]}/${img})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Package Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{packageInfo.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        {packageInfo.duration} {t('packages.days')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Overview */}
                  <p className="text-gray-600 mb-4 line-clamp-3">{packageInfo.overview}</p>

                  {/* Location Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {packageInfo.locations.map((loc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#075b95]/10 text-[#075b95] rounded-full text-xs font-medium"
                      >
                        {loc}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => togglePackage(pkg.id)}
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#075b95] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#064a7a] transition-colors duration-300"
                    >
                      {isExpanded ? t('packages.hideDetails') : t('packages.viewDetails')}
                    </button>
                    <button
                      onClick={() => handleBookNow(packageInfo.name)}
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors duration-300"
                    >
                      {t('packages.bookNow')}
                    </button>
                  </div>
                </div>

                {/* Expanded Itinerary */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {t('packages.itinerary')}
                    </h4>
                    <div className="space-y-3">
                      {pkg.days.map((dayInfo) => (
                        <div
                          key={dayInfo.day}
                          className="bg-white rounded-lg shadow-sm overflow-hidden"
                        >
                          <button
                            onClick={() => toggleDay(pkg.id, dayInfo.day)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex items-center justify-center w-8 h-8 bg-[#075b95] text-white rounded-full text-sm font-bold">
                                {dayInfo.day}
                              </span>
                              <span className="font-semibold text-gray-900">
                                {dayInfo.location === 'Departure'
                                  ? t('packages.departure')
                                  : dayInfo.location}
                              </span>
                            </div>
                            <svg
                              className={`w-5 h-5 text-gray-500 transition-transform ${
                                expandedDay[`${pkg.id}-${dayInfo.day}`] ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {expandedDay[`${pkg.id}-${dayInfo.day}`] && dayInfo.places.length > 0 && (
                            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                              {/* Location Images */}
                              {dayInfo.locationFolder && (
                                <div className="mb-4 grid grid-cols-3 gap-2">
                                  {getLocationImages(dayInfo.locationFolder).map((img, imgIdx) => (
                                    <div
                                      key={imgIdx}
                                      className="relative h-32 rounded-lg overflow-hidden group cursor-pointer"
                                    >
                                      <img
                                        src={`/package-locations/${dayInfo.locationFolder}/${img}`}
                                        alt={img.replace('.jpg', '').replace(/-/g, ' ')}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                        }}
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-2 left-2 right-2">
                                          <p className="text-white text-xs font-medium truncate">
                                            {img.replace('.jpg', '').replace(/-/g, ' ')}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Places List */}
                              <ul className="space-y-2">
                                {dayInfo.places.map((place, placeIdx) => (
                                  <li
                                    key={placeIdx}
                                    className="flex items-start gap-2 text-gray-600 text-sm"
                                  >
                                    <span className="text-[#075b95] mt-1">•</span>
                                    <span>{place}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
