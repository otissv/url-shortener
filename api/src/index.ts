import { app, start } from './server';
import api from './api/routes.api';
import {
  mongodbConnection,
  getMongodbDatabase,
} from './database/mongodb/mongodb';

const PORT = 5000;

async function main() {
  try {
    const client = await mongodbConnection({
      url: process.env.MONGO_URL || 'mongodb://mongo:27017',
    });

    const mongodb = await getMongodbDatabase({
      client,
      dbName: process.env.DATABASE || 'test',
    });

    api(app, { mongodb });

    start(PORT);
  } catch (error) {
    console.error(error);
    return error;
  }
}

main();
