import { Request, Response } from 'express';

import { URL_COLLECTION_NAME } from './constants.url';
import { BAD_REQUEST, DATA_NOT_SAVED } from '../../errors/codes.error';
import { errorResponse } from '../../errors/response.error';
import { ApiContextInterface } from '../types.api';
import { mongodbDeleteOne } from '../../database/mongodb/methods.mongodb';
import { MongodbDeleteInterface } from './types.url';
import { ServerError } from '../../errors/serverError';
import { isString } from '../../utils/utils';

export function deleteOneUrl(context: ApiContextInterface) {
  return async (req: Request, res: Response) => {
    try {
      let filter = { _id: req.body._id };

      // Check for valid filter keys
      let hasFilter = false;
      const filterKeys = { _id: true, url: true, shortUrlId: true };

      for (let key in filter) {
        if ((filterKeys as any)[key] && isString((filter as any)[key])) {
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

      const dbResponse = await mongodbDeleteOne<MongodbDeleteInterface>(
        context,
        {
          collectionName: URL_COLLECTION_NAME,
          filter,
        }
      );

      const result = dbResponse[0];

      if (
        Boolean(result.deletedCount) === false &&
        Boolean(result.n) === false
      ) {
        throw new ServerError({
          code: DATA_NOT_SAVED,
          message: 'Data was not deleted.',
        });
      }

      res.json({
        success: 'OK',
        data: {
          _id: filter._id,
        },
      });
    } catch (error) {
      return errorResponse(res, error);
    }
  };
}
