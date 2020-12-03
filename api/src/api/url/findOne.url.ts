import { Request, Response } from 'express';

import { ApiContextInterface } from '../types.api';
import { MongodbFindInterface } from './types.url';
import { mongodbFindOne } from '../../database/mongodb/methods.mongodb';
import { URL_COLLECTION_NAME } from './constants.url';
import { errorResponse } from '../../errors/response.error';
import { BAD_REQUEST } from '../../errors/codes.error';
import { ServerError } from '../../errors/serverError';

export function findOneUrl(context: ApiContextInterface) {
  return async (req: Request, res: Response) => {
    try {
      const { id, ...params } = req.params;
      const query = {
        ...params,
        ...(id ? { _id: id } : {}),
      };

      if (Object.keys(query || {}).length === 0) {
        throw new ServerError({
          code: BAD_REQUEST,
          message: 'No query provided.',
        });
      }

      const docs = await mongodbFindOne<MongodbFindInterface>(context, {
        collectionName: URL_COLLECTION_NAME,
        query,
      });

      res.json({ data: docs });
    } catch (error) {
      return errorResponse(res, error);
    }
  };
}
