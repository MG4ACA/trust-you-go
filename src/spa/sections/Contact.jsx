import { useLanguage } from '../hooks/useLanguage';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-2 bg-[#65b25f]/10 text-[#65b25f] font-semibold rounded-full text-xs sm:text-sm tracking-wide uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Ready to start your Sri Lankan adventure? We're here to help you plan the perfect
            journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 border border-gray-100">
            <form className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#65b25f] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#65b25f] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#65b25f] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tell us about your dream Sri Lankan adventure..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#65b25f] to-[#4a9043] hover:from-[#4a9043] hover:to-[#65b25f] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  {t('contact.send')}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-[#075b95] to-[#065a87] rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Let's Start Planning</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <a
                    href="https://maps.app.goo.gl/voKzbxFg41kufQeo9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 rounded-lg p-2 sm:p-3 hover:bg-white/30 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-white/80">No56, Aylesbury street, Niesden, London</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <a
                    href="https://maps.app.goo.gl/czM8JRYLqJGNgWaH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 rounded-lg p-2 sm:p-3 hover:bg-white/30 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-white/80">
                      No332/b, veenas, Batepola, Dunagaha, Negombo, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-white/80">+44 7 444 879 173</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-white/80">hello@trustyou-go.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Links */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-8 border border-gray-100">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Quick Response
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6">
                We typically respond within 2 hours during business hours
              </p>
              <div className="flex sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="text-center">
                  <div className="bg-[#65b25f]/10 rounded-full p-2 sm:p-3 inline-block mb-2">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#65b25f]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">2 Hours</div>
                  <div className="text-xs text-gray-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="bg-[#075b95]/10 rounded-full p-2 sm:p-3 inline-block mb-2">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-[#075b95]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
