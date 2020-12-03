import { ObjectId } from 'mongodb';

import { ApiContextInterface } from '../../api/types.api';
import {
  MongodbFindMethodInterface,
  MongodbInsertMethodInterface,
  MongodbUpdateMethodInterface,
  MongodbDeleteMethodInterface,
} from './types.mongodb';
import { isString, objectHasItems } from '../../utils/utils';
import { ServerError } from '../../errors/serverError';
import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
} from '../../errors/codes.error';

import { URL_COLLECTION_NAME } from '../../api/url/constants.url';

export async function createShortUrlsCollection({
  mongodb,
}: ApiContextInterface) {
  try {
    const SHORT_URL_ID = 'shortUrlId';
    let collectionName = URL_COLLECTION_NAME;
    let shortUrlsCollectionExits = false;
    const collections = await mongodb.collections();

    for (let item of collections) {
      if (item.s.namespace.collection === collectionName) {
        shortUrlsCollectionExits = true;
      }
    }

    if (!shortUrlsCollectionExits) {
      mongodb.createCollection(collectionName);
    }

    const shortUrlsCollection = await mongodb.collection(collectionName);
    const indexes = await shortUrlsCollection.indexes();

    const hasShortURLIdIndex = Boolean(
      indexes.find(({ name }: any) => name === `${SHORT_URL_ID}_1`)
    );

    if (!hasShortURLIdIndex) {
      await shortUrlsCollection.createIndex(
        { [SHORT_URL_ID]: 1 },
        { unique: true }
      );
    }
  } catch (error) {
    return error;
  }
}

export async function mongodbFind<T extends MongodbFindMethodInterface>(
  { mongodb: db }: ApiContextInterface,
  { collectionName, query = {}, projection = {} }: T
) {
  try {
    if (!isString(collectionName)) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Must provide a collection name.',
      });
    }

    if (!db) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'No database instant provided.',
      });
    }

    const docs = await new Promise((resolve, _reject) => {
      return db
        .collection(collectionName)
        .find(query, projection)
        .toArray((error: any, docs: any[]) => {
          if (error) {
            throw new Error(error);
          }

          resolve(
            docs.map((doc: any) => ({ ...doc, _id: doc._id.toString() }))
          );
        });
    });

    return docs || [];
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function mongodbFindOne<T extends MongodbFindMethodInterface>(
  { mongodb: db }: ApiContextInterface,
  { collectionName, query = {}, projection = {} }: T
) {
  try {
    if (!isString(collectionName)) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Must provide a collection name.',
      });
    }
    if (!db) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'No database instant provided.',
      });
    }

    const doc = await db
      .collection(collectionName)
      .findOne(
        { ...query, ...(query._id ? { _id: new ObjectId(query._id) } : {}) },
        projection
      );

    return doc ? [doc] : [];
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function mongodbInsertOne<T extends MongodbInsertMethodInterface>(
  { mongodb: db }: ApiContextInterface,
  { collectionName, document }: T
) {
  try {
    if (!isString(collectionName)) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Must provide a collection name.',
      });
    }
    if (!db) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'No database instant provided.',
      });
    }
    if (!objectHasItems(document)) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Invalid document provided.',
      });
    }

    const doc = await db.collection(collectionName).insertOne(document);

    if (doc.insertedCount === 0 || doc.n === 0) {
      throw new ServerError({
        code: DATA_NOT_SAVED,
        message: 'Data was not saved.',
      });
    }

    return doc ? [doc] : [];
  } catch (error) {
    if (error.code === 11000) {
      const serverError = new ServerError({
        code: DOCUMENTS_EXISTS,
        message: 'Duplicate short url.',
      });
      return Promise.reject(serverError);
    } else {
      return Promise.reject(error);
    }
  }
}

export async function mongodbUpdateOne<T extends MongodbUpdateMethodInterface>(
  { mongodb: db }: ApiContextInterface,
  { collectionName, filter, update }: T
) {
  try {
    if (!collectionName) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Must provide a collection name.',
      });
    }

    if (!db) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'No database instant provided.',
      });
    }

    if (
      !filter ||
      typeof filter !== 'object' ||
      Object.keys(filter).length === 0
    ) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Invalid filter provided.',
      });
    }

    if (
      !update ||
      typeof update !== 'object' ||
      Object.keys(update).length === 0
    ) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Invalid update provided.',
      });
    }

    const payload = { ...update };
    delete payload._id;

    const doc = await db.collection(collectionName).updateOne(
      {
        ...filter,
        // convert _id to ObjectId
        ...(filter._id ? { _id: new ObjectId(filter._id) } : {}),
      },
      { $set: update }
    );

    if (doc.insertedCount === 0 || doc.n === 0) {
      throw new ServerError({
        code: DATA_NOT_SAVED,
        message: 'Data was not saved.',
      });
    }

    return doc ? [doc] : [];
  } catch (error) {
    if (error.code === 11000) {
      const serverError = new ServerError({
        code: DOCUMENTS_EXISTS,
        message: `Duplicate key`,
        info: error.message,
      });
      return Promise.reject(serverError);
    } else {
      return Promise.reject(error);
    }
  }
}

export async function mongodbDeleteOne<T extends MongodbDeleteMethodInterface>(
  { mongodb: db }: ApiContextInterface,
  { collectionName, filter }: T
) {
  try {
    if (!isString(collectionName)) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Must provide a collection name.',
      });
    }
    if (!db) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'No database instant provided.',
      });
    }
    if (
      !filter ||
      typeof filter !== 'object' ||
      (filter._id && !isString(filter._id))
    ) {
      throw new ServerError({
        code: BAD_REQUEST,
        message: 'Invalid filter provided.',
      });
    }

    const doc = await db.collection(collectionName).deleteOne({
      ...filter,
      // convert _id to ObjectId
      ...(filter._id ? { _id: new ObjectId(filter._id) } : {}),
    });

    return doc ? [doc] : [];
  } catch (error) {
    return Promise.reject(error);
  }
}
