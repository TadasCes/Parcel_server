import { Document } from 'mongoose';

interface IUser extends Document {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  rating: number,
  registered_date: string,
  count_trips: number,
  count_delivered: number,
  count_sent: number
};

export default IUser
