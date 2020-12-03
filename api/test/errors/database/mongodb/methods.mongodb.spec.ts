import {
  mongodbFind,
  mongodbFindOne,
  mongodbInsertOne,
  mongodbUpdateOne,
  mongodbDeleteOne,
} from '../../../../src/database/mongodb/methods.mongodb';

describe('Mongodb Methods', () => {
  test.skip('mongodbFind returns documents', async () => {
    const docs = [
      {
        _id: '5fc5fd5163575f00b6e73ba6',
        host: 'https://pbid.io',
        shortUrlId: '12345678',
        url: 'www.google.com',
      },
    ];
    const context = {
      mongodb: {
        collection: jest.fn().mockReturnThis(),
        find: jest.fn().mockReturnThis(),
        toArray: () => docs,
      },
    };

    const actual = mongodbFind(context, {
      collectionName: 'collectionName',
    });

    expect(await actual).toEqual(docs);
  });

  test('mongodbFindOne document', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const context = {
      mongodb: {
        collection: jest.fn().mockReturnThis(),
        findOne: () => doc,
      },
    };

    const actual = await mongodbFindOne(context, {
      collectionName: 'collectionName',
      query: { _id: doc._id },
    });

    expect(actual).toEqual([doc]);
  });

  test('mongodbInsertOne document', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const context = {
      mongodb: {
        collection: jest.fn().mockReturnThis(),
        insertOne: () => doc,
      },
    };

    const actual = await mongodbInsertOne(context, {
      collectionName: 'collectionName',
      document: doc,
    });

    expect(actual).toEqual([doc]);
  });

  test('mongodbUpdateOne document', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const context = {
      mongodb: {
        collection: jest.fn().mockReturnThis(),
        updateOne: () => doc,
      },
    };

    const actual = await mongodbUpdateOne(context, {
      collectionName: 'collectionName',
      filter: { _id: doc._id },
      update: doc,
    });

    expect(actual).toEqual([doc]);
  });

  test('mongodbDeleteOne document', async () => {
    const doc = {
      _id: '5fc5fd5163575f00b6e73ba6',
      host: 'https://pbid.io',
      shortUrlId: '27vm0c8s4',
      url: 'www.google.com',
    };

    const context = {
      mongodb: {
        collection: jest.fn().mockReturnThis(),
        deleteOne: () => doc,
      },
    };

    const actual = await mongodbDeleteOne(context, {
      collectionName: 'collectionName',
      filter: { _id: doc._id },
    });

    expect(actual).toEqual([doc]);
  });
});
