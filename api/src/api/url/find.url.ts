import { Request, Response } from 'express';

import { ApiContextInterface } from '../types.api';
import { MongodbFindInterface } from './types.url';
import { URL_COLLECTION_NAME } from './constants.url';
import { errorResponse } from '../../errors/response.error';
import { mongodbFind } from '../../database/mongodb/methods.mongodb';

export function findUrls(context: ApiContextInterface) {
  return async (req: Request, res: Response) => {
    try {
      const docs = await mongodbFind<MongodbFindInterface>(context, {
        collectionName: URL_COLLECTION_NAME,
        query: req.params,
      });

      res.json({ data: docs });
    } catch (error) {
      return errorResponse(res, error);
    }
  };
}
