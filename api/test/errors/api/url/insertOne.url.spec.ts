import * as methods from '../../../../src/database/mongodb/methods.mongodb';
import * as insertOne from '../../../../src/api/url/insertOne.url';
import { BAD_REQUEST } from '../../../../src/errors/codes.error';
import * as utils from '../../../../src/utils/utils';

describe('insertOneUrl', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  test('inserts one url document', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: 'abcd1234',
        url: 'www.google.com',
      },
    ];

    const mongodbInsertOneSpy = jest.spyOn(methods, 'mongodbInsertOne');
    (mongodbInsertOneSpy as any).mockReturnValue([
      { ...docs[0], insertedId: docs[0]._id },
    ]);

    const mongodbFindOneSpy = jest.spyOn(methods, 'mongodbFindOne');
    (mongodbFindOneSpy as any).mockReturnValue([]);

    const generateShortUrlIdSpy = jest.spyOn(utils, 'generateShortUrlId');
    (generateShortUrlIdSpy as any).mockReturnValue('abcd1234');

    const req: any = {
      body: { url: 'www.google.com' },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => obj,
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await insertOne.insertOneUrl(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({
      data: {
        ...docs[0],
      },
      success: 'OK',
    });
    expect(generateShortUrlIdSpy).toHaveBeenCalledTimes(1);

    mongodbInsertOneSpy.mockRestore();
    mongodbFindOneSpy.mockRestore();
    generateShortUrlIdSpy.mockRestore();
  });

  test('does not insert document with invalid url', async () => {
    const spy = jest.spyOn(methods, 'mongodbInsertOne');
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

    await insertOne.insertOneUrl(context)(req, res);
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

  test.skip('generates short url', async () => {
    const shortUrlId = 'abcd1234';
    const generateShortUrlIdSpy = jest.spyOn(utils, 'generateShortUrlId');
    (generateShortUrlIdSpy as any).mockReturnValue();

    //TODO: mongodbFindOne is not mocking
    const mongodbFindOneSpy = jest.spyOn(methods, 'mongodbFindOne');
    (mongodbFindOneSpy as any).mockReturnValue([]);

    const checkForShortCodeDuplicateSpy = jest.spyOn(
      insertOne,
      'checkForShortCodeDuplicate'
    );
    (checkForShortCodeDuplicateSpy as any).mockReturnValue(false);

    generateShortUrlIdSpy.mockRestore();
    mongodbFindOneSpy.mockRestore();

    const actual = insertOne.getShortUrlId({});
    expect(actual).toBe(shortUrlId);

    expect(checkForShortCodeDuplicateSpy).toHaveBeenCalledTimes(1);
  });
});
