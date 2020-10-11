"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var PassengerSchema = new _mongoose["default"].Schema({
  name: {
    type: "string",
    required: true
  },
  gender: {
    type: "string",
    required: true
  },
  age: {
    type: "string",
    required: true
  }
});
PassengerSchema["static"]("findById", function (id) {
  return this.find({
    id: id
  });
});

var Passenger = _mongoose["default"].model("Passenger", PassengerSchema);

var _default = Passenger;
exports["default"] = _default;