import mongoose, { model, Schema } from "mongoose";

const ReviewSchema = new Schema({
  targetId: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
});

export default mongoose.model("Review", ReviewSchema);
