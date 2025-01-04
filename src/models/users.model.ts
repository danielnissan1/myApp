import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  _id?: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: String,
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;
