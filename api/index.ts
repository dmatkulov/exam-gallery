import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import config from './config';
import usersRouter from './routes/users';
import galleriesRouter from './routes/galleries';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/auth', usersRouter);
app.use('/gallery', galleriesRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('Server online on port ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
