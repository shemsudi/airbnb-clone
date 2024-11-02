import { useState, useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Helmet } from "react-helmet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import CustomSearchBar from "./Location-search";

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
  const [locationSet, setLocationSet] = useState(false);
  const [latitude, setLatitude] = useState(80);
  const [longitude, setLongitude] = useState(28);
  const [searchInput, setSearchInput] = useState("");

  const onNext = () => {
    navigate(`/became-a-host/${host.uuid}/floor-plan`);
  };

  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/privacyType`);
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        map.flyTo(e.latlng, map.getZoom());
        setLocationSet(true);
      },
      locationfound(e) {
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
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const handleSearch = async () => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchInput });
    if (results.length > 0) {
      const { y, x } = results[0];
      setLatitude(y);
      setLongitude(x);
      setLocationSet(true);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Enter the location - Airbnb</title>
      </Helmet>

      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />

      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="w-2/5 mb-4">
          <h1 className="text-3xl font-bold">Where's your place located?</h1>
          <p className="text-gray-500">
            Your address is only shared with guests after they’ve made a
            reservation.
          </p>
        </div>

        <MapContainer
          center={[latitude, longitude]}
          zoom={8}
          style={{
            height: "60vh",
            width: "40vw",
            borderRadius: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          <Marker position={[38, 8]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[51.05, 2, 4]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <CustomSearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
          />
        </MapContainer>
      </div>

      <FooterNavigation step={1} pos={3} onBack={onBack} onNext={onNext} />
    </div>
  );
};

export default LocationPage;
