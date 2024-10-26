import { useState, useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPage: React.FC = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const navigate = useNavigate();
  const onNext = () => {
    navigate(`/became-a-host/${host.uuid}/floor-plan`);
  };
  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/privacyType`);
  };

  const [locationSet, setLocationSet] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
        setLocationSet(true);
      },
      locationfound(e: { latlng: { lat: number; lng: number } }) {
        if (!locationSet) {
          setLatitude(e.latlng.lat);
          setLongitude(e.latlng.lng);
          map.flyTo(e.latlng, map.getZoom());
          setLocationSet(true);
        }
      },
    });

    useEffect(() => {
      if (!locationSet) {
        map.locate();
      }
    }, [map, locationSet]);

    return (
      <Marker
        position={{
          lat: latitude,
          lng: longitude,
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <HostHeader />
      <div className="flex-1 flex justify-center">
        <MapContainer
          center={[latitude, longitude]}
          zoom={7}
          style={{ height: "60vh", width: "55vw" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <FooterNavigation step={1} pos={3} onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default LocationPage;
