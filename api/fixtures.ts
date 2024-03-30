import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Gallery from './models/Gallery';
import { randomUUID } from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const models = [Gallery, User];

  for (const model of models) {
    await dropCollection(db, model.collection.collectionName);
  }

  const [user1, user2] = await User.create(
    {
      email: 'john@john.com',
      displayName: 'John Doe',
      password: '123',
      token: randomUUID(),
      role: 'user',
    },
    {
      email: 'jane@jane.com',
      displayName: 'Jane Doe',
      password: '123',
      token: randomUUID(),
      role: 'user',
    },
    {
      email: 'admin@admin.com',
      displayName: 'Daniel (admin)',
      password: '123',
      token: randomUUID(),
      role: 'admin',
    },
  );

  await Gallery.create(
    {
      user: user1,
      title: 'Sunset',
      image: 'fixtures/img-1.jpeg',
    },
    {
      user: user1,
      title: 'Rabbit',
      image: 'fixtures/img-2.jpeg',
    },
    {
      user: user1,
      title: 'Flower',
      image: 'fixtures/img-3.jpeg',
    },
    {
      user: user1,
      title: 'Sheep',
      image: 'fixtures/img-4.jpeg',
    },
    {
      user: user1,
      title: 'Flowers',
      image: 'fixtures/img-5.jpeg',
    },
    {
      user: user1,
      title: 'Easter',
      image: 'fixtures/img-6.jpeg',
    },
    {
      user: user2,
      title: 'Pattern',
      image: 'fixtures/img-7.jpeg',
    },
    {
      user: user2,
      title: 'Tea',
      image: 'fixtures/img-8.jpeg',
    },
    {
      user: user2,
      title: 'Cars',
      image: 'fixtures/img-9.jpeg',
    },
    {
      user: user2,
      title: 'Easter egg',
      image: 'fixtures/img-10.jpeg',
    },
    {
      user: user2,
      title: 'Building',
      image: 'fixtures/img-11.jpeg',
    },
    {
      user: user2,
      title: 'Tulips',
      image: 'fixtures/img-12.jpeg',
    },
  );

  await db.close();
};

void run();
