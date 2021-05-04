import mongoose, { model, Schema } from "mongoose";
import User from "./user.model";

const PostSchema = new Schema({
  type: {
    type: Number,
    required: true,
  },
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
    required: false,
  },
  timeEnd: {
    type: Date,
    required: false,
  },
  size: {
    type: Number,
    required: false,
  },
  authorId: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Post", PostSchema);
