import mongoose, { Schema, Document } from "mongoose";

interface IProfile extends Document {
  user: Schema.Types.ObjectId;
  profileImage?: string;
  school?: string;
  location?: string;
  work?: string;
  languages?: string[];
  decadeBorn?: string;
  favoriteSongHighSchool?: string;
  obsessedWith?: string;
  funFact?: string;
  mostUselessSkill?: string;
  biographyTitle?: string;
  spendTooMuchTime?: string;
  pets?: string;
  aboutYou?: string;
  interests?: string[];
  placesVisited?: string[];
  created_at: Date;
  updated_at: Date;
}

const profileSchema: Schema<IProfile> = new Schema(
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
    school: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    work: {
      type: String,
      required: false,
    },
    languages: [
      {
        type: String,
        required: false,
      },
    ],
    decadeBorn: {
      type: String,
      required: false,
    },
    favoriteSongHighSchool: {
      type: String,
      required: false,
    },
    obsessedWith: {
      type: String,
      required: false,
    },
    funFact: {
      type: String,
      required: false,
    },
    mostUselessSkill: {
      type: String,
      required: false,
    },
    biographyTitle: {
      type: String,
      required: false,
    },
    spendTooMuchTime: {
      type: String,
      required: false,
    },
    pets: {
      type: String,
      required: false,
    },
    aboutYou: {
      type: String,
      required: false,
    },
    interests: [
      {
        type: String,
        required: false,
      },
    ],
    placesVisited: [
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
