import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />

      {/* Hero Section */}
      <section id="home" className="bg-[#65b25f] text-white py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Trust You Go</h1>
        <p className="mb-6 text-lg">Your gateway to unforgettable Sri Lankan travel experiences.</p>
        <a href="#booking" className="inline-block bg-[#075b95] hover:bg-[#65b25f] text-white px-6 py-2 rounded font-bold transition">Book Now</a>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">About Trust You Go</h2>
        <p className="mb-2">Trust You Go is dedicated to providing the best travel experiences in Sri Lanka. Our team curates unique journeys, exclusive offers, and expert travel guides to help you explore the island with confidence.</p>
        <p>We believe in authentic hospitality, memorable adventures, and making every trip special.</p>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <img src="/locations/beach-01.jpg" alt="Beach 1" className="w-full max-w-xs rounded shadow" />
          <img src="/locations/mountains-01.jpg" alt="Mountains 1" className="w-full max-w-xs rounded shadow" />
          <img src="/locations/segiriya-rock.jpg" alt="Sigiriya Rock" className="w-full max-w-xs rounded shadow" />
          <img src="/locations/tea-estate.jpg" alt="Tea Estate" className="w-full max-w-xs rounded shadow" />
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
        <div className="mb-6">
          <h3 className="font-bold">Summer Special</h3>
          <p>Enjoy 20% off on selected destinations. Limited time only!</p>
          <a href="#booking" className="inline-block mt-2 bg-[#075b95] hover:bg-[#65b25f] text-white px-4 py-1 rounded font-bold transition">Book Now</a>
        </div>
        <div>
          <h3 className="font-bold">Early Bird</h3>
          <p>Book in advance and get exclusive discounts for your next adventure.</p>
          <a href="#booking" className="inline-block mt-2 bg-[#075b95] hover:bg-[#65b25f] text-white px-4 py-1 rounded font-bold transition">Book Now</a>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Travel Guides</h2>
        <div className="mb-6">
          <h3 className="font-bold">Top Destinations</h3>
          <ul className="list-disc list-inside">
            <li><strong>Kandy:</strong> Explore the cultural capital of Sri Lanka.</li>
            <li><strong>Galle:</strong> Discover colonial history and beautiful beaches.</li>
            <li><strong>Sigiriya:</strong> Climb the ancient rock fortress.</li>
            <li><strong>Yala:</strong> Experience wildlife and safaris.</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Travel Tips</h3>
          <ul className="list-disc list-inside">
            <li>Best time to visit: December to April</li>
            <li>Local currency: Sri Lankan Rupee (LKR)</li>
            <li>Language: Sinhala, Tamil, English</li>
          </ul>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
        <blockquote className="mb-4 border-l-4 border-[#075b95] pl-4 italic">
          "Amazing experience! The guides were knowledgeable and the trip was unforgettable."<br />
          <strong>- Priya S.</strong>
        </blockquote>
        <blockquote className="mb-4 border-l-4 border-[#075b95] pl-4 italic">
          "Loved the offers and the booking process was super easy!"<br />
          <strong>- John D.</strong>
        </blockquote>
        <blockquote className="border-l-4 border-[#075b95] pl-4 italic">
          "Beautiful gallery and great travel tips. Highly recommend Trust You Go!"<br />
          <strong>- Ayesha R.</strong>
        </blockquote>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-bold">Name:</label>
            <input type="text" id="name" name="name" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block font-bold">Email:</label>
            <input type="email" id="email" name="email" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block font-bold">Message:</label>
            <textarea id="message" name="message" rows="5" required className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-[#075b95] hover:bg-[#65b25f] text-white px-6 py-2 rounded font-bold transition">Send</button>
        </form>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-bold">Name:</label>
            <input type="text" id="name" name="name" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="email" className="block font-bold">Email:</label>
            <input type="email" id="email" name="email" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="checkin" className="block font-bold">Check-in Date:</label>
            <input type="date" id="checkin" name="checkin" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="checkout" className="block font-bold">Check-out Date:</label>
            <input type="date" id="checkout" name="checkout" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="guests" className="block font-bold">Number of Guests:</label>
            <input type="number" id="guests" name="guests" min="1" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label htmlFor="message" className="block font-bold">Additional Requests:</label>
            <textarea id="message" name="message" rows="4" className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-[#075b95] hover:bg-[#65b25f] text-white px-6 py-2 rounded font-bold transition">Book Now</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#075b95] text-white text-center py-4 mt-8">
        &copy; 2025 Trust You Go. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
