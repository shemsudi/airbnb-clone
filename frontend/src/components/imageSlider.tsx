import { HostedPlaces } from "../types/types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type ImageSliderProps = {
  host: HostedPlaces;
  index: number;
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
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="h-60 w-full ">
      <Link to={"/homes"}>
        <div
          className="flex h-60 w-full  transition-transform duration-300 ease-in-out  "
          style={{
            transform: `translateX(${-100 * currentIndex}%)`,
          }}
        >
          {host.photos!.map((photo, photoIndex) => (
            <img
              key={photoIndex}
              onMouseOver={() => handleMouseOver()}
              onMouseLeave={() => handleMouseLeave()}
              className="rounded-md object-cover w-full h-60 min-w-full min-h-full"
              src={photo}
              alt={host.title}
            />
          ))}
        </div>
      </Link>
      {isHovered && currentIndex !== 0 && (
        <button
          onMouseOver={() => setIsHovered(true)}
          onClick={(event) => {
            prevImage();
            event.stopPropagation();
          }}
          className="absolute focus:scale-90 hover:transform hover:scale-90 top-1/2 z-10 rounded-full bg-white w-8 h-8 flex items-center justify-center transform -translate-y-1/2 m-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {isHovered && currentIndex !== host.photos!.length - 1 && (
        <button
          onMouseOver={() => setIsHovered(true)}
          onClick={(event) => {
            nextImage();
            event.stopPropagation();
          }}
          className="absolute top-1/2 z-10 hover:transform hover:scale-90 rounded-full bg-white w-8 h-8 flex items-center justify-center transform -translate-y-1/2 right-0 m-2"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default ImageSlider;
