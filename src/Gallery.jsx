import { motion } from "framer-motion";
import ImageCarousel from "./components/ImageCarousel";
import { useLanguage } from "./hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Explore
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("gallery.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore Sri Lanka's diverse landscapes, from pristine beaches to ancient temples, tea
            plantations to wildlife sanctuaries
          </p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
          <ImageCarousel overlay={false} />

          {/* Gallery Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 z-20">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Experience Sri Lanka's Diverse Beauty
              </h3>
              <p className="text-lg text-gray-200 mb-6">
                From pristine beaches to ancient temples, majestic mountains to wildlife sanctuaries
                - discover the pearl of the Indian Ocean
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: "🏖️", label: "Beaches" },
                  { icon: "🏔️", label: "Mountains" },
                  { icon: "🐘", label: "Wildlife" },
                  { icon: "🏛️", label: "Heritage" },
                  { icon: "🌿", label: "Nature" },
                  { icon: "�️", label: "Spice Garden" },
                  { icon: "💎", label: "Gem Museum" },
                  { icon: "�", label: "Tea Plantations" },
                  { icon: "🏄‍♂️", label: "Surfing" },
                  { icon: "🦋", label: "Rainforests" },
                  { icon: "🏯", label: "Ancient Cities" },
                  { icon: "🥥", label: "Coconut Groves" },
                ].map((item, idx) => (
                  <motion.span
                    key={item.label}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.12, type: "spring", stiffness: 60 }}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
                  >
                    {item.icon} {item.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
