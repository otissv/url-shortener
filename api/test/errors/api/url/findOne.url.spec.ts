import * as methods from '../../../../src/database/mongodb/methods.mongodb';
import { findOneUrl } from '../../../../src/api/url/findOne.url';
import { SERVER_ERROR } from '../../../../src/errors/codes.error';

describe('findOneUrl', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  test('finds one document by id', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '27vm0c8s4',
        url: 'www.google.com',
      },
    ];

    const spy = jest.spyOn(methods, 'mongodbFindOne');
    (spy as any).mockReturnValue(docs);

    const req: any = {
      params: { _id: 1 },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await findOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({ data: docs });

    spy.mockRestore();
  });

  test('does not find document with out query id', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '27vm0c8s4',
        url: 'www.google.com',
      },
    ];

    const spy = jest.spyOn(methods, 'mongodbFindOne');
    (spy as any).mockReturnValue(docs);

    const req: any = {};
    const res: any = {
      json: (obj: { [key: string]: any }) => ({ error: obj }),
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await findOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      error: {
        code: SERVER_ERROR,
        message: "Cannot read property 'id' of undefined",
        info: null,
        stack: null,
      },
    });

    spy.mockRestore();
  });
});
