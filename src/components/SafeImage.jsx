"use client";
import Image from "next/image";
import { useState } from "react";

const SafeImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Handle image loading errors
  const handleImageError = () => {
    console.log(`Image failed to load: ${src}`);
    setImageError(true);
    // Try alternative path
    if (!imageSrc.startsWith("/public/")) {
      setImageSrc(`/public${src}`);
    }
  };

  // If image fails, show a fallback
  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-700 rounded ${className}`}
        style={{ width: width, height: height }}
      >
        <span className="text-white font-bold text-xl">WL</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleImageError}
      onLoadingComplete={() => console.log(`Image loaded successfully: ${src}`)}
      {...props}
    />
  );
};

export default SafeImage;
