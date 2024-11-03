import { ChangeEvent, useState, useEffect } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";
import { countryCodes } from "../modal/countrySelect";
import { updateLocation } from "../redux/hostActions";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationInput from "../components/hostingSteps/locationInput";

const LocationPage: React.FC = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [locationSet, setLocationSet] = useState(false);
  const [step1, setStep1] = useState(true);
  const [location, setLocation] = useState(
    host.location || {
      latitude: 80,
      longitude: 28,
      country: "Ethiopia",
      address: "",
      floor: "",
      city: "",
      province: "",
      postalCode: "",
    }
  );
  // const itemSelected = Boolean(
  //   !step1 &&
  //     location.address &&
  //     location.city &&
  //     location.province &&
  //     location.postalCode
  // );

  const onNext = () => {
    if (step1) {
      setStep1(false);
      return;
    }
    dispatch(updateLocation({ uuid: host.uuid!, location: location }));
    navigate(`/became-a-host/${host.uuid}/floor-plan`);
  };
  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost) {
      setLocation(currentHost.location);
    }
  }, []);

  const onBack = () => {
    navigate(`/became-a-host/${host.uuid}/privacyType`);
  };

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e) {
        setLocation({
          ...location,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });

        map.flyTo(e.latlng, map.getZoom());
        setLocationSet(true);
      },
      locationfound(e) {
        if (!locationSet) {
          setLocation({
            ...location,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
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
    }, [map, locationSet]);

    return (
      <Marker position={{ lat: location.latitude, lng: location.longitude }}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLocation({
      ...location,
      country: event.target.value,
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Enter the location - Airbnb</title>
      </Helmet>

      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />

      <div className="flex-1 w-full ">
        {step1 ? (
          <div className="flex justify-center flex-col items-center ">
            <div className="w-2/5 mb-4">
              <h1 className="text-3xl font-bold">
                Where's your place located?
              </h1>
              <p className="text-gray-500">
                Your address is only shared with guests after they’ve made a
                reservation.
              </p>
            </div>

            <MapContainer
              center={[location.latitude, location.longitude]}
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
            </MapContainer>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col mt-4 mx-4 ">
            <div className=" sm:w-4/5 md:w-3/5 lg:w-2/5">
              <h1 className="text-2xl font-roboto">Confirm Your Address</h1>
              <p className="text-gray-500">
                Your address is only shared with guests after they’ve made a
                reservation.
              </p>
              <div className="flex-col flex border border-gray-500  mt-3  rounded-lg">
                <label htmlFor="country" className="pl-3">
                  {" "}
                  <small className=" text-gray-500">country/region </small>{" "}
                </label>
                <select
                  className="bg-inherit mt-0 focus:outline-none px-2 pb-2 rounded-lg  "
                  id="country"
                  value={location.country}
                  onChange={handleChange}
                >
                  {countryCodes.map((country) => (
                    <option
                      className=""
                      key={country.code}
                      value={country.country}
                    >
                      {country.country} ({country.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col border divide-y-2 divide-gray-300 border-gray-500 mt-3 rounded-lg">
                <LocationInput
                  title="Street address"
                  id="address"
                  value={location.address}
                  onChange={(e) =>
                    setLocation({ ...location, address: e.target.value })
                  }
                />
                <LocationInput
                  title="Apt,floor,bldg(if applicable)"
                  id="floor"
                  value={location.floor}
                  onChange={(e) =>
                    setLocation({ ...location, floor: e.target.value })
                  }
                />
                <LocationInput
                  title="City/town/village"
                  id="city"
                  value={location.city}
                  onChange={(e) =>
                    setLocation({ ...location, city: e.target.value })
                  }
                />
                <LocationInput
                  title="Province/state/territory(If applicable)"
                  id="province"
                  value={location.province}
                  onChange={(e) =>
                    setLocation({ ...location, province: e.target.value })
                  }
                />

                <LocationInput
                  title="Postal code (If applicable)"
                  id="postalCode"
                  value={location.postalCode}
                  onChange={(e) =>
                    setLocation({ ...location, postalCode: e.target.value })
                  }
                />
              </div>
              <hr className="border-t-2 border-gray-200 mt-8 mb-4" />
              <div className="flex items-center gap-2 mb-10">
                <div>
                  <h1 className="text-base font-roboto ">
                    Show your specific location
                  </h1>
                  <small className="text-gray-500">
                    Make it clear to guests where your place is located.
                    We'llonly share your address after they've made a
                    reservation.Learn more
                  </small>
                </div>
              </div>
              <MapContainer
                center={[location.latitude, location.longitude]}
                zoom={13}
                style={{
                  height: "40vh",
                  width: "40vw",
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
            </div>
          </div>
        )}
      </div>

      <FooterNavigation
        itemSelected={true}
        step={1}
        pos={3}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
};

export default LocationPage;
