import { useLanguage } from "./hooks/useLanguage";

const TravelGuides = () => {
  const { t } = useLanguage();

  const guides = [
    {
      title: "Best Time to Visit",
      description: "Discover the perfect seasons for your Sri Lankan adventure",
      image: "/locations/beach-01.jpg",
      tips: [
        "December to March: Perfect for beaches and cultural sites",
        "April to September: Ideal for hill country and tea plantations",
        "Avoid monsoon seasons for outdoor activities",
      ],
    },
    {
      title: "Cultural Etiquette",
      description: "Respect local customs and traditions",
      image: "/locations/sthoopa.jpg",
      tips: [
        "Remove shoes before entering temples",
        "Dress modestly when visiting religious sites",
        "Always ask permission before photographing people",
      ],
    },
    {
      title: "Transportation Guide",
      description: "Navigate Sri Lanka like a local",
      image: "/locations/nine-arch.jpg",
      tips: [
        "Train journeys offer scenic mountain views",
        "Tuk-tuks are perfect for short city trips",
        "Private drivers provide flexibility for sightseeing",
      ],
    },
    {
      title: "Food & Dining",
      description: "Savor authentic Sri Lankan cuisine",
      image: "/locations/coconut-hill.jpg",
      tips: [
        "Try rice and curry - the national dish",
        "Street food is safe and delicious",
        "Always drink bottled or filtered water",
      ],
    },
  ];

  return (
    <section
      id="travel-guides"
      className="py-20 px-6 bg-gradient-to-br from-[#075b95]/5 via-white to-[#65b25f]/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Expert Advice
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Travel Guides & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Essential information and insider tips to make your Sri Lankan journey unforgettable and
            hassle-free
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{guide.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{guide.description}</p>

                {/* Tips List */}
                <div className="space-y-2">
                  {guide.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#65b25f] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;
