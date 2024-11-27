import mongoose, { Document, Schema } from "mongoose";

export interface IReservation extends Document {
  user: mongoose.Types.ObjectId;
  place: String;
  startDate: String;
  endDate: String;
  totalAmount: number;
  serviceFee: number;
  status: "Pending" | "Confirmed";
}

const ReservationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    place: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed"],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now }, // Explicitly define
  },
  { timestamps: true }
);

ReservationSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 900,
    partialFilterExpression: { status: "Pending" },
  }
);

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
