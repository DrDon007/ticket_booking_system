"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _booking = require("./booking");

var ProfileSchema = new _mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  PlaceOfBirth: {
    type: {
      type: String,
      // Don't do `{ location: { type: String } }`
      "enum": ["Point"] // 'location.type' must be 'Point'

    },
    coordinates: {
      type: [Number]
    }
  },
  currentPlace: {
    type: {
      type: String,
      // Don't do `{ location: { type: String } }`
      "enum": ["Point"] // 'location.type' must be 'Point'

    },
    coordinates: {
      type: [Number]
    }
  },
  relationshipStatus: {
    type: String
  },
  profilePhoto: {
    type: String,
    required: false
  },
  coverPhoto: {
    type: String,
    required: false
  },
  bookings: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});
var Profile = (0, _mongoose.model)("Profile", ProfileSchema);
var _default = Profile;
exports["default"] = _default;