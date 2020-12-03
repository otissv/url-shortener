import * as methods from '../../../../src/database/mongodb/methods.mongodb';
import { findUrls } from '../../../../src/api/url/find.url';

describe('findUrls', () => {
  test('returns documents', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '27vm0c8s4',
        url: 'www.google.com',
      },
    ];

    const spy = jest.spyOn(methods, 'mongodbFind');
    (spy as any).mockReturnValue(docs);

    const req: any = {
      params: { _id: 1 },
    };
    const res: any = {
      json: (obj: { [key: string]: any }) => ({ error: obj }),
      status: (code: number) => code,
    };
    const resJsonSpy: any = jest.spyOn(res, 'json');
    const context = {
      mongodb: jest.fn(),
    };

    await findUrls(context)(req, res);
    expect(resJsonSpy).toHaveBeenCalledTimes(1);
    expect(resJsonSpy).toHaveBeenCalledWith({ data: docs });

    spy.mockRestore();
  });
});
