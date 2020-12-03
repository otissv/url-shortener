import { errorResponse } from '../../src/errors/response.error';
import { ServerError } from '../../src/errors/serverError';
import { BAD_REQUEST } from '../../src/errors/codes.error';

describe('errorResponse', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  const res = {
    status: (code: number) => code,
    json: (obj: { [key: string]: any }) => ({ error: obj }),
  };
  test('calls res.json', () => {
    const payload = {
      code: BAD_REQUEST,
      message: 'BAD_REQUEST',
    };

    const resJsonSpy = jest.spyOn(res, 'json');
    const error = new ServerError(payload);
    errorResponse(res as any, error);

    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        ...payload,
        stack: null,
        info: null,
      },
    });
  });

  test('calls res.json', () => {
    const payload = {
      code: BAD_REQUEST,
      message: 'BAD_REQUEST',
    };

    const resStatusSpy = jest.spyOn(res, 'status');
    const error = new ServerError(payload);
    errorResponse(res as any, error);

    expect(resStatusSpy).toHaveBeenCalledTimes(1);
    expect(resStatusSpy).toHaveBeenCalledWith(400);
  });
});
