import {Model} from 'mongoose';

/* Schema Fields */
export interface UserFields {
  email: string;
  displayName: string;
  avatar: string | null;
  password: string;
  role: string;
  googleID?: string;
  token: string;
}

/* Schema Methods */

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
