import { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registeredDate: string;
  rating: number;
  countTrips: number;
  countDelivered: number;
  countSent: number;
  posts: [];
  isAdmin: boolean;
}

export default IUser;
