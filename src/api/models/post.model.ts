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
  author: {
    id: {
      type: String
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: true
    },
    countDelivered: {
      type: Number,
      required: true
    }
  }
});

export default mongoose.model("Post", PostSchema);
