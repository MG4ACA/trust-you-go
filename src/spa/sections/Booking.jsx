import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { packagesData } from '../../data/packagesData';
import { sendBookingEmail } from '../../services/emailService';
import { useLanguage } from '../hooks/useLanguage';
import useSEO from '../utils/useSEO';

const Booking = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage || '';
  const toast = useRef(null);

  useSEO({ title: t('booking.seo.title'), description: t('booking.seo.description') });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: '',
    message: '',
    activities: [],
    accommodation: '',
    selectedVehicle: '',
    package: selectedPackage,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'activities') {
        setFormData((prev) => ({
          ...prev,
          [name]: checked ? [...prev[name], value] : prev[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      selected_package: formData.package || 'No package selected',
      checkin_date: formData.checkin,
      checkout_date: formData.checkout,
      number_of_guests: formData.guests,
      accommodation_type: formData.accommodation || 'Not specified',
      selected_vehicle: formData.selectedVehicle || 'Not specified',
      selected_activities: formData.activities.join(', ') || 'None',
      additional_message: formData.message || 'No additional message',
    };


    try {
      // Send booking email using the email service
      const response = await sendBookingEmail(templateParams);

      if (response.success) {
        toast.current.show({
          severity: 'success',
          summary: 'Booking Inquiry Sent',
          detail: 'Thank you for your inquiry! We will contact you within 24 hours.',
          life: 5000,
        });

        // Reset form on success
        setFormData({
          name: '',
          email: '',
          checkin: '',
          checkout: '',
          guests: '',
          message: '',
          activities: [],
          accommodation: '',
          selectedVehicle: '',
          package: selectedPackage,
        });
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail:
          'Sorry, there was an error sending your inquiry. Please try again or contact us directly.',
        life: 5000,
      });
    }
  };

  // Populate form with sample data for testing
  const populateFormWithSampleData = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    setFormData({
      name: 'John Doe',
      email: 'john.doe@example.com',
      checkin: formatDate(nextMonth),
      checkout: formatDate(new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000)), // 7 days later
      guests: '2',
      message:
        'We are interested in experiencing authentic Sri Lankan culture and would love to visit ancient temples and enjoy local cuisine. Please suggest the best time to visit tea plantations.',
      activities: ['hiking', 'temples', 'tea', 'wildlife'],
      accommodation: 'comfort',
      selectedVehicle: 'suv',
      package: selectedPackage,
    });
  };

  return (
    <section id="booking" className="py-20 px-6 bg-gradient-to-br from-[#075b95]/10 ">
      <Toast ref={toast} />
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            {t('booking.tag')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('booking.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('booking.description')}</p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#075b95] to-[#065a87] px-8 py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{t('booking.customize.title')}</h3>
              {/* demo data button */}
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={populateFormWithSampleData}
                  className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  title="Fill form with sample data"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span>{t('booking.demoData')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Package Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {t('booking.selectPackage') || 'Select Package'} (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto p-2">
                  {packagesData.map((pkg, index) => {
                    const packageInfo = t(`packages.items.${index}`);
                    const isSelected = formData.package === packageInfo.name;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            package: isSelected ? '' : packageInfo.name,
                          }));
                        }}
                        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'ring-4 ring-[#075b95] shadow-xl scale-105'
                            : 'hover:shadow-lg hover:scale-102 ring-2 ring-gray-200'
                        }`}
                      >
                        {/* Package Image */}
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={`/package-locations/${pkg.locationFolders[0]}/${pkg.images[0]}`}
                            alt={packageInfo.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-[#075b95] text-white rounded-full p-2">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}

                          {/* Package Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <h4 className="font-bold text-sm mb-1 line-clamp-2">
                              {packageInfo.name}
                            </h4>
                            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-semibold">
                              {packageInfo.duration} {t('packages.days')}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {formData.package && (
                  <div className="flex items-center gap-2 p-3 bg-[#075b95]/10 rounded-lg">
                    <svg
                      className="w-5 h-5 text-[#075b95]"
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
                    <span className="text-sm font-semibold text-[#075b95]">
                      Selected: {formData.package}
                    </span>
                  </div>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t('booking.name')}
                  </label>
                  <input
                    type="text"
                    id="booking-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="booking-email"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t('booking.email')}
                  </label>
                  <input
                    type="email"
                    id="booking-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Travel Dates */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="checkin"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t('booking.checkin')}
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    name="checkin"
                    value={formData.checkin}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="checkout"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t('booking.checkout')}
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    name="checkout"
                    value={formData.checkout}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="guests"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t('booking.guests')}
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label
                  htmlFor="booking-message"
                  className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  {t('booking.requests')}
                </label>
                <textarea
                  id="booking-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#075b95] focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Any special requests or preferences for your trip..."
                />
              </div>

              {/* Customize Your Package */}
              <div className="bg-gray-50 rounded-2xl p-6 max-sm:p-1">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  {t('booking.customize.experienceTitle')}
                </h4>
                <p className="text-gray-600 mb-6">{t('booking.customize.experienceDescription')}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Activity Categories */}
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">
                      {t('booking.activities.adventureTitle')}
                    </h5>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="hiking"
                          checked={formData.activities.includes('hiking')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.hiking')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="wildlife"
                          checked={formData.activities.includes('wildlife')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.wildlife')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="watersports"
                          checked={formData.activities.includes('watersports')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.watersports')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="cycling"
                          checked={formData.activities.includes('cycling')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.cycling')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">
                      {t('booking.activities.culturalTitle')}
                    </h5>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="temples"
                          checked={formData.activities.includes('temples')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.temples')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="cooking"
                          checked={formData.activities.includes('cooking')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.cooking')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="tea"
                          checked={formData.activities.includes('tea')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.tea')}</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="festivals"
                          checked={formData.activities.includes('festivals')}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">{t('booking.activities.festivals')}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Accommodation Preference */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-gray-800">Accommodation Preference</h5>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          accommodation: prev.accommodation === 'budget' ? '' : 'budget',
                        }));
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.accommodation === 'budget'
                          ? 'border-[#075b95] bg-[#075b95]/5'
                          : 'border-gray-200 hover:border-[#075b95]'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {t('booking.accommodation.budget')}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t('booking.accommodation.budgetDesc')}
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          accommodation: prev.accommodation === 'comfort' ? '' : 'comfort',
                        }));
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.accommodation === 'comfort'
                          ? 'border-[#075b95] bg-[#075b95]/5'
                          : 'border-gray-200 hover:border-[#075b95]'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {t('booking.accommodation.comfort')}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t('booking.accommodation.comfortDesc')}
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          accommodation: prev.accommodation === 'luxury' ? '' : 'luxury',
                        }));
                      }}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.accommodation === 'luxury'
                          ? 'border-[#075b95] bg-[#075b95]/5'
                          : 'border-gray-200 hover:border-[#075b95]'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {t('booking.accommodation.luxury')}
                        </div>
                        <div className="text-xs text-gray-600">
                          {t('booking.accommodation.luxuryDesc')}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Transportation */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800">{t('booking.vehicles.title')}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('booking.vehicles.description')}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 max-sm:h-[40vh] max-sm:overflow-y-scroll">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Sedan */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle: prev.selectedVehicle === 'sedan' ? '' : 'sedan',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'sedan'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/car-icon.png"
                            alt={t('booking.vehicles.sedan')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.sedan')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.sedanDesc')}
                          </div>
                        </div>
                      </button>

                      {/* SUV */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle: prev.selectedVehicle === 'suv' ? '' : 'suv',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'suv'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/car-icon-02.png"
                            alt={t('booking.vehicles.suv')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.suv')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.suvDesc')}
                          </div>
                        </div>
                      </button>

                      {/* Van */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle: prev.selectedVehicle === 'van' ? '' : 'van',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'van'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/van-icon-02.png"
                            alt={t('booking.vehicles.van')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.van')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.vanDesc')}
                          </div>
                        </div>
                      </button>

                      {/* Luxury Car */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle: prev.selectedVehicle === 'luxury' ? '' : 'luxury',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'luxury'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/luxury-car.png"
                            alt={t('booking.vehicles.luxury')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.luxury')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.luxuryDesc')}
                          </div>
                        </div>
                      </button>

                      {/* Mini Bus */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle: prev.selectedVehicle === 'minibus' ? '' : 'minibus',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'minibus'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/bus-icon.png"
                            alt={t('booking.vehicles.minibus')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.minibus')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.minibusDesc')}
                          </div>
                        </div>
                      </button>

                      {/* Under luggage Bus */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVehicle:
                              prev.selectedVehicle === 'under-luggage-bus'
                                ? ''
                                : 'under-luggage-bus',
                          }));
                        }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          formData.selectedVehicle === 'under-luggage-bus'
                            ? 'border-[#075b95] bg-[#075b95]/5 shadow-md'
                            : 'border-gray-200 hover:border-[#075b95] hover:shadow-sm'
                        }`}
                      >
                        <div className="text-center">
                          <img
                            src="/bus-icon.png"
                            alt={t('booking.vehicles.underLuggageBus')}
                            className="mx-auto mb-2 w-10 h-10 object-contain"
                          />
                          <div className="text-sm font-semibold text-gray-900">
                            {t('booking.vehicles.underLuggageBus')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {t('booking.vehicles.underLuggageBusDesc')}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-[#65b25f] to-[#4a9043] hover:from-[#4a9043] hover:to-[#65b25f] text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <svg
                    className="w-6 h-6 mr-3"
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
                  {t('booking.tag')}
                </button>
              </div>
            </form>
            {/* What Happens Next */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl border-2 border-[#075b95]/20 p-8 max-w-xl mx-auto mb-8">
                <div className="bg-[#075b95]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#075b95] mx-auto"
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
                <h4 className="text-xl font-bold text-gray-900 mb-4">{t('booking.next.title')}</h4>
                <div className="max-w-md mx-auto space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-[#075b95] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span>{t('booking.next.step1')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-[#075b95] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span>{t('booking.next.step2')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-[#075b95] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span>{t('booking.next.step3')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-2xl shadow-lg px-8 py-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm text-gray-600">{t('booking.badges.secure')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm text-gray-600">{t('booking.badges.freeCancel')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm text-gray-600">{t('booking.badges.support')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
