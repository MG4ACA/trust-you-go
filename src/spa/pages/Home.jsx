import Header from '../components/Header';
import LanguageSelector from '../components/LanguageSelector';
import SocialMediaLinks from '../components/SocialMediaLinks';
import VideoBackground from '../components/VideoBackground';
import { useLanguage } from '../hooks/useLanguage';
import About from '../sections/About';
import Booking from '../sections/Booking';
import Contact from '../sections/Contact';
import Gallery from '../sections/Gallery';
import Packages from '../sections/Packages';
import Reviews from '../sections/Reviews';
import TravelGuides from '../sections/TravelGuides';
import useSEO from '../utils/useSEO';

const Home = () => {
  const { t } = useLanguage();
  useSEO({ title: t('site.title'), description: t('site.description') });

  return (
    <div className="main-container w-full bg-white text-gray-900 font-sans">
      <Header />
      <LanguageSelector />
      <SocialMediaLinks />

      {/* Logo Border Overlay */}
      <div className="fixed inset-0 w-screen h-screen z-50 pointer-events-none flex items-center justify-center">
        <img
          src="/g-outline.png"
          alt="Logo Border"
          className="w-[85vw] object-cover p-[8rem] opacity-[0.4]"
        />
      </div>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative">
        <VideoBackground videoSrc="/sl-clip.mp4" fallbackImage="/locations/segiriya-rock.jpg">
          {/* Scroll Indicator */}
          <a
            href="#about"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-yellow-400 transition-colors duration-300 z-20 animate-bounce"
          >
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <p className="text-sm mt-2">{t('home.scroll')}</p>
          </a>
        </VideoBackground>
      </section>

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Offers Section */}
      {/* <Offers /> */}

      {/* Packages Section */}
      <Packages />

      {/* Booking Section */}
      <Booking />

      {/* Contact Section */}
      <Contact />

      {/* Reviews Section */}
      <Reviews />

      {/* Travel Guides Section */}
      <TravelGuides />

      {/* Learn About Sri Lanka CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#075b95]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
                {t('home.cta.tag')}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('home.cta.title')}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('home.cta.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="bg-[#075b95]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.cards.0.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.cards.0.desc')}</p>
              </div>

              <div className="text-center p-4">
                <div className="bg-[#075b95]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🌿</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.cards.1.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.cards.1.desc')}</p>
              </div>

              <div className="text-center p-4">
                <div className="bg-[#075b95]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('home.cards.2.title')}</h4>
                <p className="text-sm text-gray-600">{t('home.cards.2.desc')}</p>
              </div>
            </div>

            <a
              href="/learn-about-sri-lanka"
              className="inline-flex items-center bg-gradient-to-r from-[#075b95] to-[#065a87] hover:from-[#065a87] hover:to-[#075b95] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 space-x-3 shadow-xl hover:shadow-2xl"
            >
              <span>{t('home.cta.button')}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#075b95] text-white text-center py-4 mt-8">
        {t('footer.copyright')}
      </footer>
    </div>
  );
};

export default Home;
