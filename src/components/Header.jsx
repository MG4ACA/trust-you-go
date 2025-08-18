import { useLanguage } from "../hooks/useLanguage";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="py-4 w-full bg-transparent absolute z-10">
      <div className="flex items-center justify-between px-4 w-full">
        {/* Logo */}
        <div className="">
          <img src="/logo.svg" alt="Trust You Go Logo" className="h-[5rem] w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-8">
          <a href="#home" className="font-bold hover:text-[#65b25f]">
            {t("nav.home")}
          </a>
          <a href="#about" className="font-bold hover:text-[#65b25f]">
            {t("nav.about")}
          </a>
          <a href="#gallery" className="font-bold hover:text-[#65b25f]">
            {t("nav.gallery")}
          </a>
          <a href="#offers" className="font-bold hover:text-[#65b25f]">
            {t("nav.offers")}
          </a>
          <a href="#guides" className="font-bold hover:text-[#65b25f]">
            {t("nav.guides")}
          </a>
          <a href="#reviews" className="font-bold hover:text-[#65b25f]">
            {t("nav.reviews")}
          </a>
          <a href="#contact" className="font-bold hover:text-[#65b25f]">
            {t("nav.contact")}
          </a>
          <a href="#booking" className="font-bold hover:text-[#65b25f]">
            {t("nav.booking")}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
