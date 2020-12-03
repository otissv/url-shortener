import {
  MongodbFindMethodInterface,
  MongodbInsertMethodInterface,
  MongodbUpdateMethodInterface,
  MongodbDeleteMethodInterface,
} from '../../database/mongodb/types.mongodb';

export interface URLInterface {
  _id: string;
  url: string;
  shortUrlId: string;
  host: string;
}

export interface MongodbFindInterface extends MongodbFindMethodInterface {
  query: Partial<Pick<URLInterface, '_id' | 'shortUrlId' | 'url' | 'host'>>;
}

export interface MongodbDeleteInterface extends MongodbDeleteMethodInterface {}

export interface MongodbInsertOneInterface
  extends MongodbInsertMethodInterface {
  document: Partial<URLInterface>;
}
export interface MongodbUpdateInterface extends MongodbUpdateMethodInterface {
  filter: Partial<Pick<URLInterface, '_id' | 'shortUrlId' | 'url' | 'host'>>;
  update: Pick<URLInterface, 'url'>;
}
