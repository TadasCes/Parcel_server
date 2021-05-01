import { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registeredDate: string;
  phone: string;
  rating: number;
  review: [];
  reviewCount: 0;
  posts: [];
  googleId?: string;
}

export default IUser;
