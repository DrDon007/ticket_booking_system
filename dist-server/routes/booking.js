"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _booking = require("../models/booking");

var _profile = _interopRequireDefault(require("../models/profile"));

// import User from '../models/user';
var router = _express["default"].Router();
/* GET home page. */


router.get("/bookings", function (req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user, info) {
      var bookings;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _profile["default"].findById(info.user.profile._id, "bookings").populate('bookings');

            case 3:
              bookings = _context.sent;

              if (bookings) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                message: "No bookings found"
              }));

            case 6:
              res.status(200).send(bookings);
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              res.status(500).send({
                "message": "oops! something wrong happens"
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }())(req, res, next);
});
router.post("/booking", function (req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, user, info) {
      var _user, trainPNR, profile, booking, bookingDone, updatedProfile;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _user = info.user;
              console.log("what i want is user", _user._id);
              trainPNR = "".concat(req.body.trainid).concat(Math.floor(Math.random() * Math.floor(10)));
              _context2.next = 6;
              return _profile["default"].findById(_user.profile._id).exec();

            case 6:
              profile = _context2.sent;
              booking = new _booking.Booking({
                trainNo: req.body.trainid,
                seatNo: req.body.seatno,
                status: true,
                trainPNR: trainPNR
              });
              _context2.next = 10;
              return booking.save();

            case 10:
              bookingDone = _context2.sent;

              if (bookingDone) {
                profile.bookings.push(booking);
                updatedProfile = profile.save();

                if (updatedProfile) {
                  res.status(200).send({
                    message: "ohoho! Back your bags up"
                  });
                }
              }

              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              console.log('err', _context2.t0);
              res.status(500).send(_context2.t0.message);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }())(req, res, next);
});
router.post("/booking/cancel", function (req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, user, info) {
      var booking, bookingCancelled;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              booking = _booking.Booking.findById(req.booking.id).exec();
              booking.status = false;
              _context3.next = 5;
              return booking.save();

            case 5:
              bookingCancelled = _context3.sent;

              if (bookingCancelled) {
                res.status(200).send({
                  message: "See You soon mate"
                });
              }

              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              console.log('err', _context3.t0);
              res.status(500).send(_context3.t0.message);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }())(req, res, next);
});
var _default = router;
exports["default"] = _default;