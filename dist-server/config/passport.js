"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _passportJwt = require("passport-jwt");

var _user = _interopRequireDefault(require("../models/user"));

var _jwtConfig = require("./jwtConfig");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var BCRYPT_SALTS_ROUNDS = 12;
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

_passport["default"].use(new _passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password",
  session: false
}, function (username, password, done) {
  try {
    _user["default"].findOne({
      where: {
        username: username
      }
    }).then(function (user) {
      console.log(user);

      if (user) {
        console.log("Username already taken");
        return done(null, false, {
          message: "user doesn't exists."
        });
      }

      _bcrypt["default"].compare(password, user.password).then(function (response) {
        if (response !== true) {
          return done(null, false, {
            message: "password doesn't match"
          });
        }

        return done(null, user);
      });
    });
  } catch (err) {
    console.log(err);
    done(err);
  }
}));

var opts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _jwtConfig.JWTSecret
};
console.log("ExtractJwt.fromAuthHeaderAsBearerToken()", _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken());

_passport["default"].use("jwt", new _passportJwt.Strategy(opts, function (jwt_payload, done) {
  try {
    console.log("jwt_payload", jwt_payload);

    _user["default"].findOne({
      _id: jwt_payload.id
    }).then(function (user) {
      console.log("user", user);

      if (user) {
        return done(null, true, {
          user: user,
          role: user.role
        });
      }

      done(null, false, {
        message: "User is not authenticated"
      });
    });
  } catch (err) {
    console.log("error passport config", err);
    done(err);
  }
}));