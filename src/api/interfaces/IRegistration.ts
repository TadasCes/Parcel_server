import { Document } from 'mongoose';
import { AnyARecord } from 'node:dns';

interface IRegistration extends Document {
  email?: any,
  password?: any,
  firstName?: any,
  lastName?: any,
  phone?: any,
  googleId?: any
};

export default IRegistration
