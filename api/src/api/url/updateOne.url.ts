import { Request, Response } from 'express';

import { ApiContextInterface } from '../types.api';
import { BAD_REQUEST, DATA_NOT_SAVED } from '../../errors/codes.error';
import { MongodbUpdateInterface } from './types.url';
import { ServerError } from '../../errors/serverError';
import { URL_COLLECTION_NAME } from './constants.url';
import { errorResponse } from '../../errors/response.error';
import { isString, isValidUrl } from '../../utils/utils';
import { mongodbUpdateOne } from '../../database/mongodb/methods.mongodb';

export function updateOneUrl(context: ApiContextInterface) {
  return async (req: Request, res: Response) => {
    try {
      let { update, filter } = req.body;

      if (!isValidUrl(update.url)) {
        throw new ServerError({
          code: BAD_REQUEST,
          message: 'Invalid update.',
        });
      }

      // Check for valid filter keys
      let hasFilter = false;
      const filterKeys = { _id: true, url: true, shortUrlId: true };

      for (let key in filter) {
        if ((filterKeys as any)[key] && isString(filter[key])) {
          hasFilter = true;
          break;
        }
      }

      if (!hasFilter) {
        throw new ServerError({
          code: BAD_REQUEST,
          message: 'Invalid filter.',
        });
      }

      const dbResponse = await mongodbUpdateOne<MongodbUpdateInterface>(
        context,
        {
          collectionName: URL_COLLECTION_NAME,
          filter,
          update,
        }
      );

      const result = dbResponse[0];

      if (
        Boolean(result?.modifiedCount) === false &&
        Boolean(result?.upsertedCount) === false
      ) {
        throw new ServerError({
          code: DATA_NOT_SAVED,
          message: 'Data not updated.',
        });
      }

      res.json({ success: 'OK' });
    } catch (error) {
      return errorResponse(res, error);
    }
  };
}
