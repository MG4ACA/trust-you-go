import { useEffect, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const Header = () => {
  const { t } = useLanguage();
  const [showOtherNav, setShowOtherNav] = useState(false);
  const [showDesktopNavIcon, setShowDesktopNavIcon] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 600) {
        setShowDesktopNavIcon(true);
      } else {
        setShowOtherNav(false);
        setShowDesktopNavIcon(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDesktopNavIconClick = () => {
    setShowOtherNav(!showOtherNav);
    // setShowDesktopNavIcon(false);
  };

  return (
    <header className="w-full bg-transparent absolute z-50">
      <div className="logo-container-fixed">
        <button
          className="logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          aria-label="Scroll to top"
        >
          <img
            src="/logo.png"
            alt="Trust You Go Logo"
            className="logo-container h-12 sm:h-[5rem] w-auto"
          />
        </button>
      </div>
      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:flex flex-wrap justify-center gap-8 items-center glass-social-container h-[5rem]`}
      >
        <a href="#home" className="header-nav-link">
          {t("nav.home")}
        </a>
        <a href="#about" className="header-nav-link">
          {t("nav.about")}
        </a>
        <a href="#gallery" className="header-nav-link">
          {t("nav.gallery")}
        </a>
        <a href="#offers" className="header-nav-link">
          {t("nav.offers")}
        </a>
        <a href="#guides" className="header-nav-link">
          {t("nav.guides")}
        </a>
        <a href="#reviews" className="header-nav-link">
          {t("nav.reviews")}
        </a>
        <a href="#contact" className="header-nav-link">
          {t("nav.contact")}
        </a>
        <a href="#booking" className="header-nav-link">
          {t("nav.booking")}
        </a>
      </nav>

      {/* Other Navigation */}
      <nav
        className={`secondary-nav-panel ${
          showOtherNav ? "flex" : "hidden"
        } bg-[#075b95] text-white  max-sm:mt-[4rem]`}
      >
        <a href="#home" className="p-[5px]">
          {t("nav.home")}
        </a>
        <a href="#about" className="p-[5px]">
          {t("nav.about")}
        </a>
        <a href="#gallery" className="p-[5px]">
          {t("nav.gallery")}
        </a>
        <a href="#offers" className="p-[5px]">
          {t("nav.offers")}
        </a>
        <a href="#guides" className="p-[5px]">
          {t("nav.guides")}
        </a>
        <a href="#reviews" className="p-[5px]">
          {t("nav.reviews")}
        </a>
        <a href="#contact" className="p-[5px]">
          {t("nav.contact")}
        </a>
        <a href="#booking" className="p-[5px]">
          {t("nav.booking")}
        </a>
      </nav>
      {/* Desktop Top-right icon to show nav when hidden */}
      {showDesktopNavIcon && (
        <button
          className="fixed top-4 right-4 z-[100] bg-white rounded-full shadow-lg p-2 border border-gray-200 hover:bg-gray-100 transition-colors lg:block hidden"
          onClick={handleDesktopNavIconClick}
          aria-label="Show navigation menu"
        >
          <svg
            className="w-7 h-7 text-[#075b95]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Mobile Top-right icon to show nav when hidden */}
      {
        <button
          className="max-sm:flex fixed top-4 right-4 z-[100] bg-white rounded-full shadow-lg p-2 border border-gray-200 hover:bg-gray-100 transition-colors  hidden"
          onClick={handleDesktopNavIconClick}
          aria-label="Show navigation menu"
        >
          <svg
            className="w-7 h-7 text-[#075b95]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      }
      {/* Mobile Navigation - Remains unchanged */}
      {/* ...existing code for mobile nav and overlay... */}
    </header>
  );
};

export default Header;
