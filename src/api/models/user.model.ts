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
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  rating: {
    type: Number
  },
  registered_date: {
    type: String
  },
  count_trips: {
    type: Number
  },
  count_delivered: {
    type: Number
  },
  count_sent: {
    type: Number
  }
});

export default mongoose.model("User", UserSchema);
