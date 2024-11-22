import React, { useEffect, useRef } from "react";
import RoomGallery from "./roomsGallery";

interface GallerySectionProps {
  title: string;
  photos: string[];
  structure: string;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  photos,
  structure,
  setShowHeader,
}) => {
  const endOfGallery = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowHeader(
            !entry.isIntersecting && entry.boundingClientRect.top < 0
          );
        });
      },
      { threshold: 0.1 }
    );

    if (endOfGallery.current) {
      observer.observe(endOfGallery.current);
    }

    return () => {
      if (endOfGallery.current) {
        observer.unobserve(endOfGallery.current);
      }
    };
  }, []);
  return (
    <div ref={endOfGallery} id="photos" className="flex flex-col">
      <div className="flex justify-between mx-4 md:mx-8 xl:mx-28 pt-6 pb-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="flex gap-5">
          <span>share</span>
          <span>save</span>
        </div>
      </div>
      <RoomGallery photos={photos} structure={structure} />
    </div>
  );
};

export default GallerySection;
