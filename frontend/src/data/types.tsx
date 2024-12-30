// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";
import HouseIcon from "../components/icons/houseIcon.tsx";

interface TypeEntry {
  category: string;
  icon: JSX.Element;
  value: string;
}
const houseIcon = <HouseIcon />;

const types: TypeEntry[] = [
  { value: "House", icon: houseIcon, category: "Rooms" },
  { value: "Apartment", icon: houseIcon, category: "Amazing-pools" },
  { value: "Cabin", icon: houseIcon, category: "Tropical" },
  { value: "Apartment", icon: houseIcon, category: "Top-cities" },
  { value: "Tiny home", icon: houseIcon, category: "New" },
  { value: "Farm", icon: houseIcon, category: "National-parks" },
  { value: "GuestHouse", icon: houseIcon, category: "Rooms" },
  { value: "Houseboat", icon: houseIcon, category: "Lakefront" },
  { value: "Cycladic home", icon: houseIcon, category: "Cycladic homes" },
  { value: "Castle", icon: houseIcon, category: "Trending" },
  { value: "Tent", icon: houseIcon, category: "Camping" },
  { value: "Grand homes", icon: houseIcon, category: "Mansions" },
  { value: "Island", icon: houseIcon, category: "Islands" },
  { value: "Unique", icon: houseIcon, category: "OMG!" },
  { value: "Cave", icon: houseIcon, category: "Caves" },
  { value: "Dome", icon: houseIcon, category: "Amazing Views" },
  { value: "Earth homes", icon: houseIcon, category: "Earth homes" },
  { value: "Tiny home", icon: houseIcon, category: "Tiny home" },
  { value: "Grand homes", icon: houseIcon, category: "Castle" },
  { value: "Luxury", icon: houseIcon, category: "Luxe" },
  { value: "Barn", icon: houseIcon, category: "Barns" },
  { value: "Bed & breakfast", icon: houseIcon, category: "Bed & breakfasts" },
  { value: "Boat", icon: houseIcon, category: "Boats" },
  { value: "Camper/RV", icon: houseIcon, category: "Campers" },
  { value: "Casa particular", icon: houseIcon, category: "Casas particulares" },
  { value: "Cave", icon: houseIcon, category: "Caves" },
  { value: "Container", icon: houseIcon, category: "Containers" },
  { value: "Dammuso", icon: houseIcon, category: "Dammusi" },
  { value: "Dome", icon: houseIcon, category: "Amazing Views" },
  { value: "Earth homes", icon: houseIcon, category: "Earth homes" },
  { value: "Farm", icon: houseIcon, category: "National-parks" },
  { value: "GuestHouse", icon: houseIcon, category: "Rooms" },
  { value: "Hotel", icon: houseIcon, category: "Icons" },
  { value: "Houseboat", icon: houseIcon, category: "Lakefront" },
  { value: "Kizhan", icon: houseIcon, category: "Icons" },
  { value: "Minsu", icon: houseIcon, category: "Minsus" },
  { value: "Riad", icon: houseIcon, category: "Riads" },
  { value: "Ryokan", icon: houseIcon, category: "Ryokans" },
  { value: "Shepherd's hat", icon: houseIcon, category: "Shepherd's huts" },
  { value: "Tent", icon: houseIcon, category: "Camping" },
  { value: "Tiny home", icon: houseIcon, category: "Tiny home" },
  { value: "Tower", icon: houseIcon, category: "Towers" },
  { value: "Treehouse", icon: houseIcon, category: "Treehouses" },
  { value: "Trullo", icon: houseIcon, category: "Trulli" },
  { value: "Windmill", icon: houseIcon, category: "Windmills" },
  { value: "Yurt", icon: houseIcon, category: "Yurts" },
];

const amenitiesItems = [
  { value: "Wifi", icon: houseIcon, tag: 0 },
  { value: "TV", icon: houseIcon, tag: 0 },
  { value: "Kitchen", icon: houseIcon, tag: 0 },
  { value: "Washer", icon: houseIcon, tag: 0 },
  {
    value: "Free parking on premises",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Paid parking on premises",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Air conditioning",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Dedicated Workspace",
    icon: houseIcon,
    tag: 0,
  },
];

const uniqueAmenitiesItems = [
  { value: "Pool", icon: houseIcon, tag: 0 },
  { value: "Hot tub", icon: houseIcon, tag: 0 },
  { value: "Patio", icon: houseIcon, tag: 0 },
  { value: "BBQ grill", icon: houseIcon, tag: 0 },
  {
    value: "Outdoor dining area",
    icon: houseIcon,
    tag: 0,
  },
  { value: "Fire pit", icon: houseIcon, tag: 0 },
  { value: "Pool table", icon: houseIcon, tag: 0 },
  {
    value: "Indoor fireplace",
    icon: houseIcon,
    tag: 0,
  },
  { value: "Piano", icon: houseIcon, tag: 0 },
  {
    value: "Exercise equipment",
    icon: houseIcon,
    tag: 0,
  },
  { value: "Lake access", icon: houseIcon, tag: 0 },
  { value: "Beach access", icon: houseIcon, tag: 0 },
  {
    value: "Ski-in/Ski-out",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Outdoor shower",
    icon: houseIcon,
    tag: 0,
  },
];

const safetyAmenitiesItems = [
  { value: "Smoke alarm", icon: houseIcon, tag: 0 },
  {
    value: "First aid kit",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Fire extinguisher",
    icon: houseIcon,
    tag: 0,
  },
  {
    value: "Carbon monoxide alarm",
    icon: houseIcon,
    tag: 0,
  },
];
let tagCounter = 1;

[amenitiesItems, uniqueAmenitiesItems, safetyAmenitiesItems].forEach(
  (items) => {
    items.forEach((item) => {
      item.tag = tagCounter++;
    });
  }
);

const descriptionTypes = [
  { value: "Peacful", icon: houseIcon },
  { value: "Unique", icon: houseIcon },
  {
    value: "Familly friendly",
    icon: houseIcon,
  },
  { value: "Stylish", icon: houseIcon },
  { value: "Central", icon: houseIcon },
  { value: "Spacious", icon: houseIcon },
];

const features = [
  {
    icon: houseIcon,
    title: "Room in a bed and breakfast",
    description: "Your own room in a home, plus access to shared spaces.",
  },
  {
    icon: houseIcon,
    title: "50-min drive to Nairobi National Park",
    description: "This home is near the national park.",
  },
  {
    icon: houseIcon,
    title: "Dive right in",
    description: "This is one of the few places in the area with a pool.",
  },
];
export {
  features,
  types,
  amenitiesItems,
  uniqueAmenitiesItems,
  safetyAmenitiesItems,
  descriptionTypes,
};
