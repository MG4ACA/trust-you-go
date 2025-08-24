import { useLanguage } from "./hooks/useLanguage";

const DiscoverTips = () => {
  const { t } = useLanguage();

  const tipCategories = [
    {
      title: "Budget Travel Tips",
      icon: "💰",
      tips: [
        {
          tip: "Use public transport",
          description: "Trains and buses are affordable and offer authentic experiences",
        },
        {
          tip: "Eat at local restaurants",
          description: "Street food and local eateries offer delicious meals at great prices",
        },
        {
          tip: "Stay in guesthouses",
          description: "Family-run accommodations provide personal service and local insights",
        },
        {
          tip: "Book attractions directly",
          description: "Avoid middleman fees by purchasing tickets at entrance gates",
        },
      ],
    },
    {
      title: "Photography Tips",
      icon: "📸",
      tips: [
        {
          tip: "Golden hour magic",
          description: "Capture stunning photos during sunrise and sunset",
        },
        {
          tip: "Respect local customs",
          description: "Always ask permission before photographing people",
        },
        {
          tip: "Protect your gear",
          description: "Use waterproof bags during monsoon seasons",
        },
        {
          tip: "Wildlife photography",
          description: "Use telephoto lenses and maintain safe distances",
        },
      ],
    },
    {
      title: "Safety & Health",
      icon: "🛡️",
      tips: [
        {
          tip: "Stay hydrated",
          description: "Drink plenty of bottled water, especially in tropical heat",
        },
        {
          tip: "Use sunscreen",
          description: "Strong tropical sun requires SPF 30+ protection",
        },
        {
          tip: "Mosquito protection",
          description: "Use repellent and wear long sleeves during dawn/dusk",
        },
        {
          tip: "Travel insurance",
          description: "Ensure comprehensive coverage for activities and health",
        },
      ],
    },
    {
      title: "Cultural Immersion",
      icon: "🎭",
      tips: [
        {
          tip: "Learn basic phrases",
          description: "Simple Japanese or Tamil greetings delight locals",
        },
        {
          tip: "Participate in festivals",
          description: "Join local celebrations for authentic cultural experiences",
        },
        {
          tip: "Try home stays",
          description: "Live with local families to understand daily life",
        },
        {
          tip: "Support local crafts",
          description: "Buy handmade items directly from artisans",
        },
      ],
    },
  ];

  return (
    <section
      id="discover-tips"
      className="py-20 px-6 bg-gradient-to-br from-[#65b25f]/5 via-white to-[#075b95]/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#e67e22]/10 text-[#e67e22] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t("discoverTips.proTips")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("discoverTips.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("discoverTips.description")}
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {tipCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 group"
            >
              {/* Category Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{t(`discoverTips.category.${index}.title`)}</h3>
              </div>

              {/* Tips List */}
              <div className="space-y-4">
                {category.tips.map((item, tipIndex) => (
                  <div key={tipIndex} className="border-l-4 border-[#65b25f] pl-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{t(`discoverTips.category.${index}.tip.${tipIndex}.title`)}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{t(`discoverTips.category.${index}.tip.${tipIndex}.desc`)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips Bar */}
        <div className="bg-gradient-to-r from-[#075b95] to-[#065a87] rounded-3xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">{t("discoverTips.quickTitle")}</h3>
            <p className="text-lg opacity-90">{t("discoverTips.quickDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💵</span>
              </div>
              <h4 className="font-semibold mb-2">{t("discoverTips.quick.currency.title")}</h4>
              <p className="text-sm opacity-90">{t("discoverTips.quick.currency.desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🗣️</span>
              </div>
              <h4 className="font-semibold mb-2">{t("discoverTips.quick.language.title")}</h4>
              <p className="text-sm opacity-90">{t("discoverTips.quick.language.desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔌</span>
              </div>
              <h4 className="font-semibold mb-2">{t("discoverTips.quick.power.title")}</h4>
              <p className="text-sm opacity-90">{t("discoverTips.quick.power.desc")}</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="font-semibold mb-2">{t("discoverTips.quick.timezone.title")}</h4>
              <p className="text-sm opacity-90">{t("discoverTips.quick.timezone.desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverTips;
