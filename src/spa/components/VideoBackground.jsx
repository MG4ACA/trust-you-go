import { useState } from "react";

const VideoBackground = ({ videoSrc, children, overlay = true, fallbackImage = null }) => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
    console.error("Video failed to load:", videoSrc);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background or Fallback */}
      {!videoError ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#65b25f] via-[#075b95] to-[#4a9043] z-0"
          style={{
            backgroundImage: fallbackImage ? `url(${fallbackImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      {/* Overlay */}
      {overlay && <div className="absolute top-0 left-0 w-full h-full z-10"></div>}

      {/* Content */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-white">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
