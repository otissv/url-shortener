import { ServerError } from '../../src/errors/serverError';
import { BAD_REQUEST } from '../../src/errors/codes.error';

describe('ServerError', () => {
  test('creates server error', () => {
    const payload = {
      code: BAD_REQUEST,
      message: 'BAD_REQUEST',
    };
    const actual: ServerError = new ServerError(payload);

    expect(actual.code).toBe(payload.code);
    expect(actual.message).toBe(payload.message);
  });
});
