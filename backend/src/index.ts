import path from "path";
import passport from "passport";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors, { CorsOptions } from "cors";
import configurePassport from "./configs/passport";
import Stripe from "stripe";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// import morgan from "morgan";

dotenv.config({ path: "./env" });
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";

//Routes
import AuthRouter from "./routes/auth.js";
import ProfileRouter from "./routes/profile";
import HostRouter from "./routes/host";
import PlaceRouter from "./routes/place";
import BookRouter from "./routes/book";
import User from "./models/user";

const app: express.Application = express();
const port: number = 3000;
const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

app.use(cors(corsOptions));
// app.use(morgan("dev"));
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
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user: any, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyCallback
    ) {
      console.log(profile);
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        user.googleId = profile.id;
        await user.save();
        const token = jwt.sign(
          { userId: user._id, name: user.firstName },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" } // Token expiration
        );

        // Pass the user and token to the callback
        return cb(null, { user, token: "Bearer " + token });
      } else {
        const user = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          isOptOutMarketing: false,
        });
        console.log(user);
        await user.save();
        const token = jwt.sign(
          { userId: user._id, name: user.firstName },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
        );

        return cb(null, { user, token: "Bearer " + token });
      }
    }
  )
);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("database connected successfully"));
