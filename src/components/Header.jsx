import { useLanguage } from "../hooks/useLanguage";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="w-full bg-transparent absolute z-50">
      <div className="logo-container-fixed">
        <button
          className="logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          aria-label="Scroll to top"
        >
          <img src="/logo.png" alt="Trust You Go Logo" className="logo-container h-12 sm:h-[5rem] w-auto" />
        </button>
      </div>
      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-8 items-center glass-social-container h-[5rem]">
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
    </header>
  );
};

export default Header;
