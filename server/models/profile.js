import {Schema, model} from "mongoose";
import {bookingsSchema} from './booking';

const ProfileSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String},
  dateOfBirth: { type: Date },
  PlaceOfBirth: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      
    },
    coordinates: {
      type: [Number],
      
    },
  },
  currentPlace: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      
    },
    coordinates: {
      type: [Number],
      
    },
  },
  relationshipStatus: {
    type: String,
    
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  coverPhoto: {
    type: String,
    required: false,
  },
  bookings : [{
    type : Schema.Types.ObjectId,
    ref : 'Booking'
  }]
});

const Profile = model("Profile", ProfileSchema);


export default Profile;
