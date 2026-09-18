import ImageCarousel from '../components/ImageCarousel';
import { useLanguage } from '../hooks/useLanguage';
import useSEO from '../utils/useSEO';

const Gallery = () => {
  const { t } = useLanguage();
  useSEO({ title: t('gallery.seo.title'), description: t('gallery.seo.description') });

  const galleryTags = [
    { icon: '🏖️', label: t('gallery.tags.beaches') },
    { icon: '🏔️', label: t('gallery.tags.mountains') },
    { icon: '🐘', label: t('gallery.tags.wildlife') },
    { icon: '🏛️', label: t('gallery.tags.heritage') },
    { icon: '🌿', label: t('gallery.tags.nature') },
    { icon: '🌱', label: t('gallery.tags.spiceGarden') },
    { icon: '💎', label: t('gallery.tags.gemMuseum') },
    { icon: '🍵', label: t('gallery.tags.teaPlantations') },
    { icon: '🏄‍♂️', label: t('gallery.tags.surfing') },
    { icon: '🦋', label: t('gallery.tags.rainforests') },
    { icon: '🏯', label: t('gallery.tags.ancientCities') },
    { icon: '🥥', label: t('gallery.tags.coconutGroves') },
  ];

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-b">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t('gallery.exploreTag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('gallery.description')}</p>
        </div>

        {/* Gallery Carousel */}
        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-3xl overflow-hidden shadow-2xl">
          <ImageCarousel overlay={false} />

          {/* Gallery Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8 z-20">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 drop-shadow-md">
                {t('gallery.experienceTitle')}
              </h3>
              <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-5 max-w-2xl mx-auto line-clamp-2 md:line-clamp-none drop-shadow-xs">
                {t('gallery.experienceDesc')}
              </p>

              {/* Animated Right-to-Left Gliding Marquee Tag Ribbon */}
              <div className="relative w-full overflow-hidden mt-2 pt-1">
                {/* Edge fade masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black/60 to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee gap-2.5 md:gap-3 py-1">
                  {[...galleryTags, ...galleryTags].map((item, idx) => (
                    <span
                      key={`${item.label}-${idx}`}
                      className="shrink-0 px-3.5 py-1.5 md:px-4 md:py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white text-xs md:text-sm font-medium border border-white/25 shadow-sm transition-all duration-200 cursor-default select-none flex items-center gap-1.5"
                    >
                      <span>{item.icon}</span>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
