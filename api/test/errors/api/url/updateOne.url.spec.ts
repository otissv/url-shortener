import * as methods from '../../../../src/database/mongodb/methods.mongodb';
import { updateOneUrl } from '../../../../src/api/url/updateOne.url';
import {
  BAD_REQUEST,
  DATA_NOT_SAVED,
} from '../../../../src/errors/codes.error';

describe('updateOneUrl', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  test('updates one url document', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: 'abcd1234',
        url: 'www.google.com',
      },
    ];

    const mongodbUpdateOneSpy = jest.spyOn(methods, 'mongodbUpdateOne');
    (mongodbUpdateOneSpy as any).mockReturnValue([
      { ...docs[0], modifiedCount: 1, upsertedCount: 1 },
    ]);

    const req: any = {
      body: {
        filter: { _id: '5fc5fd5163575f00b6e73ba6' },
        update: { url: 'www.google.com' },
      },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await updateOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({ success: 'OK' });

    mongodbUpdateOneSpy.mockRestore();
  });

  test.skip('does not update document with invalid url', async () => {
    const spy = jest.spyOn(methods, 'mongodbUpdateOne');
    (spy as any).mockReturnValue(null);

    const req: any = {
      body: {
        filter: { _id: '5fc5fd5163575f00b6e73ba6' },
      },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => ({ error: obj }),
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await updateOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        code: BAD_REQUEST,
        message: 'Invalid url.',
        info: null,
        stack: null,
      },
    });

    spy.mockRestore();
  });

  test.skip('does not update document withoute filter', async () => {
    const spy = jest.spyOn(methods, 'mongodbUpdateOne');
    (spy as any).mockReturnValue(null);

    const req: any = {
      body: {
        update: { url: 'www.google.com' },
      },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => ({ error: obj }),
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await updateOneUrl(context)(req, res);
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

    const mongodbUpdateOneSpy = jest.spyOn(methods, 'mongodbUpdateOne');
    (mongodbUpdateOneSpy as any).mockReturnValue([{ ...docs[0] }]);

    const req: any = {
      body: {
        filter: { _id: '5fc5fd5163575f00b6e73ba6' },
        update: { url: 'www.google.com' },
      },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await updateOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        code: DATA_NOT_SAVED,
        info: null,
        message: 'Data not updated.',
        stack: null,
      },
    });

    mongodbUpdateOneSpy.mockRestore();
  });
});
