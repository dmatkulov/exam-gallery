import mongoose, { Model } from 'mongoose';

/* Schema Fields */
export interface UserFields {
  email: string;
  displayName: string;
  password: string;
  role: string;
  googleID?: string;
  token: string;
}

export interface GalleryFields {
  user: mongoose.Types.ObjectId;
  title: string;
  image: string | null;
}

export interface GalleryMutation {
  user: mongoose.Types.ObjectId | undefined;
  title: string;
  image: string | null;
}

/* Schema Methods */

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
