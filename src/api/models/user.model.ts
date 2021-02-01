import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  registrationTime: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  countTrips: {
    type: Number,
    required: true
  },
  countDelivered: {
    type: Number,
    required: true
  },
  countSent: {
    type: Number,
    required: true
  },
  posts: {
    type: Array,
    required: true
  },
  isAdmin: {
    type: Boolean
  }
});

export default mongoose.model("User", UserSchema);
