// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import HouseIcon from "../components/icons/houseIcon.tsx";

interface TypeEntry {
  value: string;
  icon: JSX.Element;
}

const types: TypeEntry[] = [
  {
    value: "House",
    icon: <HouseIcon />,
  },
  { value: "Apartment", icon: <HouseIcon /> },
  { value: "Barn", icon: <HouseIcon /> },
  {
    value: "Bed & breakfast",
    icon: <HouseIcon />,
  },
  { value: "Boat", icon: <HouseIcon /> },
  { value: "Cabin", icon: <HouseIcon /> },
  { value: "Camper/RV", icon: <HouseIcon /> },
  {
    value: "Casa particular",
    icon: <HouseIcon />,
  },
  { value: "Castle", icon: <HouseIcon /> },
  { value: "Cave", icon: <HouseIcon /> },
  { value: "Container", icon: <HouseIcon /> },
  {
    value: "Cycladic home",
    icon: <HouseIcon />,
  },
  { value: "Dammuso", icon: <HouseIcon /> },
  { value: "Dome", icon: <HouseIcon /> },
  { value: "Earth homes", icon: <HouseIcon /> },
  { value: "Farm", icon: <HouseIcon /> },
  { value: "GuestHouse", icon: <HouseIcon /> },
  { value: "Hotel", icon: <HouseIcon /> },
  { value: "Houseboat", icon: <HouseIcon /> },
  { value: "Kizhan", icon: <HouseIcon /> },
  { value: "Minsu", icon: <HouseIcon /> },
  { value: "Riad", icon: <HouseIcon /> },
  { value: "Ryokan", icon: <HouseIcon /> },
  {
    value: "Shepherd's hat",
    icon: <HouseIcon />,
  },
  { value: "Tent", icon: <HouseIcon /> },
  { value: "Tiny home", icon: <HouseIcon /> },
  { value: "Tower", icon: <HouseIcon /> },
  { value: "Treehouse", icon: <HouseIcon /> },
  { value: "Trullo", icon: <HouseIcon /> },
  { value: "Windmill", icon: <HouseIcon /> },
  { value: "Yurt", icon: <HouseIcon /> },
];

const amenitiesItems = [
  { value: "Wifi", icon: <HouseIcon /> },
  { value: "TV", icon: <HouseIcon /> },
  { value: "Kitchen", icon: <HouseIcon /> },
  { value: "Washer", icon: <HouseIcon /> },
  {
    value: "Free parking on premises",
    icon: <HouseIcon />,
  },
  {
    value: "Paid parking on premises",
    icon: <HouseIcon />,
  },
  {
    value: "Air conditioning",
    icon: <HouseIcon />,
  },
  {
    value: "Dedicated Workspace",
    icon: <HouseIcon />,
  },
];

const uniqueAmenitiesItems = [
  { value: "Pool", icon: <HouseIcon /> },
  { value: "Hot tub", icon: <HouseIcon /> },
  { value: "Patio", icon: <HouseIcon /> },
  { value: "BBQ grill", icon: <HouseIcon /> },
  {
    value: "Outdoor dining area",
    icon: <HouseIcon />,
  },
  { value: "Fire pit", icon: <HouseIcon /> },
  { value: "Pool table", icon: <HouseIcon /> },
  {
    value: "Indoor fireplace",
    icon: <HouseIcon />,
  },
  { value: "Piano", icon: <HouseIcon /> },
  {
    value: "Exercise equipment",
    icon: <HouseIcon />,
  },
  { value: "Lake access", icon: <HouseIcon /> },
  { value: "Beach access", icon: <HouseIcon /> },
  {
    value: "Ski-in/Ski-out",
    icon: <HouseIcon />,
  },
  {
    value: "Outdoor shower",
    icon: <HouseIcon />,
  },
];

const safetyAmenitiesItems = [
  { value: "Smoke alarm", icon: <HouseIcon /> },
  {
    value: "First aid kit",
    icon: <HouseIcon />,
  },
  {
    value: "Fire extinguisher",
    icon: <HouseIcon />,
  },
  {
    value: "Carbon monoxide alarm",
    icon: <HouseIcon />,
  },
];

const descriptionTypes = [
  { value: "Peacful", icon: <HouseIcon /> },
  { value: "Unique", icon: <HouseIcon /> },
  {
    value: "Familly friendly",
    icon: <HouseIcon />,
  },
  { value: "Stylish", icon: <HouseIcon /> },
  { value: "Central", icon: <HouseIcon /> },
  { value: "Spacious", icon: <HouseIcon /> },
];
export {
  types,
  amenitiesItems,
  uniqueAmenitiesItems,
  safetyAmenitiesItems,
  descriptionTypes,
};
