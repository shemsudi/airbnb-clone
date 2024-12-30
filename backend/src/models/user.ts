import mongoose, { Schema, Document, Model } from "mongoose";
//ignore
const findOrCreate = require("mongoose-findorcreate");

// Define the IUser interface for the document
interface IUser extends Document {
  googleId?: string;
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isOptOutMarketing?: boolean;
  birthday?: Date;
  created_at: Date;
}

// Extend the Mongoose model interface to include the findOrCreate method
interface IUserModel extends Model<IUser> {
  findOrCreate: (
    condition: Partial<IUser>,
    doc?: Partial<IUser>
  ) => Promise<{ doc: IUser; created: boolean }>;
}

// Define the schema
const UserSchema: Schema<IUser> = new Schema({
  googleId: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  isOptOutMarketing: { type: Boolean },
  birthday: { type: Date, required: false },
  created_at: { type: Date, default: Date.now },
});

// Add the plugin to the schema
UserSchema.plugin(findOrCreate);

// Create the model with the extended IUserModel type
const User = mongoose.model<IUser, IUserModel>("User", UserSchema);
export { IUser, IUserModel };
export default User;
