import { countryCodes } from "../../modal/countrySelect";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationInput from "../hostingSteps/locationInput";
import { useEffect, useState } from "react";

interface LocationProps {
  location: {
    country: string;
    address: string;
    floor: string;
    city: string;
    province: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    showExactLocation: boolean;
  };
  handleChange: (
    type: string,
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  setLocation: (
    value: React.SetStateAction<{
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
      address: string;
      floor: string;
      city: string;
      province: string;
      postalCode: string;
      showExactLocation: boolean;
    }>
  ) => void;
}

const LocationMap: React.FC<LocationProps> = ({
  handleChange,
  setLocation,
  location,
}) => {
  const [locationSet, setLocationSet] = useState(false);

  const LocationMarker: React.FC = () => {
    const map = useMapEvents({
      click(e) {
        setLocation({
          ...location,
          coordinates: {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
        });

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
          lat: location ? location.coordinates.lat : 0,
          lng: location ? location.coordinates.lng : 0,
        }}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };
  return (
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
            value={location ? location.country : "Ethiopia"}
            onChange={(e) => handleChange("country", e)}
          >
            {countryCodes.map((country) => (
              <option className="" key={country.code} value={country.country}>
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
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("address", e)
            }
          />
          <LocationInput
            title="Apt,floor,bldg(if applicable)"
            id="floor"
            value={location.floor}
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("floor", e)
            }
          />
          <LocationInput
            title="City/town/village"
            id="city"
            value={location.city}
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("city", e)
            }
          />
          <LocationInput
            title="Province/state/territory(If applicable)"
            id="province"
            value={location.province}
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("province", e)
            }
          />

          <LocationInput
            title="Postal code (If applicable)"
            id="postalCode"
            value={location.postalCode}
            onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("postalCode", e)
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
              Make it clear to guests where your place is located. We'llonly
              share your address after they've made a reservation.Learn more
            </small>
          </div>
        </div>
        <MapContainer
          center={[
            location ? location.coordinates.lat : 0,
            location ? location.coordinates.lng : 0,
          ]}
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
  );
};

export default LocationMap;
