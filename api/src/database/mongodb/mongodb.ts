import mongodb from 'mongodb';

import {
  MongodbConnectInterface,
  GetMongodbDatabaseInterface,
} from './types.mongodb';

import { createShortUrlsCollection } from './methods.mongodb';

export function mongodbConnection({ url, options }: MongodbConnectInterface) {
  try {
    return mongodb.MongoClient.connect(`${url}`, {
      useUnifiedTopology: true,
      ...options,
    });
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getMongodbDatabase({
  client,
  dbName,
}: GetMongodbDatabaseInterface) {
  try {
    const db = await client.db(dbName);

    createShortUrlsCollection({ mongodb: db });
    return db;
  } catch (error) {
    console.error(error);
    return error;
  }
}
