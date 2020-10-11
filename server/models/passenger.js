import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  gender: { type: "string", required: true },
  age: { type: "string", required: true },
});
PassengerSchema.static("findById", function (id) {
  return this.find({ id });
});

const Passenger = mongoose.model("Passenger", PassengerSchema);

export default Passenger;