"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Booking = exports.bookingsSchema = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var bookingsSchema = new _mongoose.Schema({
  trainNo: {
    type: String
  },
  seatNo: {
    type: String
  },
  status: {
    type: Boolean
  },
  trainPNR: {
    type: String
  }
});
exports.bookingsSchema = bookingsSchema;

var Booking = _mongoose["default"].model('Booking', bookingsSchema);

exports.Booking = Booking;