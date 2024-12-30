import { ChangeEvent, useState, useEffect, useMemo, useCallback } from "react";
import HostHeader from "../components/hostingSteps/hostHeader";
import FooterNavigation from "../components/hostingSteps/footerNavigaton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { Helmet } from "react-helmet";
import { updateLocation } from "../redux/hostActions";
import "leaflet/dist/leaflet.css";
import LocationInput from "../components/hostingSteps/locationInput";
import Map from "./map";
import { Location } from "../types/types";
import { formattedCountries } from "../modal/countrySelect";

const intialState: Location = {
  country: "Ethiopia",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  floor: "",
  coordinates: {
    lat: 0,
    lng: 0,
  },
  showExactLocation: false,
};

const LocationPage: React.FC = () => {
  const host = useSelector((state: RootState) => state.host.host);
  const isLoading = useSelector((state: RootState) => state.host.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step1, setStep1] = useState(true);

  const [location, setLocation] = useState<Location>(
    host.location || intialState
  );
  console.log(location);

  const onNext = useCallback(() => {
    if (step1) {
      setStep1(false);
      return;
    }
    if (location && location.coordinates) {
      dispatch(updateLocation({ uuid: host.uuid!, location: location }));
      navigate(`/became-a-host/${host.uuid}/floor-plan`);
    }
  }, [dispatch, location, host.uuid, navigate, step1]);
  useEffect(() => {
    const currentHost = JSON.parse(localStorage.getItem("currentHost")!);
    if (currentHost) {
      setLocation(currentHost.location);
    }
  }, []);

  const onBack = () => {
    if (!step1) {
      setStep1(true);
    } else {
      navigate(`/became-a-host/${host.uuid}/privacyType`);
    }
  };
  const itemSelected = useMemo(() => {
    return (
      !step1 &&
      (location ? true : false) &&
      (location.city ? true : false) &&
      (location.address ? true : false)
    );
  }, [step1, location]);

  const handleChange = useCallback(
    (
      type: string,
      event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
    ) => {
      setLocation((prevLocation) => ({
        ...prevLocation,
        [type]: event.target.value,
      }));
    },
    []
  );
  if (isLoading && !host) {
    return <div>loading..</div>;
  }
  let content;
  if (step1) {
    content = (
      <div className="flex w-full justify-center flex-col items-center ">
        <div className="sm:mx-auto md:w-3/5 xl:w-2/5 mb-4 flex flex-col p-5">
          <h1 className="text-3xl font-bold">Where's your place located?</h1>
          <p className="text-gray-500">
            Your address is only shared with guests after they’ve made a
            reservation.
          </p>
          <Map height="60vh" setLocation={setLocation} location={location} />
        </div>
      </div>
    );
  } else {
    content = (
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
              {formattedCountries.map((country) => (
                <option className="" key={country.label} value={country.label}>
                  {country.label} {country.code.root + country.code.suffixes[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col border divide-y-2 divide-gray-300 border-gray-500 mt-3 rounded-lg">
            <LocationInput
              title="Street address"
              id="address"
              value={location ? location.address : ""}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("address", e)
              }
            />
            <LocationInput
              title="Apt,floor,bldg(if applicable)"
              id="floor"
              value={location ? location.floor : ""}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("floor", e)
              }
            />
            <LocationInput
              title="City/town/village"
              id="city"
              value={location ? location.city : ""}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("city", e)
              }
            />
            <LocationInput
              title="Province/state/territory(If applicable)"
              id="province"
              value={location ? location.province : ""}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("province", e)
              }
            />

            <LocationInput
              title="Postal code (If applicable)"
              id="postalCode"
              value={location ? location.postalCode : ""}
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
          <Map
            setLocation={setLocation}
            height="40vh"
            width="w-full"
            location={location}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Helmet>
        <title>Enter the location - Airbnb</title>
      </Helmet>

      <HostHeader onClick={onNext} title="Exit & save" questions="Questions" />

      <div className="flex-1 w-full ">{content}</div>

      <FooterNavigation
        itemSelected={step1 ? true : itemSelected}
        step={1}
        pos={3}
        onBack={onBack}
        onNext={onNext}
      />
    </div>
  );
};

export default LocationPage;
