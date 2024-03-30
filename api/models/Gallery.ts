import mongoose, { Schema, Types } from 'mongoose';
import { GalleryFields } from '../types';
import User from './User';

const GallerySchema = new mongoose.Schema<GalleryFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  title: {
    type: String,
    required: [true, 'Title title must be provided'],
  },
  image: {
    type: String,
    required: [true, 'Image must be provided'],
  },
});

const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;
