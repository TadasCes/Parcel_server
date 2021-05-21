import mongoose, { model, Schema } from "mongoose";
import User from "./user.model";

const ParcelSchema = new Schema({
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
  },
  comment: {
    type: String,
    required: false,
  },
  urget: {
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
});

export default mongoose.model("Parcel", ParcelSchema);
