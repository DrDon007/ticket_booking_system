"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var List = new _mongoose["default"].Schema({
  trainName: {
    type: 'string',
    required: true
  },
  trainNo: {
    type: 'string',
    required: true
  },
  start: {
    type: 'string',
    required: true
  },
  end: {
    type: 'string',
    required: true
  }
});
List["static"]("findById", function (id) {
  return this.find({
    id: id
  });
});

var TrainList = _mongoose["default"].model("TrainList", List);

var _default = TrainList;
exports["default"] = _default;