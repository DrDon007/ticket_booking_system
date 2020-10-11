"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Search = new _mongoose["default"].Schema({
  start: {
    type: 'string',
    required: true
  },
  end: {
    type: 'string',
    required: true
  }
});

var trainSearch = _mongoose["default"].model("trainSearch", Search);

var _default = trainSearch;
exports["default"] = _default;