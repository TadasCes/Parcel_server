import { Document } from "mongoose";
import IUser from "./IUser";

interface IPost extends Document {
  authorId: string;
  cityStart: string;
  cityFinish: string;
  timeStart: Date;
  timeEnd: Date;
}

export default IPost;
