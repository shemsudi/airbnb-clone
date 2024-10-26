import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js"; // Make sure User model has TypeScript support

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload: any, done: Function) => {
      try {
        const user = await User.findById(jwt_payload.userId);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};
