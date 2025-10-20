import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId) => {
    if (location.pathname === '/') {
      // If we're already on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      // If we're on another page, navigate to home with the section
      navigate(`/${sectionId}`);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            if (location.pathname === '/') {
              // Only update URL if we're on the home page
              window.history.replaceState(null, '', `/${entry.target.id}`);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDesktopNavIconClick = () => {
    setShowOtherNav(!showOtherNav);
    // setShowDesktopNavIcon(false);
  };

  return (
    <header className="w-full bg-transparent absolute z-50">
      <div className="logo-container-fixed">
        <button
          onClick={() => handleNavigation('home')}
          className="logo-btn"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
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
        <button
          onClick={() => handleNavigation('home')}
          className={`header-nav-link ${activeSection === 'home' ? 'active' : ''}`}
        >
          {t('nav.home')}
        </button>
        <button
          onClick={() => handleNavigation('about')}
          className={`header-nav-link ${activeSection === 'about' ? 'active' : ''}`}
        >
          {t('nav.about')}
        </button>
        <button
          onClick={() => handleNavigation('gallery')}
          className={`header-nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
        >
          {t('nav.gallery')}
        </button>
        <button
          onClick={() => handleNavigation('offers')}
          className={`header-nav-link ${activeSection === 'offers' ? 'active' : ''}`}
        >
          {t('nav.offers')}
        </button>
        <button
          onClick={() => handleNavigation('guides')}
          className={`header-nav-link ${activeSection === 'guides' ? 'active' : ''}`}
        >
          {t('nav.guides')}
        </button>
        <button
          onClick={() => handleNavigation('reviews')}
          className={`header-nav-link ${activeSection === 'reviews' ? 'active' : ''}`}
        >
          {t('nav.reviews')}
        </button>
        <button
          onClick={() => handleNavigation('contact')}
          className={`header-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
        >
          {t('nav.contact')}
        </button>
        <button
          onClick={() => handleNavigation('booking')}
          className={`header-nav-link ${activeSection === 'booking' ? 'active' : ''}`}
        >
          {t('nav.booking')}
        </button>
      </nav>

      {/* Other Navigation */}
      <nav
        className={`secondary-nav-panel ${
          showOtherNav ? 'flex' : 'hidden'
        } bg-[#075b95] text-white max-sm:mt-[4rem]`}
      >
        <button
          onClick={() => {
            handleNavigation('home');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'home' ? 'active' : ''}`}
        >
          {t('nav.home')}
        </button>
        <button
          onClick={() => {
            handleNavigation('about');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'about' ? 'active' : ''}`}
        >
          {t('nav.about')}
        </button>
        <button
          onClick={() => {
            handleNavigation('gallery');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'gallery' ? 'active' : ''}`}
        >
          {t('nav.gallery')}
        </button>
        <button
          onClick={() => {
            handleNavigation('offers');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'offers' ? 'active' : ''}`}
        >
          {t('nav.offers')}
        </button>
        <button
          onClick={() => {
            handleNavigation('guides');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'guides' ? 'active' : ''}`}
        >
          {t('nav.guides')}
        </button>
        <button
          onClick={() => {
            handleNavigation('reviews');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'reviews' ? 'active' : ''}`}
        >
          {t('nav.reviews')}
        </button>
        <button
          onClick={() => {
            handleNavigation('contact');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'contact' ? 'active' : ''}`}
        >
          {t('nav.contact')}
        </button>
        <button
          onClick={() => {
            handleNavigation('booking');
            setShowOtherNav(false);
          }}
          className={`p-[5px] ${activeSection === 'booking' ? 'active' : ''}`}
        >
          {t('nav.booking')}
        </button>
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
