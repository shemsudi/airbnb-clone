import express, { Request, Response } from "express";
import Reservation from "../models/reservation";

const router = express.Router();
interface BookingRequest {
  reservationId: string;
  userId: string;
  startDate: String;
  endDate: String;
  totalAmount: number;
  serviceFee: number;
}

router.post(
  "/",
  async (req: Request<{}, {}, BookingRequest>, res: Response) => {
    try {
      const {
        reservationId,
        userId,
        startDate,
        endDate,
        totalAmount,
        serviceFee,
      } = req.body;
      // Save the booking to the database
      const reservation = new Reservation({
        place: reservationId,
        user: userId,
        startDate: startDate,
        endDate: endDate,
        totalAmount: totalAmount,
        serviceFee: serviceFee,
      });
      await reservation.save();
      console.log(reservation);

      res.status(201).json(req.body);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/paymentConfirmation",
  async (req: Request<{}, {}, { uuid: string }>, res: Response) => {
    try {
      const { uuid } = req.body;
      console.log(uuid);
      const reservation = await Reservation.findOne({ place: uuid });
      if (reservation === null) {
        return res.redirect("http://localhost/5173/book/stays");
      }
      reservation.status = "Confirmed";
      await reservation!.save();
      console.log(reservation);

      res.status(200).json({ reservation });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
