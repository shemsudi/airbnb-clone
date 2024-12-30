import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { Location } from "../types/types";

interface MapProps {
  setLocation: (value: React.SetStateAction<Location>) => void;
  location: Location;
  height: string;
  width?: string;
}

const Map: React.FC<MapProps> = ({ setLocation, location, height, width }) => {
  const [locationSet, setLocationSet] = useState(false);

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e) {
        setLocation((prevLocation) => ({
          ...prevLocation,
          coordinates: {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        }));

        map.flyTo(e.latlng, map.getZoom());
        setLocationSet(true);
      },
      locationfound(e) {
        if (!locationSet) {
          setLocation({
            ...location,
            coordinates: {
              lat: e.latlng.lat,
              lng: e.latlng.lng,
            },
          });
          map.flyTo(e.latlng, map.getZoom());
          setLocationSet(true);
        }
      },
    });

    useEffect(() => {
      if (!locationSet) {
        map.locate();
      }
    }, [map]);

    return (
      <Marker
        position={{
          lat: location?.coordinates?.lat || 0,
          lng: location?.coordinates?.lng || 0,
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  return (
    <MapContainer
      center={[
        location?.coordinates?.lat || 0,
        location?.coordinates?.lng || 0,
      ]}
      zoom={13}
      style={{
        height: height,
        width: width,
        borderRadius: "1rem",
        position: "relative",
        zIndex: -10,
        marginBottom: "2rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
