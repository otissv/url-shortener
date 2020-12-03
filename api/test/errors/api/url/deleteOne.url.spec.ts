import * as methods from '../../../../src/database/mongodb/methods.mongodb';
import { deleteOneUrl } from '../../../../src/api/url/deleteOne.url';
import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
} from '../../../../src/errors/codes.error';

describe('deleteOneUrl', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  test('deletes one url document', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: 'abcd1234',
        url: 'www.google.com',
      },
    ];

    const mongodbDeleteOneSpy = jest.spyOn(methods, 'mongodbDeleteOne');
    (mongodbDeleteOneSpy as any).mockReturnValue([
      { ...docs[0], deletedCount: 1, n: 1 },
    ]);

    const data = { _id: '5fc5fd5163575f00b6e73ba6' };

    const req: any = {
      body: data,
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await deleteOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({ data, success: 'OK' });

    mongodbDeleteOneSpy.mockRestore();
  });

  test('does not delete document without filter', async () => {
    const spy = jest.spyOn(methods, 'mongodbDeleteOne');
    (spy as any).mockReturnValue(null);

    const req: any = {
      body: {},
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => ({ error: obj }),
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await deleteOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        code: BAD_REQUEST,
        message: 'Invalid filter.',
        info: null,
        stack: null,
      },
    });

    spy.mockRestore();
  });

  test('returns error if data is not saved', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: 'abcd1234',
        url: 'www.google.com',
      },
    ];

    const mongodbDeleteOneSpy = jest.spyOn(methods, 'mongodbDeleteOne');
    (mongodbDeleteOneSpy as any).mockReturnValue([{ ...docs[0] }]);

    const req: any = {
      body: { _id: '5fc5fd5163575f00b6e73ba6' },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await deleteOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        code: DATA_NOT_SAVED,
        info: null,
        message: 'Data was not deleted.',
        stack: null,
      },
    });

    mongodbDeleteOneSpy.mockRestore();
  });
});
