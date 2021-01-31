import { Document } from 'mongoose';

interface IRegistration extends Document {
  email: string,
  password: string,
  firstName: string,
  lastName: string
};

export default IRegistration
