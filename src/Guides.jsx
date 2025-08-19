import { useLanguage } from "./hooks/useLanguage";

const Guides = () => {
  const { t } = useLanguage();

  return (
    <section id="guides" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Travel Insights
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("guides.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert knowledge to make your Sri Lankan journey extraordinary
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Destinations Guide */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative h-64 bg-gradient-to-br from-[#075b95] to-[#065a87] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-2xl font-bold">{t("guides.destinations.title")}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t("guides.destinations.description")}
                </p>
                <div className="flex items-center text-[#075b95] font-semibold group-hover:text-[#065a87] transition-colors">
                  <span>Learn More</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Tips Guide */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative h-64 bg-gradient-to-br from-[#65b25f] to-[#4a9043] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-2xl font-bold">{t("guides.tips.title")}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {t("guides.tips.description")}
                </p>
                <div className="flex items-center text-[#65b25f] font-semibold group-hover:text-[#4a9043] transition-colors">
                  <span>Discover Tips</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guides;
