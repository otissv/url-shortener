import { Response } from 'express';

import { SERVER_ERROR, getErrorStatus } from './codes.error';
import { ServerError } from './serverError';
import { isProduction } from '../utils/utils';

export function errorResponse(res: Response, error: ServerError) {
  const customError = {
    ...error,
    code: error.code || SERVER_ERROR,
    message: error.message,

    // we only add a `stack` property in non-production environments
    stack: isProduction() ? null : error.stack,
    info: isProduction() ? null : error.info,
  };

  console.error(error);

  res.status(getErrorStatus(error.code));
  res.json({
    error: customError,
  });
}
