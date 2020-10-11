import mongoose , { Schema} from "mongoose";

export const bookingsSchema = new Schema({ 
    trainNo: { type: String},
    seatNo : { type : String},
    status : { type : Boolean},
    trainPNR: { type: String},

})

export const Booking = mongoose.model('Booking', bookingsSchema);
