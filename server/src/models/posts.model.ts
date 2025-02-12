import mongoose from "mongoose";

export interface IPost {
  imgSrc: string;
  content: string;
  owner: string;
  location: string;
  isSold: boolean;
  date: Date;
}

const postSchema = new mongoose.Schema<IPost>({
  imgSrc: {
    type: String,
    required: true,
  },
  content: String,
  owner: {
    type: String,
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
    default: Date.now(),
  },
});

const postModel = mongoose.model<IPost>("Posts", postSchema);

export default postModel;
