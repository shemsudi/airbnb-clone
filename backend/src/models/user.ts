import mongoose, { Schema, Document } from "mongoose";
// import findOrCreate from 'mongoose-findorcreate';

interface IUser extends Document {
  googleId?: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  isOptOutMarketing?: boolean;
  birthday: Date;
  created_at: Date;
}

const userSchema: Schema<IUser> = new Schema({
  googleId: {
    type: String,
    required: false,
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isOptOutMarketing: { type: Boolean },
  birthday: { type: Date, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.plugin(findOrCreate);
const User = mongoose.model<IUser>("User", userSchema);
export default User;
