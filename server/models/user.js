import {Schema, model} from "mongoose";

const UserSchema = new Schema({
  username: { type: "string", required: true },
  email: { type: "string", required: true },
  passwordHash: { type: "string", required: true },
  role : {type : "string", required:true},
  profile : { type: Schema.Types.ObjectId, ref: "Profile"}
});


const User = model("User", UserSchema);

export default User;
