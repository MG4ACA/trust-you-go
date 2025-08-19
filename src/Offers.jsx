import { useLanguage } from "./hooks/useLanguage";

const Offers = () => {
  const { t } = useLanguage();

  return (
    <section id="offers" className="py-20 px-6 bg-gradient-to-br from-[#075b95]/5 via-white to-[#65b25f]/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Special Deals
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("offers.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive packages designed to give you the best Sri Lankan experience
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Summer Offer */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#65b25f]/30">
            <div className="relative h-48 bg-gradient-to-br from-[#65b25f] to-[#4a9043] overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-6 left-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white font-bold text-sm">LIMITED TIME</span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="text-white text-right">
                  <div className="text-3xl font-bold">20%</div>
                  <div className="text-sm opacity-90">OFF</div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#65b25f] transition-colors">
                {t("offers.summer.title")}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t("offers.summer.description")}
              </p>
              <a
                href="#booking"
                className="inline-flex items-center px-6 py-3 bg-[#65b25f] hover:bg-[#4a9043] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("hero.bookNow")}
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Early Bird Offer */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#075b95]/30">
            <div className="relative h-48 bg-gradient-to-br from-[#075b95] to-[#054d7a] overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-6 left-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white font-bold text-sm">EARLY BIRD</span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="text-white text-right">
                  <div className="text-3xl font-bold">15%</div>
                  <div className="text-sm opacity-90">SAVE</div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#075b95] transition-colors">
                {t("offers.earlyBird.title")}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t("offers.earlyBird.description")}
              </p>
              <a
                href="#booking"
                className="inline-flex items-center px-6 py-3 bg-[#075b95] hover:bg-[#054d7a] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t("hero.bookNow")}
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
