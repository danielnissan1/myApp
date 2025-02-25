import mongoose, { Schema, Types } from "mongoose";

export interface ILikes {
  owner: Types.ObjectId;
  postId: string;
}
const likesSchema = new mongoose.Schema<ILikes>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

const LikesModel = mongoose.model<ILikes>("Likes", likesSchema);

export default LikesModel;
