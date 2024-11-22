import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "../../types/types";

type LocationOfPlaceProps = {
  location: Location;
};

const LocationOfPlace: React.FC<LocationOfPlaceProps> = ({ location }) => {
  return (
    <div
      id="location"
      className="mx-4 box-border mt-4 flex flex-col gap-6 md:mx-10 xl:mx-32 pb-5"
    >
      <h1 className="text-3xl font-medium">Where you'll be</h1>
      <MapContainer
        center={[
          location ? location.coordinates.lat : 0,
          location ? location.coordinates.lng : 0,
        ]}
        zoom={13}
        className="w-auto h-96 "
        style={{
          borderRadius: "1rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{
            lat: location ? location.coordinates.lat : 0,
            lng: location ? location.coordinates.lng : 0,
          }}
        >
          <Popup>You are here</Popup>
        </Marker>{" "}
      </MapContainer>
      <div className="flex flex-col gap-4">
        <div className="font-medium">
          {location?.city},{location?.province},{location?.country}
        </div>
        <p className="text-gray-700 font-medium">
          Bairro Campo Redondo is located at 1500 meters of altitude.
          <br /> 32 km from Itamonte, being between two important parks: Serra
          do Papagaio State Park and Itatiaia National Park. Belonging to the
          municipality of Itamonte, MG...
        </p>

        <button className="underline self-start font-normal hover:font-medium">
          Show more
        </button>
      </div>
    </div>
  );
};

export default LocationOfPlace;
