import DiscoverTips from "../DiscoverTips";
import Header from "../components/Header";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../hooks/useLanguage";
import LearnMore from "../LearnMore";

const LearnAboutSriLanka = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      <Header />
      <LanguageSelector />
      
      {/* Page Header */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#075b95]/10 via-white to-[#65b25f]/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Comprehensive Guide
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn About Sri Lanka
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive deep into the rich culture, fascinating history, and incredible natural wonders of the Pearl of the Indian Ocean. 
            Our comprehensive guide will help you understand and appreciate every aspect of this beautiful island nation.
          </p>
          
          {/* Navigation breadcrumb */}
          <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
            <a href="/" className="hover:text-[#075b95] transition-colors">Home</a>
            <span>›</span>
            <span className="text-[#075b95] font-medium">Learn About Sri Lanka</span>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <LearnMore />

      {/* Discover Tips Section */}
      <DiscoverTips />

      {/* Back to Home CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#075b95] to-[#065a87]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Plan Your Sri Lankan Adventure?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Now that you've learned about Sri Lanka, let's start planning your perfect trip with our expert travel services.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center bg-white text-[#075b95] hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home & Book Your Trip</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#075b95] text-white text-center py-4">
        {t("footer.copyright")}
      </footer>
    </div>
  );
};

export default LearnAboutSriLanka;
