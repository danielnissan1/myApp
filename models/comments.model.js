const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "POSTS",
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("Comments", commentsSchema);

module.exports = commentsModel;
