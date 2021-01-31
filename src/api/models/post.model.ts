import mongoose, { model, Schema } from "mongoose";
import User from "./user.model";

const PostSchema = new Schema({
  city_start: {
    type: String,
    required: true
  },
  city_end: {
    type: String,
    required: true
  },
  time_start: {
    type: Date,
    required: true
  },
  time_end: {
    type: Date,
    required: true
  },
  author: {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    count_delivered: {
      type: Number,
      required: true
    }
  }
});

export default mongoose.model("Post", PostSchema);
