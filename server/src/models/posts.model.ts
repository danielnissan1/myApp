import mongoose, { Schema, Types } from "mongoose";

export interface IPost {
  imgSrc: string;
  content: string;
  owner: Types.ObjectId;
  location: string;
  isSold: boolean;
  date: Date;
  price: number;
  likes?: Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
  imgSrc: {
    type: String,
    required: true,
  },
  content: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isSold: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
      default: [],
    },
  ],
});

const postModel = mongoose.model<IPost>("Posts", postSchema);

export default postModel;
