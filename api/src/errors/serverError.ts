import { ServerErrorInterface } from './types.error';

export class ServerError extends Error {
  message = '';
  code = '';
  info: string | undefined;

  constructor({ code, message, info = '' }: ServerErrorInterface) {
    super();
    this.code = code;
    this.message = message;
    this.info = info;
  }
}
