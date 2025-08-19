import { useState } from "react";
import About from "./About";
import Booking from "./Booking";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import LanguageSelector from "./components/LanguageSelector";
import SocialMediaLinks from "./components/SocialMediaLinks";
import VideoBackground from "./components/VideoBackground";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Guides from "./Guides";
import { useLanguage } from "./hooks/useLanguage";
import Offers from "./Offers";
import Reviews from "./Reviews";

function App() {
  const { t } = useLanguage();
  const [isGalleryMode, setIsGalleryMode] = useState(false);

  const handleGalleryToggle = () => {
    setIsGalleryMode(!isGalleryMode);
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      <Header />
      <LanguageSelector />
      <SocialMediaLinks onGalleryToggle={handleGalleryToggle} isGalleryMode={isGalleryMode} />

      {/* Logo Border Overlay */}
      <div className="fixed inset-0 w-screen h-screen z-50 pointer-events-none flex items-center justify-center">
        <img src="/logo-border.png" alt="Logo Border" className="w-[70vw] object-cover p-[8rem]" />
      </div>

      {/* Hero Section with Video Background or Image Carousel */}
      <section id="home" className="relative">
        {isGalleryMode ? (
          <div className="h-screen w-full relative">
            <ImageCarousel overlay={true} />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl animate-fade-in">
                  {/* {t("hero.title")} */}
                </h1>
                <p className="mb-8 text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
                  {/* {t("hero.subtitle")} */}
                </p>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <a href="#about" className="text-white/80 hover:text-white transition-colors">
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <p className="text-sm mt-2">Scroll</p>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <VideoBackground
            videoSrc="/sigiriya_aerial.mp4"
            fallbackImage="/locations/segiriya-rock.jpg"
          >
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl animate-fade-in">
                {/* {t("hero.title")} */}
              </h1>
              <p className="mb-8 text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
                {/* {t("hero.subtitle")} */}
              </p>
              {/* <a
                href="#booking"
                className="inline-block bg-[#075b95]/90 hover:bg-[#65b25f]/90 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:transform hover:scale-105 shadow-2xl animate-fade-in-delay-2"
              >
                {t("hero.bookNow")}
              </a> */}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <p className="text-sm mt-2">Scroll</p>
              </a>
            </div>
          </VideoBackground>
        )}
      </section>

      {/* About Section */}
      <About />

      {/* Gallery Section */}
      <Gallery />

      {/* Offers Section */}
      <Offers />

      {/* Guides Section */}
      <Guides />

      {/* Reviews Section */}
      <Reviews />

      {/* Contact Section */}
      <Contact />

      {/* Booking Section */}
      <Booking />

      {/* Footer */}
      <footer className="bg-[#075b95] text-white text-center py-4 mt-8">
        {t("footer.copyright")}
      </footer>
    </div>
  );
}

export default App;
