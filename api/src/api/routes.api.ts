import { Express } from 'express';

import { BAD_REQUEST } from '../errors/codes.error';
import { ServerError } from '../errors/serverError';
import { errorResponse } from '../errors/response.error';
import { ApiContextInterface } from './types.api';
import { insertOneUrl } from './url/insertOne.url';
import { deleteOneUrl } from './url/deleteOne.url';
import { findUrls } from './url/find.url';
import { findOneUrl } from './url/findOne.url';
import { updateOneUrl } from './url/updateOne.url';

export default function api(app: Express, context: ApiContextInterface) {
  app.get('/urls', findUrls(context));
  app.get('/urls/:id', findOneUrl(context));
  app.post('/urls/insert-one', insertOneUrl(context));
  app.put('/urls/update-one', updateOneUrl(context));
  app.delete('/urls/delete-one', deleteOneUrl(context));

  app.use('*', (_req, res) => {
    const error = new ServerError({
      code: BAD_REQUEST,
      message: 'Server did not know how to respond to this request.',
    });

    res.status(404).json(errorResponse(res, error));
  });
}
