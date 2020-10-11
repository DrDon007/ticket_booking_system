"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _user2 = _interopRequireDefault(require("../models/user"));

var _passport = _interopRequireDefault(require("passport"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwtConfig = require("../config/jwtConfig");

var _profile = _interopRequireDefault(require("../routes/profile"));

var router = _express["default"].Router();

var BCRYPT_SALTS_ROUNDS = 12;
/**
 * GET To fetch users
 */

router.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
/* POST registers new user. */

router.post("/register", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body, username, password, email, passwordHash, user, userCreated, newProfile;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log();
            _req$body = req.body, username = _req$body.username, password = _req$body.password, email = _req$body.email;
            _context2.prev = 2;
            _context2.next = 5;
            return _bcrypt["default"].hash(password, BCRYPT_SALTS_ROUNDS);

          case 5:
            passwordHash = _context2.sent;
            user = new _user2["default"]({
              username: username,
              passwordHash: passwordHash,
              email: email,
              role: "user"
            });
            _context2.next = 9;
            return user.save();

          case 9:
            userCreated = _context2.sent;

            if (!userCreated) {
              _context2.next = 14;
              break;
            }

            newProfile = new _profile["default"]({
              bookings: []
            });
            _context2.next = 14;
            return newProfile.save();

          case 14:
            res.status(200).send({
              status: true,
              message: "user created",
              user: user
            });
            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](2);
            console.log("errr", _context2.t0);
            res.status(400).send({
              status: false,
              message: "user not created"
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 17]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
/* POST registers new user. */

router.post("/register/admin", function (req, res, next) {
  _passport["default"].authenticate('jwt', {
    session: false
  }, /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, user, info) {
      var _req$body2, username, password, email, role, passwordHash, _user;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password, email = _req$body2.email;
              _context3.prev = 1;
              role = info.role;

              if (!(role !== "admin")) {
                _context3.next = 6;
                break;
              }

              return _context3.abrupt("return", res.status(403).send({
                status: false,
                message: "Unauthorized access"
              }));

            case 6:
              _context3.next = 8;
              return _bcrypt["default"].hash(password, BCRYPT_SALTS_ROUNDS);

            case 8:
              passwordHash = _context3.sent;
              _user = new _user2["default"]({
                username: username,
                passwordHash: passwordHash,
                email: email,
                role: "admin"
              });
              _context3.next = 12;
              return _user.save();

            case 12:
              res.status(200).send({
                status: true,
                message: "user created",
                user: _user
              });
              _context3.next = 19;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](1);
              console.log("errr", _context3.t0);
              res.status(400).send({
                status: false,
                message: "user not created"
              });

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 15]]);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }())(req, res, next);
});
/* POST login new user. */

router.post("/login", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _req$body3, username, password, user, comparePassword, jwt_token;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
            console.log(username, password);
            _context4.prev = 2;
            _context4.next = 5;
            return _user2["default"].findOne({
              username: username
            }).exec();

          case 5:
            user = _context4.sent;
            console.log(user);

            if (user) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).send({
              status: false,
              message: "user not found"
            }));

          case 9:
            _context4.next = 11;
            return _bcrypt["default"].compare(password, user.passwordHash);

          case 11:
            comparePassword = _context4.sent;

            if (!comparePassword) {
              res.status(200).send({
                status: true,
                message: "Ooops! wrong password"
              });
            }

            jwt_token = _jsonwebtoken["default"].sign({
              id: user.id
            }, _jwtConfig.JWTSecret);
            res.status(200).send({
              status: true,
              data: {
                user: user,
                jwt_token: jwt_token
              }
            });
            _context4.next = 21;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](2);
            console.log("errr", _context4.t0);
            res.status(400).send({
              status: false,
              message: "user not created"
            });

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 17]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;