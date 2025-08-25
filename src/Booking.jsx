import { useState } from "react";
import { useLanguage } from "./hooks/useLanguage";

const Booking = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "",
    message: "",
    activities: [],
    accommodation: "",
    selectedVehicle: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "activities") {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the inquiry to your backend
    console.log("Inquiry submitted:", formData);
    alert("Thank you for your inquiry! We will contact you within 24 hours.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      checkin: "",
      checkout: "",
      guests: "",
      message: "",
      activities: [],
      accommodation: "",
      selectedVehicle: "",
    });
  };

  // Populate form with sample data for testing
  const populateFormWithSampleData = () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    const formatDate = (date) => {
      return date.toISOString().split("T")[0];
    };

    setFormData({
      name: "John Doe",
      email: "john.doe@example.com",
      checkin: formatDate(nextMonth),
      checkout: formatDate(new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000)), // 7 days later
      guests: "2",
      message:
        "We are interested in experiencing authentic Sri Lankan culture and would love to visit ancient temples and enjoy local cuisine. Please suggest the best time to visit tea plantations.",
      activities: ["hiking", "temples", "tea", "wildlife"],
      accommodation: "comfort",
      selectedVehicle: "suv",
    });
  };

  return (
    <section id="booking" className="py-20 px-6 bg-gradient-to-br from-[#075b95]/10 ">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#075b95]/10 text-[#075b95] font-semibold rounded-full text-sm tracking-wide uppercase mb-4">
            Book Your Adventure
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("booking.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("booking.description")}</p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#075b95] to-[#065a87] px-8 py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Customize Your Trip</h3>
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
                  <span>Demo Data</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="booking-name"
                    className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                  >
                    {t("booking.name")}
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
                    {t("booking.email")}
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
                    {t("booking.checkin")}
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
                    {t("booking.checkout")}
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
                    {t("booking.guests")}
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
                  {t("booking.requests")}
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
                <h4 className="text-lg font-bold text-gray-900 mb-4">Customize Your Experience</h4>
                <p className="text-gray-600 mb-6">
                  Select the activities and experiences you'd like to include in your Sri Lankan
                  adventure
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Activity Categories */}
                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Adventure Activities</h5>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="hiking"
                          checked={formData.activities.includes("hiking")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Mountain Hiking & Trekking</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="wildlife"
                          checked={formData.activities.includes("wildlife")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Wildlife Safari (Yala National Park)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="watersports"
                          checked={formData.activities.includes("watersports")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Water Sports & Diving</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="cycling"
                          checked={formData.activities.includes("cycling")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Cycling Tours</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-gray-800">Cultural Experiences</h5>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="temples"
                          checked={formData.activities.includes("temples")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Ancient Temples & Heritage Sites</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="cooking"
                          checked={formData.activities.includes("cooking")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Cooking Classes</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="tea"
                          checked={formData.activities.includes("tea")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Tea Plantation Tours</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="activities"
                          value="festivals"
                          checked={formData.activities.includes("festivals")}
                          onChange={handleInputChange}
                          className="rounded text-[#075b95] focus:ring-[#075b95]"
                        />
                        <span className="text-gray-700">Local Festivals & Events</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Accommodation Preference */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-4">Accommodation Preference</h5>
                  <div className="grid md:grid-cols-3 gap-4">
                    <label className="relative">
                      <input
                        type="radio"
                        name="accommodation"
                        value="budget"
                        checked={formData.accommodation === "budget"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.accommodation === "budget"
                            ? "border-[#075b95] bg-[#075b95]/5"
                            : "border-gray-200 hover:border-[#075b95]"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-900">Budget</div>
                          <div className="text-xs text-gray-600">Guesthouses & Hostels</div>
                        </div>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="accommodation"
                        value="comfort"
                        checked={formData.accommodation === "comfort"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.accommodation === "comfort"
                            ? "border-[#075b95] bg-[#075b95]/5"
                            : "border-gray-200 hover:border-[#075b95]"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-900">Comfort</div>
                          <div className="text-xs text-gray-600">3-4 Star Hotels</div>
                        </div>
                      </div>
                    </label>
                    <label className="relative">
                      <input
                        type="radio"
                        name="accommodation"
                        value="luxury"
                        checked={formData.accommodation === "luxury"}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.accommodation === "luxury"
                            ? "border-[#075b95] bg-[#075b95]/5"
                            : "border-gray-200 hover:border-[#075b95]"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold text-gray-900">Luxury</div>
                          <div className="text-xs text-gray-600">5 Star Resorts</div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Transportation */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-4">Select Your Vehicle</h5>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose the vehicle that best suits your group size and comfort preferences
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-gray-200 max-sm:h-[40vh] max-sm:overflow-y-scroll">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Sedan */}
                      <label className="relative">
                        <input
                          type="radio"
                          name="selectedVehicle"
                          value="sedan"
                          checked={formData.selectedVehicle === "sedan"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.selectedVehicle === "sedan"
                              ? "border-[#075b95] bg-[#075b95]/5 shadow-md"
                              : "border-gray-200 hover:border-[#075b95] hover:shadow-sm"
                          }`}
                        >
                          <div className="text-center">
                            <img
                              src="/car-icon.png"
                              alt="Sedan"
                              className="mx-auto mb-2 w-10 h-10 object-contain"
                            />
                            <div className="text-sm font-semibold text-gray-900">Sedan</div>
                            <div className="text-xs text-gray-600 mb-2">Up to 3 passengers</div>
                            <div className="text-xs text-gray-500">Comfortable for city tours</div>
                          </div>
                        </div>
                      </label>

                      {/* SUV */}
                      <label className="relative">
                        <input
                          type="radio"
                          name="selectedVehicle"
                          value="suv"
                          checked={formData.selectedVehicle === "suv"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.selectedVehicle === "suv"
                              ? "border-[#075b95] bg-[#075b95]/5 shadow-md"
                              : "border-gray-200 hover:border-[#075b95] hover:shadow-sm"
                          }`}
                        >
                          <div className="text-center">
                            <img
                              src="/car-icon-02.png"
                              alt="SUV"
                              className="mx-auto mb-2 w-10 h-10 object-contain"
                            />
                            <div className="text-sm font-semibold text-gray-900">SUV</div>
                            <div className="text-xs text-gray-600 mb-2">Up to 6 passengers</div>
                            <div className="text-xs text-gray-500">Perfect for families</div>
                          </div>
                        </div>
                      </label>

                      {/* Van */}
                      <label className="relative">
                        <input
                          type="radio"
                          name="selectedVehicle"
                          value="van"
                          checked={formData.selectedVehicle === "van"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.selectedVehicle === "van"
                              ? "border-[#075b95] bg-[#075b95]/5 shadow-md"
                              : "border-gray-200 hover:border-[#075b95] hover:shadow-sm"
                          }`}
                        >
                          <div className="text-center">
                            <img
                              src="/van-icon-02.png"
                              alt="Van"
                              className="mx-auto mb-2 w-10 h-10 object-contain"
                            />
                            <div className="text-sm font-semibold text-gray-900">Van</div>
                            <div className="text-xs text-gray-600 mb-2">Up to 12 passengers</div>
                            <div className="text-xs text-gray-500">Great for large groups</div>
                          </div>
                        </div>
                      </label>

                      {/* Luxury Car */}
                      <label className="relative">
                        <input
                          type="radio"
                          name="selectedVehicle"
                          value="luxury"
                          checked={formData.selectedVehicle === "luxury"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.selectedVehicle === "luxury"
                              ? "border-[#075b95] bg-[#075b95]/5 shadow-md"
                              : "border-gray-200 hover:border-[#075b95] hover:shadow-sm"
                          }`}
                        >
                          <div className="text-center">
                            <img
                              src="/luxury-car.png"
                              alt="Luxury Car"
                              className="mx-auto mb-2 w-10 h-10 object-contain"
                            />
                            <div className="text-sm font-semibold text-gray-900">Luxury Car</div>
                            <div className="text-xs text-gray-600 mb-2">Up to 4 passengers</div>
                            <div className="text-xs text-gray-500">Premium comfort</div>
                          </div>
                        </div>
                      </label>

                      {/* Mini Bus */}
                      <label className="relative">
                        <input
                          type="radio"
                          name="selectedVehicle"
                          value="minibus"
                          checked={formData.selectedVehicle === "minibus"}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                            formData.selectedVehicle === "minibus"
                              ? "border-[#075b95] bg-[#075b95]/5 shadow-md"
                              : "border-gray-200 hover:border-[#075b95] hover:shadow-sm"
                          }`}
                        >
                          <div className="text-center">
                            <img
                              src="/bus-icon.png"
                              alt="Mini Bus"
                              className="mx-auto mb-2 w-10 h-10 object-contain"
                            />
                            <div className="text-sm font-semibold text-gray-900">Mini Bus</div>
                            <div className="text-xs text-gray-600 mb-2">Up to 20 passengers</div>
                            <div className="text-xs text-gray-500">For large tour groups</div>
                          </div>
                        </div>
                      </label>
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
                  Send My Inquiry
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
                <h4 className="text-xl font-bold text-gray-900 mb-4">What Happens Next?</h4>
                <div className="max-w-md mx-auto space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span>We'll review your requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span>Contact you within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#075b95]/10 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span>Discuss pricing & customize details</span>
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
              <span className="text-sm text-gray-600">Secure Booking</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm text-gray-600">Free Cancellation</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
