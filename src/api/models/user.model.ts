import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  registrationTime: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  posts: {
    type: Array,
    required: true,
  },
  parcels: {
    type: Array,
    required: true,
  },
  reviews: {
    type: Array,
    required: false,
  },
  reviewCount: {
    type: Number,
    required: false,
  },
  tripCount: {
    type: Number,
    required: false
  },
  sentCount: {
    type: Number,
    required: false
  },
  googleId: {
    type: String,
    required: false,
  }
});

export default mongoose.model("User", UserSchema);
