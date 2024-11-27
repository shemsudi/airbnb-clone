import path from "path";
import passport from "passport";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors, { CorsOptions } from "cors";
import configurePassport from "./configs/passport";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

//Routes
import AuthRouter from "./routes/auth.js";
import ProfileRouter from "./routes/profile";
import HostRouter from "./routes/host";
import PlaceRouter from "./routes/place";
import BookRouter from "./routes/book";

const app: express.Application = express();
const port: number = 3000;
const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  session({
    secret: "your secret key",
    resave: false,
    saveUninitialized: true,
  })
);

configurePassport(passport);

app.use("/", AuthRouter);
app.use("/user", ProfileRouter);
app.use("/host", HostRouter);
app.use("/place", PlaceRouter);
app.use("/book", BookRouter);

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.PUBLISH_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body; // Pass amount and currency from the client.

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Payment Intent");
  }
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect("mongodb://localhost:27017/airbnb")
  .then(() => console.log("database connected successfully"));
