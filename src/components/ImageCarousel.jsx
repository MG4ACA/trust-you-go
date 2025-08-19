import { useEffect, useState } from "react";

const ImageCarousel = ({ overlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/locations/beach-01.jpg",
    "/locations/mountains-01.jpg",
    "/locations/segiriya-rock.jpg",
    "/locations/tea-estate.jpg",
    "/locations/beach-02.jpg",
    "/locations/coconut-hill.jpg",
    "/locations/elephants.jpg",
    "/locations/fishing.jpg",
    "/locations/mountains-02.jpg",
    "/locations/nine-arch.jpg",
    "/locations/pinnawala.jpg",
    "/locations/segiriya-rock.jpg",
    "/locations/sthoopa.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // const goToPrevious = () => {
  //   setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  // };

  // const goToNext = () => {
  //   setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  // };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Images */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image} alt={`Location ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Overlay */}
        {overlay && <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>}
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-300 z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 transition-colors duration-300 z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button> */}

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-[200]">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#075b95]! scale-110"
                : "bg-[#075b95]/50! hover:bg-[#075b95]/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
