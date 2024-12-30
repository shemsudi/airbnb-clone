import mongoose, { Schema, Document } from "mongoose";

export interface IProfileData extends Document {
  [key: string]: any;
  user: Schema.Types.ObjectId;
  profileImage?: string;
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
}

const profileSchema: Schema<IProfileData> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      required: false,
    },
    myWork: {
      type: String,
      required: false,
    },
    whereIHaveAlwaysWantedToGo: {
      type: String,
      required: false,
    },
    iSpendTooMuchTime: {
      type: String,
      required: false,
    },
    myFunFact: {
      type: String,
      required: false,
    },
    pets: {
      type: String,
      required: false,
    },
    decadeIWasBorn: {
      type: Boolean,
      required: false,
    },
    whereIWentToSchool: {
      type: String,
      required: false,
    },
    myFavoriteSongInHighSchool: {
      type: String,
      required: false,
    },
    myMostUselessSkill: {
      type: String,
      required: false,
    },
    languagesISpeak: {
      type: String,
      required: false,
    },
    imObsessedWith: {
      type: String,
      required: false,
    },
    myBiographyTitleWouldBe: {
      type: String,
      required: false,
    },
    whereILive: {
      type: String,
      required: false,
    },
    aboutYou: {
      type: String,
      required: false,
    },
    whereYouHaveBeen: {
      type: Boolean,
      required: false,
    },
    whatAreYouInto: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
