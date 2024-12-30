import { HostedPlaces } from "../types/types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type ImageSliderProps = {
  host: HostedPlaces;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ host }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, host.photos!.length - 1)
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div
      className="h-60 w-full relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/rooms/${host.uuid}`}>
        <div
          className="flex h-60 w-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${-100 * currentIndex}%)`,
          }}
        >
          {host.photos!.map((photo, photoIndex) => (
            <img
              key={photoIndex}
              className="rounded-md object-cover w-full h-60 min-w-full min-h-full"
              src={photo}
              alt={host.title}
            />
          ))}
        </div>
      </Link>

      {isHovered && currentIndex > 0 && (
        <button
          onClick={(event) => {
            prevImage();
            event.stopPropagation();
          }}
          className="absolute top-1/2  left-2 transform -translate-y-1/2 rounded-full bg-white w-8 h-8 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}

      {isHovered && currentIndex < host.photos!.length - 1 && (
        <button
          onClick={(event) => {
            nextImage();
            event.stopPropagation();
          }}
          className="absolute top-1/2  right-2 transform -translate-y-1/2 rounded-full bg-white w-8 h-8 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
