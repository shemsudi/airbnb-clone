import path from "path";
import passport from "passport";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors, { CorsOptions } from "cors";
import configurePassport from "./configs/passport";

//Routes
import AuthRouter from "./routes/auth.js";
import ProfileRouter from "./routes/profile";
import HostRouter from "./routes/host";

const app: express.Application = express();
const port: number = 3000;
const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect("mongodb://localhost:27017/airbnb")
  .then(() => console.log("database connected successfully"));
