import mongoose, { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;
