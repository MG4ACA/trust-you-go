import { useLanguage } from "./hooks/useLanguage";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
                  About Us
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {t("about.title")}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">{t("about.content")}</p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#075b95]/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">{t("about.trusted")}</span>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-64 md:h-auto">
              <img
                src="/locations/segiriya-rock.jpg"
                alt="About Us"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#075b95]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
