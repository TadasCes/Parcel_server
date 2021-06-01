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
  day: {
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
  },
  comment: {
    type: String,
    required: false,
  },
  canChange: {
    type: Boolean,
    required: true,
  },
  urgent: {
    type: Boolean,
    required: false,
  },
  fragile: {
    type: Boolean,
    required: false,
  },
  animal: {
    type: Boolean,
    required: false,
  },
  seenCount: {
    type: Number,
    required: false
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model("Post", PostSchema);
