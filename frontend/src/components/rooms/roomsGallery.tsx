type RoomGalleryProps = {
  photos: string[] | undefined;
  structure: string | undefined;
};

const RoomGallery: React.FC<RoomGalleryProps> = ({ photos, structure }) => {
  return (
    <div className="grid md:px-8 xl:px-28 h-80 w-full gap-2 rounded-xl mb-5 grid-cols-4 grid-rows-2">
      {photos?.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={structure}
          className={`w-full h-full object-cover ${
            index === 0
              ? "col-span-2 row-span-2 rounded-s-lg"
              : index === 2
              ? "rounded-tr-lg"
              : index === 4
              ? "rounded-br-lg"
              : ""
          }`}
        />
      ))}
    </div>
  );
};

export default RoomGallery;
