# URL Shortener app

# Usage

_Create short url_
Enter URL in textbox and submit

_View All short codes_
Click URls in navigation menu to view a list of all URLs and their corresponding short URLs

_To edit a URL_

- Click URls in navigation menu. Then Edit on the row of the url you would like to change.
- When complete press the Save URL button.

_Delete a URL od Short URL_

- Click URls in navigation menu. Then Delete on the row of the url you would like to delete.

## Development

1. Install the following software dependencies.

- Node
- Docker
- Docker Compose
- Yarn

2. run `npm run install`.

3. Ensure docker is running, Then run `npm run dev` to start the development environment.
   This may make take few a minute to download the docker containers if it's the first time running.

4. To rebuild the development environment run `npm run build:dev`.

## Production

1. To start in production environment run `npm run start`.
2. To rebuild the production environment run `npm run build:start`.

## Commands

- Development: `npm run install`.
  Starts application in development environment.

- Production: `npm run start`
  Starts application in production environment.

- stop: `npm run start`
  stop environment

- clean: `npm run start`
  Warning! Removes all docker containers.

## Tests

### Client

Unit tests: `npm run client:test`
Watch unit tests: `npm run client:watch`
E2E tests: `npm run client:e2e`

For E2E application must be running.

### API

Unit tests: `npm run api:test`
Watch unit tests: `npm run api:watch`
