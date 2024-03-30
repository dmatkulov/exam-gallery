import { Router } from 'express';
import Gallery from '../models/Gallery';
import { imagesUpload } from '../multer';
import mongoose, { FilterQuery, Types } from 'mongoose';
import { GalleryFields, GalleryMutation } from '../types';
import permit from '../middleware/permit';
import auth, { RequestWithUser } from '../middleware/auth';

const galleriesRouter = Router();

galleriesRouter.get('/', async (req, res, next) => {
  try {
    const authorId = req.query.author as string;
    let filter: FilterQuery<GalleryFields>;

    if (authorId) {
      filter = { user: authorId };
    } else {
      filter = {};
    }

    const images = await Gallery.find(filter);
    return res.send(images);
  } catch (e) {
    return next(e);
  }
});

galleriesRouter.post(
  '/',
  auth,
  permit('user', 'admin'),
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;

      const imageData: GalleryMutation = {
        user: userId,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };

      const image = new Gallery(imageData);
      await image.save();

      return res.send(image);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

galleriesRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req, res, next) => {
    try {
      const id = req.params.id;

      try {
        new Types.ObjectId(id);
      } catch {
        return res.status(404).send({ error: 'Wrong ID!' });
      }

      await Gallery.findByIdAndDelete(id);
      return res.send({ message: 'Image deleted' });
    } catch (e) {
      return next(e);
    }
  },
);

export default galleriesRouter;
