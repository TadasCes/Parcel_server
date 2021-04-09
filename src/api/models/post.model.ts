import mongoose, { model, Schema } from "mongoose";
import User from "./user.model";

const PostSchema = new Schema({
  cityStart: {
    type: String,
    required: true,
  },
  cityEnd: {
    type: String,
    required: true,
  },
  timeStart: {
    type: Date,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Post", PostSchema);
