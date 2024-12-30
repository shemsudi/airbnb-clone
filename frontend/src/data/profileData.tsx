import HouseIcon from "../components/icons/houseIcon";

const homeIcon = <HouseIcon />;

export const userProfileQuestions: {
  [key: string]: {
    icon: JSX.Element;
    title: string;
    tag: string;
    description?: string;
    question?: string;
    allowedLength?: number;
  };
} = {
  whatAreYouInto: {
    icon: homeIcon,
    title: "What are you into?",
    question: "What are you into?",
    tag: "whatAreYouInto",
    allowedLength: 20,
    description:
      "Pick some interests you enjoy that you want to show on your profile.",
  },
  aboutYou: {
    icon: homeIcon,
    title: "About you",
    tag: "aboutYou",
    question: "About you",
    allowedLength: 450,
    description:
      "Tell us a little bit about yourself, so your future hosts or guests can get to know you.",
  },
  myWork: {
    icon: homeIcon,
    title: "My work",
    tag: "myWork",
    question: "What do you do for work?",
    allowedLength: 20,
    description:
      "Tell us what your profession is. If you don’t have a traditional job, tell us your life’s calling. Example: Nurse, parent to four kids, or retired surfer. Where is this shown?",
  },
  whereIHaveAlwaysWantedToGo: {
    icon: homeIcon,
    title: "Where I have always wanted to go",
    tag: "whereIHaveAlwaysWantedToGo",
    question: "Where have you always wanted to travel?",
    allowedLength: 35,
    description:
      "Whether it's on your bucket list or your short list, tell us a place you can't wait to visit.",
  },
  iSpendTooMuchTime: {
    icon: homeIcon,
    title: "I spend too much time",
    tag: "iSpendTooMuchTime",
    question: "What do you spend too much time doing?",
    allowedLength: 40,
    description:
      "Share an activity or hobby you spend lots of free time on. Example: Watching cat videos or playing chess.",
  },
  myFunFact: {
    icon: homeIcon,
    title: "My fun fact",
    tag: "myFunFact",
    question: "What’s a fun fact about you?",
    allowedLength: 40,
    description:
      "Share something unique or unexpected about you. Example: I was in a music video or I’m a juggler.",
  },
  pets: {
    icon: homeIcon,
    title: "Pets",
    tag: "pets",
    question: "Do you have any pets in your life?",
    allowedLength: 40,
    description:
      "Share any pets you have and their names. Example: My calico cat Whiskers, or Leonardo my speedy turtle.",
  },
  decadeIWasBorn: {
    icon: homeIcon,
    title: "Decade I was born",
    tag: "decadeIWasBorn",
    question: "Decade you were born",
    description:
      "Don’t worry, other people won’t be able to see your exact birthday.",
  },
  whereIWentToSchool: {
    icon: homeIcon,
    title: "Where I want to school",
    tag: "whereIWentToSchool",
    question: "Where did you go to school?",
    allowedLength: 40,
    description:
      "Whether it’s home school, high school, or trade school, name the school that made you who you are.",
  },
  myFavoriteSongInHighSchool: {
    icon: homeIcon,
    title: "My favorite song in high school",
    tag: "myFavoriteSongInHighSchool",
    question: "What was your favorite song in high school?",
    allowedLength: 40,
    description:
      "However embarrassing, share the tune you listened to on repeat as a teenager.",
  },
  myMostUselessSkill: {
    icon: homeIcon,
    title: "My most useless skill",
    tag: "myMostUselessSkill",
    question: "What’s your most useless skill?",
    allowedLength: 40,
    description:
      "Share a surprising but pointless talent you have. Example: Shuffling cards with one hand.",
  },
  languagesISpeak: {
    icon: homeIcon,
    title: "Languages I speak",
    tag: "languagesISpeak",
  },
  imObsessedWith: {
    icon: homeIcon,
    title: "I'm obsessed with",
    tag: "imObsessedWith",
    question: "What are you obsessed with?",
    allowedLength: 40,
    description:
      "Share whatever you can’t get enough of—in a good way. Example: Baking rosemary focaccia.",
  },
  myBiographyTitleWouldBe: {
    icon: homeIcon,
    title: "My biography title would be",
    tag: "myBiographyTitleWouldBe",
    question: "What would your biography title be?",
    allowedLength: 40,
    description:
      "If someone wrote a book about your life, what would they call it? Example: Born to Roam or Chronicles of a Dog Mom.",
  },
  whereILive: {
    icon: homeIcon,
    title: "Where I live",
    tag: "whereILive",
  },
};
export interface intialProfileDataProps {
  [key: string]: string | boolean | string[];
  myWork: string;
  whereIHaveAlwaysWantedToGo: string;
  iSpendTooMuchTime: string;
  myFunFact: string;
  pets: string;
  decadeIWasBorn: boolean;
  whereIWentToSchool: string;
  myFavoriteSongInHighSchool: string;
  myMostUselessSkill: string;
  languagesISpeak: string;
  imObsessedWith: string;
  myBiographyTitleWouldBe: string;
  whereILive: string;
  aboutYou: string;
  whereYouHaveBeen: boolean;
  whatAreYouInto: string[];
  file: string;
}

export const intialProfileData: intialProfileDataProps = {
  myWork: "",
  whereIHaveAlwaysWantedToGo: "",
  iSpendTooMuchTime: "",
  myFunFact: "",
  pets: "",
  decadeIWasBorn: false,
  whereIWentToSchool: "",
  myFavoriteSongInHighSchool: "",
  myMostUselessSkill: "",
  languagesISpeak: "",
  imObsessedWith: "",
  myBiographyTitleWouldBe: "",
  whereILive: "",
  aboutYou: "",
  whereYouHaveBeen: false,
  whatAreYouInto: [],
  file: "",
};

interface interestsProps {
  type: string;
  icon: JSX.Element;
}
export const interests: interestsProps[] = [
  {
    type: "History",
    icon: homeIcon,
  },
  {
    type: "Movies",
    icon: homeIcon,
  },
  {
    type: "Food",
    icon: homeIcon,
  },
  {
    type: "Museums",
    icon: homeIcon,
  },
  {
    type: "Architecture",
    icon: homeIcon,
  },
  {
    type: "Theater",
    icon: homeIcon,
  },
  {
    type: "Reading",
    icon: homeIcon,
  },
  {
    type: "Animals",
    icon: homeIcon,
  },
  {
    type: "Outdoors",
    icon: homeIcon,
  },
  {
    type: "Photography",
    icon: homeIcon,
  },
  {
    type: "Shopping",
    icon: homeIcon,
  },
  {
    type: "Live sports",
    icon: homeIcon,
  },
  {
    type: "Cooking",
    icon: homeIcon,
  },
  {
    type: "Live music",
    icon: homeIcon,
  },
  {
    type: "Wine",
    icon: homeIcon,
  },
  {
    type: "Water sports",
    icon: homeIcon,
  },
];
