import { Document } from "mongoose";
import IUser from "./IUser";

interface IPost extends Document {
  cityStart: string;
  cityFinish: string;
  timeStart: Date;
  timeEnd: Date;
  authorId: string;
}

export default IPost;
