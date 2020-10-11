import mongoose from "mongoose";

const db_url =
  process.env.NODE_ENV === "production"
    ? ""
    : "mongodb://localhost:27017/E-tcket";

const connectDb = () => {
  mongoose.connect(db_url, (err) => {
    if (err) {
      return console.log("Unable to connect");
    }
    console.log(`${db_url} is connected`);
  });
};

export default connectDb;
