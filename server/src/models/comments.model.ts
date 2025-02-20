import mongoose, { Schema, Types } from "mongoose";

export interface IComments {
  comment: string;
  owner: Types.ObjectId;
  postId: string;
  date?: Date;
}
const commentsSchema = new mongoose.Schema<IComments>({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const commentsModel = mongoose.model<IComments>("Comments", commentsSchema);

export default commentsModel;
