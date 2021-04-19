import { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  registeredDate: string;
  phone: string;
  rating: number;
  countTrips: number;
  countDelivered: number;
  countSent: number;
  posts: [];
}

export default IUser;
