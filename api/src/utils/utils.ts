import { RandomInterface } from './types.utils';

export function isProduction() {
  return (
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
  );
}

export function getRandom({ min, max }: RandomInterface) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomNumber() {
  return getRandom({ min: 0, max: 9 });
}

export function getRandomLetter() {
  const charCode = getRandom({ min: 97, max: 122 });
  return String.fromCharCode(charCode);
}

export function pickCharacterType() {
  const rand = getRandom({ min: 0, max: 1 });
  return Boolean(rand) ? 'number' : 'letter';
}

export async function generateShortUrlId() {
  let result = '';

  for (let i = 0; i <= 8; i++) {
    const character =
      pickCharacterType() === 'number' ? getRandomNumber() : getRandomLetter();

    result = `${result}${character}`;
  }

  return result;
}

export function isValidUrl(str: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  return !!pattern.test(str);
}

export function isString(value: string) {
  return typeof value !== 'string' || value.trim() === '' ? false : true;
}

export function objectHasItems(value: { [key: string]: any }) {
  return typeof value !== 'object' || Object.keys(value).length === 0
    ? false
    : true;
}
