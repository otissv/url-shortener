import {
  getErrorStatus,
  BAD_REQUEST,
  DATA_NOT_SAVED,
  DOCUMENTS_EXISTS,
  SERVER_ERROR,
} from '../../src/errors/codes.error';

describe('code errors', () => {
  test('returns false 400 if BAD_REQUEST', () => {
    const actual = getErrorStatus(BAD_REQUEST);
    expect(actual).toBe(400);
  });

  test('returns false 500 if DATA_NOT_SAVED', () => {
    const actual = getErrorStatus(DATA_NOT_SAVED);
    expect(actual).toBe(500);
  });

  test('returns false 500 if DOCUMENTS_EXISTS', () => {
    const actual = getErrorStatus(DOCUMENTS_EXISTS);
    expect(actual).toBe(500);
  });

  test('returns false 500 if SERVER_ERROR', () => {
    const actual = getErrorStatus(SERVER_ERROR);
    expect(actual).toBe(500);
  });
});
