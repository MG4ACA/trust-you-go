import { useLanguage } from '../hooks/useLanguage';
import useSEO from '../utils/useSEO';

const Reviews = () => {
  const { t } = useLanguage();
  useSEO({ title: t('reviews.seo.title'), description: t('reviews.seo.description') });

  const reviews = [
    {
      text: t('reviews.review1'),
      author: 'Priya S.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    },
    {
      text: t('reviews.review2'),
      author: 'John D.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      text: t('reviews.review3'),
      author: 'Ayesha R.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <section id="reviews" className="py-20 px-6 bg-gradient-to-br from-[#075b95]/5 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t('reviews.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('reviews.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('reviews.description')}</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 transform hover:-translate-y-2">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg
                    className="w-8 h-8 text-[#075b95]/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Review Text */}
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  "{review.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{review.author}</div>
                    <div className="flex items-center mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-[#65b25f] fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Border */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#075b95] to-[#65b25f] rounded-b-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl shadow-lg px-8 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#075b95]">1000+</div>
              <div className="text-sm text-gray-600">{t('reviews.happyTravelers')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#65b25f]">4.9</div>
              <div className="text-sm text-gray-600">{t('reviews.averageRating')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#075b95]">50+</div>
              <div className="text-sm text-gray-600">{t('reviews.destinations')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
