import { useLanguage } from "../hooks/useLanguage";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-[#075b95] text-white py-4 w-full">
      <nav className="flex flex-wrap justify-center gap-8 px-4 w-full">
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
    </header>
  );
};

export default Header;
