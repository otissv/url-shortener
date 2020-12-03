import {
  isProduction,
  getRandomNumber,
  getRandomLetter,
  pickCharacterType,
  isValidUrl,
  isString,
  objectHasItems,
} from '../../src/utils/utils';

describe('utils', () => {
  test('returns false if  not production', () => {
    const actual = isProduction();

    expect(actual).toBeFalsy();
  });

  test(' isProduction returns true if production', () => {
    process.env.NODE_ENV = 'production';

    const actual = isProduction();

    expect(actual).toBeTruthy();
    process.env.NODE_ENV = 'test';
  });

  test('isProduction returns true if prod', () => {
    process.env.NODE_ENV = 'prod';

    const actual = isProduction();

    expect(actual).toBeTruthy();
    process.env.NODE_ENV = 'test';
  });

  test('getRandomNumber returns an number between 0 and 9', () => {
    const actual = getRandomNumber();
    expect(actual >= 0 && actual <= 9).toBeTruthy();
  });

  test('getRandomLetter returns a lowercase letter between a and z', () => {
    const actual = getRandomLetter();
    expect(
      actual.charCodeAt(0) >= 97 && actual.charCodeAt(0) <= 122
    ).toBeTruthy();
  });

  test('pickCharacterType returns string "letter" or number', () => {
    const actual = pickCharacterType();
    expect(actual === 'number' || actual === 'letter').toBeTruthy();
  });

  test('isValidUrl returns false if value is not a url', () => {
    expect(isValidUrl('')).toBeFalsy();
    expect(isValidUrl('s')).toBeFalsy();
    expect(isValidUrl('www.')).toBeFalsy();
    expect(isValidUrl('www.')).toBeFalsy();
    expect(isValidUrl('www.google,com')).toBeFalsy();
  });

  test('isValidUrl returns true invalid url', () => {
    expect(isValidUrl('www.google.com')).toBeTruthy();
    expect(isValidUrl('https://www.google.com')).toBeTruthy();
    expect(isValidUrl('http://www.google.com')).toBeTruthy();
    expect(isValidUrl('192.168.0.2')).toBeTruthy();
  });

  test('isString returns if string is not empty', () => {
    expect(isString('hello')).toBeTruthy();
  });

  test('isString returns false if not a valid string', () => {
    expect(isString('')).toBeFalsy();
    expect((isString as any)(1)).toBeFalsy();
    expect((isString as any)(false)).toBeFalsy();
    expect((isString as any)(true)).toBeFalsy();
    expect((isString as any)([])).toBeFalsy();
    expect((isString as any)(['1'])).toBeFalsy();
    expect((isString as any)([{}])).toBeFalsy();
    expect((isString as any)([{}])).toBeFalsy();
  });

  test('objectHasItems returns true if object is not empty', () => {
    expect(objectHasItems({ a: 1 })).toBeTruthy();
    expect(objectHasItems([1])).toBeTruthy();
  });

  test('objectHasItems returns false if object is empty', () => {
    expect(objectHasItems({})).toBeFalsy();
    expect(objectHasItems([])).toBeFalsy();
  });
});
