interface ItemType {
  name: string;
  image: string;
  category: string; // Replace tag with category
  tag: number;
}

// const name = [
//   "A-frames",
//   "Amazing pools",
//   "Amazing views",
//   "Arctic",
//   "Barns",
//   "Bed & breakfasts",
//   "Caves",
//   "Camping",
//   "Dammusi",
//   "Design",
//   "Icons",
//   "Earth homes",
//   "Grand homes",
//   "Islands",
//   "Luxe",
//   "Lakefront",
//   "Mansions",
//   "National parks",
//   "New",
//   "OMG!",
//   "Rooms",
//   "Surfing",
//   "Tiny home",
//   "Top cities",
//   "Top of the world",
//   "Tropical",
//   "Trending",
//   "Trulli",
//   "adapted",
//   "beach",
//   "beachfront",
//   "boats",
//   "cabins",
//   "campers",
//   "casas particulares",
//   "castles",
//   "chef's kitchens",
//   "containers",
//   "countryside",
//   "creative spaces",
//   "cycladic homes",
//   "desert",
//   "domes",
//   "farms",
//   "golfing",
//   "grand pianos",
//   "hanoks",
//   "historical homes",
//   "houseboats",
//   "minsus",
//   "off the grid",
//   "play",
//   "riads",
//   "ryokans",
//   "shepherd's huts",
//   "ski-in/out",
//   "skiing",
//   "treehouses",
//   "towers",
//   "vinyards",
//   "windmills",
//   "yurts",
// ];

const items: ItemType[] = [
  {
    name: "A-frames",
    image:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
    category: "A-frame",
    tag: 0,
  },
  {
    name: "Amazing pools",
    image:
      "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
    category: "Apartment",
    tag: 1,
  },
  {
    name: "Amazing views",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Dome",
    tag: 2,
  },
  {
    name: "Arctic",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Island",
    tag: 3,
  },
  {
    name: "Barns",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Barn",
    tag: 4,
  },
  {
    name: "Bed & breakfasts",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Barn",
    tag: 5,
  },
  {
    name: "Caves",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Cave",
    tag: 6,
  },
  {
    name: "Camping",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Tent",
    tag: 7,
  },
  {
    name: "Dammusi",
    image:
      "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
    category: "Cycladic home",
    tag: 8,
  },
  {
    name: "Design",
    image:
      "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
    category: "Cycladic home",
    tag: 9,
  },
  {
    name: "Icons",
    image:
      "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
    category: "House",
    tag: 10,
  },
  {
    name: "Earth homes",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Earth homes",
    tag: 11,
  },
  {
    name: "Grand homes",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Castle",
    tag: 12,
  },
  {
    name: "Islands",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Island",
    tag: 13,
  },
  {
    name: "Luxe",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Luxury",
    tag: 14,
  },
  {
    name: "Lakefront",
    image:
      "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
    category: "Houseboat",
    tag: 15,
  },
  {
    name: "Mansions",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Grand homes",
    tag: 16,
  },
  {
    name: "National parks",
    image:
      "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
    category: "Farm",
    tag: 17,
  },
  {
    name: "New",
    image:
      "https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg",
    category: "Tiny home",
    tag: 18,
  },
  {
    name: "OMG!",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Unique",
    tag: 19,
  },
  {
    name: "Rooms",
    image:
      "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
    category: "GuestHouse",
    tag: 20,
  },
  {
    name: "Surfing",
    image:
      "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
    category: "Beach",
    tag: 21,
  },
  {
    name: "Tiny home",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Tiny home",
    tag: 22,
  },
  {
    name: "Top cities",
    image:
      "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
    category: "Apartment",
    tag: 23,
  },
  {
    name: "Top of the world",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Mountain",
    tag: 24,
  },
  {
    name: "Tropical",
    image:
      "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
    category: "Cabin",
    tag: 25,
  },
  {
    name: "Trending",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Castle",
    tag: 26,
  },
  {
    name: "Trulli",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "House",
    tag: 27,
  },
  {
    name: "Adapted",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Apartment",
    tag: 28,
  },
  {
    name: "Beach",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Beach",
    tag: 29,
  },
  {
    name: "Beachfront",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Beachfront",
    tag: 30,
  },
  {
    name: "Boats",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Boat",
    tag: 31,
  },
  {
    name: "Cabins",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Cabin",
    tag: 32,
  },
  {
    name: "Campers",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Camper",
    tag: 33,
  },
  {
    name: "Casas particulares",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "House",
    tag: 34,
  },
  {
    name: "Castles",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Castle",
    tag: 35,
  },
  {
    name: "Chef's kitchens",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Kitchen",
    tag: 36,
  },
  {
    name: "Containers",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Container",
    tag: 37,
  },
  {
    name: "Countryside",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Countryside",
    tag: 38,
  },
  {
    name: "Creative spaces",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Creative space",
    tag: 39,
  },
  {
    name: "Cycladic homes",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Cycladic home",
    tag: 40,
  },
  {
    name: "Desert",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Desert",
    tag: 41,
  },
  {
    name: "Domes",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Dome",
    tag: 42,
  },
  {
    name: "Farms",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Farm",
    tag: 43,
  },
  {
    name: "Golfing",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Golf",
    tag: 44,
  },
  {
    name: "Grand pianos",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Grand piano",
    tag: 45,
  },
  {
    name: "Hanoks",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Hanok",
    tag: 46,
  },
  {
    name: "Historical homes",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Historical home",
    tag: 47,
  },
  {
    name: "Houseboats",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Houseboat",
    tag: 48,
  },
  {
    name: "Minsus",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Minsu",
    tag: 49,
  },
  {
    name: "Off the grid",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Off the grid",
    tag: 50,
  },
  {
    name: "Play",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Play",
    tag: 51,
  },
  {
    name: "Riads",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Riad",
    tag: 52,
  },
  {
    name: "Ryokans",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Ryokan",
    tag: 53,
  },
  {
    name: "Shepherd's huts",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Hut",
    tag: 54,
  },
  {
    name: "Ski-in/out",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Ski lodge",
    tag: 55,
  },
  {
    name: "Skiing",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Ski lodge",
    tag: 56,
  },
  {
    name: "Treehouses",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Treehouse",
    tag: 57,
  },
  {
    name: "Towers",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Tower",
    tag: 58,
  },
  {
    name: "Vinyards",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Vineyard",
    tag: 59,
  },
  {
    name: "Windmills",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Windmill",
    tag: 60,
  },
  {
    name: "Yurts",
    image:
      "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
    category: "Yurt",
    tag: 61,
  },
];
items.forEach((item, index) => {
  item.tag = index; // Assigns an incremental tag
});

export type { ItemType };
export default items;
