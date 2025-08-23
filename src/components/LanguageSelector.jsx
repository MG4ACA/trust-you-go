import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Simple language options with just letters/icons
  const languages = [
    { code: "en", display: "EN" },
    { code: "ja", display: "日" },
    { code: "ta", display: "த" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 bg-[#075b95] text-white rounded-full shadow-lg hover:bg-[#65b25f] transition-colors"
      >
        {/* Globe Icon */}
        <span className="text-sm font-medium">{currentLanguage?.display}</span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Simple Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 rounded shadow-lg">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`block w-[3rem] h-[3rem] rounded-[2rem]! text-center hover:bg-gray-50 transition-colors ${
                language === lang.code
                  ? "bg-[#075b95] text-white hover:bg-[#075b95]"
                  : "text-gray-700"
              }`}
            >
              {lang.display}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
