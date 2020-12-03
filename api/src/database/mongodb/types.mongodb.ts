export interface MongodbConnectInterface {
  url: string;
  options?: { [key: string]: any };
}

export interface GetMongodbDatabaseInterface {
  client: any;
  dbName: string;
}

export interface MongodbDeleteMethodInterface {
  collectionName: string;
  filter: { _id: string };
}

export interface MongodbFindMethodInterface {
  collectionName: string;
  query?: { [key: string]: any };
  projection?: { [key: string]: any };
}

export interface MongodbInsertMethodInterface {
  collectionName: string;
  document: { [key: string]: any };
}

export interface MongodbUpdateMethodInterface {
  collectionName: string;
  filter: { _id?: string; url?: string };
  update: { [key: string]: any };
}
