import React from "react";

const Header = () => (
  <header className="bg-[#075b95] text-white py-4">
    <nav className="flex flex-wrap justify-center gap-8">
      <a href="#home" className="font-bold hover:text-[#65b25f]">Home</a>
      <a href="#about" className="font-bold hover:text-[#65b25f]">About</a>
      <a href="#gallery" className="font-bold hover:text-[#65b25f]">Gallery</a>
      <a href="#offers" className="font-bold hover:text-[#65b25f]">Offers</a>
      <a href="#guides" className="font-bold hover:text-[#65b25f]">Travel Guides</a>
      <a href="#reviews" className="font-bold hover:text-[#65b25f]">Reviews</a>
      <a href="#contact" className="font-bold hover:text-[#65b25f]">Contact</a>
      <a href="#booking" className="font-bold hover:text-[#65b25f]">Booking</a>
    </nav>
  </header>
);

export default Header;
