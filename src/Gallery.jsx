import { motion } from "framer-motion";
import ImageCarousel from "./components/ImageCarousel";
import { useLanguage } from "./hooks/useLanguage";

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t("gallery.exploreTag")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("gallery.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("gallery.description")}</p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
          <ImageCarousel overlay={false} />

          {/* Gallery Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-8 z-20 max-sm:p-1">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t("gallery.experienceTitle")}
              </h3>
              <p className="text-lg text-gray-200 mb-6">{t("gallery.experienceDesc")}</p>
              <div className="flex flex-wrap justify-center gap-3 max-sm:hidden">
                {[
                  { icon: "🏖️", label: t("gallery.tags.beaches") },
                  { icon: "🏔️", label: t("gallery.tags.mountains") },
                  { icon: "🐘", label: t("gallery.tags.wildlife") },
                  { icon: "🏛️", label: t("gallery.tags.heritage") },
                  { icon: "🌿", label: t("gallery.tags.nature") },
                  { icon: "�️", label: t("gallery.tags.spiceGarden") },
                  { icon: "💎", label: t("gallery.tags.gemMuseum") },
                  { icon: "�", label: t("gallery.tags.teaPlantations") },
                  { icon: "🏄‍♂️", label: t("gallery.tags.surfing") },
                  { icon: "🦋", label: t("gallery.tags.rainforests") },
                  { icon: "🏯", label: t("gallery.tags.ancientCities") },
                  { icon: "🥥", label: t("gallery.tags.coconutGroves") },
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
