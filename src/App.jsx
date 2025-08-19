import { useState } from "react";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import SocialMediaLinks from "./components/SocialMediaLinks";
import VideoBackground from "./components/VideoBackground";
import ImageCarousel from "./components/ImageCarousel";
import { useLanguage } from "./hooks/useLanguage";

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
      <SocialMediaLinks 
        onGalleryToggle={handleGalleryToggle}
        isGalleryMode={isGalleryMode}
      />

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
      <section id="about" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">{t("about.title")}</h2>
        <p className="mb-2">{t("about.text1")}</p>
        <p>{t("about.text2")}</p>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("gallery.title")}</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <img
            src="/locations/beach-01.jpg"
            alt="Beach 1"
            className="w-full max-w-xs rounded shadow"
          />
          <img
            src="/locations/mountains-01.jpg"
            alt="Mountains 1"
            className="w-full max-w-xs rounded shadow"
          />
          <img
            src="/locations/segiriya-rock.jpg"
            alt="Sigiriya Rock"
            className="w-full max-w-xs rounded shadow"
          />
          <img
            src="/locations/tea-estate.jpg"
            alt="Tea Estate"
            className="w-full max-w-xs rounded shadow"
          />
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("offers.title")}</h2>
        <div className="mb-6">
          <h3 className="font-bold">{t("offers.summer.title")}</h3>
          <p>{t("offers.summer.desc")}</p>
          <a
            href="#booking"
            className="inline-block mt-2 bg-[#075b95] hover:bg-[#65b25f] text-white px-4 py-1 rounded font-bold transition"
          >
            {t("hero.bookNow")}
          </a>
        </div>
        <div>
          <h3 className="font-bold">{t("offers.earlyBird.title")}</h3>
          <p>{t("offers.earlyBird.desc")}</p>
          <a
            href="#booking"
            className="inline-block mt-2 bg-[#075b95] hover:bg-[#65b25f] text-white px-4 py-1 rounded font-bold transition"
          >
            {t("hero.bookNow")}
          </a>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("guides.title")}</h2>
        <div className="mb-6">
          <h3 className="font-bold">{t("guides.destinations.title")}</h3>
          <ul className="list-disc list-inside">
            <li>{t("guides.destinations.kandy")}</li>
            <li>{t("guides.destinations.galle")}</li>
            <li>{t("guides.destinations.sigiriya")}</li>
            <li>{t("guides.destinations.yala")}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">{t("guides.tips.title")}</h3>
          <ul className="list-disc list-inside">
            <li>{t("guides.tips.bestTime")}</li>
            <li>{t("guides.tips.currency")}</li>
            <li>{t("guides.tips.language")}</li>
          </ul>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("reviews.title")}</h2>
        <blockquote className="mb-4 border-l-4 border-[#075b95] pl-4 italic">
          "{t("reviews.review1")}"
          <br />
          <strong>- Priya S.</strong>
        </blockquote>
        <blockquote className="mb-4 border-l-4 border-[#075b95] pl-4 italic">
          "{t("reviews.review2")}"
          <br />
          <strong>- John D.</strong>
        </blockquote>
        <blockquote className="border-l-4 border-[#075b95] pl-4 italic">
          "{t("reviews.review3")}"
          <br />
          <strong>- Ayesha R.</strong>
        </blockquote>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("contact.title")}</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block font-bold">
              {t("contact.name")}
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block font-bold">
              {t("contact.email")}
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-bold">
              {t("contact.message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-[#075b95] hover:bg-[#65b25f] text-white px-6 py-2 rounded font-bold transition"
          >
            {t("contact.send")}
          </button>
        </form>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{t("booking.title")}</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="booking-name" className="block font-bold">
              {t("booking.name")}
            </label>
            <input
              type="text"
              id="booking-name"
              name="name"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="block font-bold">
              {t("booking.email")}
            </label>
            <input
              type="email"
              id="booking-email"
              name="email"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="checkin" className="block font-bold">
              {t("booking.checkin")}
            </label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="checkout" className="block font-bold">
              {t("booking.checkout")}
            </label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="guests" className="block font-bold">
              {t("booking.guests")}
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="booking-message" className="block font-bold">
              {t("booking.requests")}
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows="4"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-[#075b95] hover:bg-[#65b25f] text-white px-6 py-2 rounded font-bold transition"
          >
            {t("booking.bookNow")}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#075b95] text-white text-center py-4 mt-8">
        {t("footer.copyright")}
      </footer>
    </div>
  );
}

export default App;
