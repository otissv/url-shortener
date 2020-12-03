import { Request, Response } from 'express';

import { BAD_REQUEST, DATA_NOT_SAVED } from '../../errors/codes.error';
import { ApiContextInterface } from '../types.api';
import { MongodbInsertOneInterface, MongodbFindInterface } from './types.url';
import { ServerError } from '../../errors/serverError';
import { URL_COLLECTION_NAME } from './constants.url';
import { errorResponse } from '../../errors/response.error';
import { isValidUrl, generateShortUrlId } from '../../utils/utils';
import {
  mongodbInsertOne,
  mongodbFindOne,
} from '../../database/mongodb/methods.mongodb';

export async function checkForShortCodeDuplicate(
  context: ApiContextInterface,
  shortUrlId: string
) {
  try {
    const docs = await mongodbFindOne<MongodbFindInterface>(context, {
      collectionName: URL_COLLECTION_NAME,
      query: { shortUrlId },
    });

    return Boolean(docs[0]);
  } catch (error) {
    return error;
  }
}

export async function getShortUrlId(context: ApiContextInterface) {
  try {
    const shortUrlId = await generateShortUrlId();

    const shortUrlExists = await checkForShortCodeDuplicate(
      context,
      shortUrlId
    );

    if (shortUrlExists) {
      // if short code exists generate a new short code.
      await getShortUrlId(context);
    }

    return shortUrlId;
  } catch (error) {
    return error;
  }
}

export function insertOneUrl(context: ApiContextInterface) {
  return async (req: Request, res: Response) => {
    try {
      const url = req.body.url;
      const host = 'https://pbid.io';

      if (!isValidUrl(url)) {
        throw new ServerError({
          code: BAD_REQUEST,
          message: 'Invalid url.',
        });
      }

      const shortUrlId = await getShortUrlId(context);

      const data = {
        url: req.body.url,
        shortUrlId,
        host,
      };

      const dbResponse = await mongodbInsertOne<MongodbInsertOneInterface>(
        context,
        {
          collectionName: URL_COLLECTION_NAME,
          document: data,
        }
      );

      if (Boolean(dbResponse[0].insertedId) === false) {
        throw new ServerError({
          code: DATA_NOT_SAVED,
          message: 'Data was not saved.',
        });
      }

      res.json({
        data: {
          _id: dbResponse[0].insertedId,
          ...data,
        },
        success: 'OK',
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  };
}
