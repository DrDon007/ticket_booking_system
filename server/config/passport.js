import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
import { JWTSecret } from "./jwtConfig";
import bcrypt from "bcrypt";

const BCRYPT_SALTS_ROUNDS = 12;

/**
 * startegy for registering user
 */

//   console.log("i am called");
//   passport.use(
//     new LocalStrategy(
//       {
//         usernameField: "username",
//         passwordField: "password",
//         session: false,
//       },
//       (username, password, done) => {
//         console.log("username", username);
//
//       }
//     )
//   );

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: { username: username },
        }).then((user) => {
          console.log(user);
          if (user) {
            console.log("Username already taken");
            return done(null, false, {
              message: "user doesn't exists.",
            });
          }
          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              return done(null, false, {
                message: "password doesn't match",
              });
            }
            return done(null, user);
          });
        });
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWTSecret,
};

console.log(
  "ExtractJwt.fromAuthHeaderAsBearerToken()",
  ExtractJwt.fromAuthHeaderAsBearerToken()
);
passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    try {
      console.log("jwt_payload", jwt_payload);
      User.findOne({
        _id: jwt_payload.id,
      }).then((user) => {
        console.log("user", user);
        if (user) {
          return done(null, true, {
            user,
            role : user.role
          });
        }
        done(null, false, {
          message: "User is not authenticated",
        });
      });
    } catch (err) {
      console.log("error passport config", err);
      done(err);
    }
  })
);
