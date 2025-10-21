import { useLanguage } from '../hooks/useLanguage';

const LearnMore = () => {
  const { t } = useLanguage();

  const learningTopics = [
    {
      category: 'History & Culture',
      icon: '🏛️',
      topics: [
        'Ancient kingdoms and their legacy',
        'Buddhist and Hindu influences',
        'Colonial period impact',
        'Modern Sri Lankan society',
      ],
      color: 'from-[#075b95] to-[#065a87]',
    },
    {
      category: 'Natural Wonders',
      icon: '🌿',
      topics: [
        'Biodiversity hotspots',
        'Endemic species and wildlife',
        'Climate zones explained',
        'Conservation efforts',
      ],
      color: 'from-[#075b95] to-[#065a87]',
    },
    {
      category: 'Local Experiences',
      icon: '🎭',
      topics: [
        'Traditional festivals and celebrations',
        'Local crafts and artisans',
        'Regional cuisine variations',
        'Community-based tourism',
      ],
      color: 'from-[#075b95] to-[#065a87]',
    },
  ];

  return (
    <section id="learn-more" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t('learnMore.discoverMore')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('learnMore.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('learnMore.description')}</p>
        </div>

        {/* Learning Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {learningTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#075b95]/10 to-[#65b25f]/5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${topic.color} p-6`}>
                <div className="text-center">
                  <div className="text-4xl mb-3">{topic.icon}</div>
                  <h3 className="text-xl font-bold text-white">
                    {t(`learnMore.category.${index}`)}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <ul className="space-y-3">
                  {topic.topics.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#075b95]/10 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">
                        {t(`learnMore.topic.${index}.${itemIndex}`)}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-6 w-full bg-gradient-to-r ${topic.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105`}
                >
                  {t('learnMore.explore', { category: t(`learnMore.category.${index}`) })}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#075b95]/10 to-[#65b25f]/10 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('learnMore.ctaTitle')}
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('learnMore.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#075b95] to-[#065a87] hover:from-[#065a87] hover:to-[#075b95] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>{t('learnMore.downloadGuide')}</span>
            </button>
            <button className="border-2 border-[#65b25f] text-[#65b25f] hover:bg-[#65b25f] hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{t('learnMore.watchVideo')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
