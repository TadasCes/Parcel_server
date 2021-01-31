import { Document } from 'mongoose';
import IUser from './IUser'

interface IPost extends Document {
  city_start: string,
  city_finish: string,
  time_start: Date,
  time_end: Date,
  author: IUser,
};

export default IPost
