import { Document } from "mongoose";

interface IReview extends Document {
  targetId: string;
  authorId: string;
  comment: string;
  rating: number;
  date: string;
}

export default IReview;
