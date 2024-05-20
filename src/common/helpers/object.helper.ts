import { CAMEL_CASE_REGEX } from '../constants/regex';

export function convertToSnakeCase(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  const snakeCaseObj: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(
        CAMEL_CASE_REGEX,
        (match, p1, p2) => `${p1}_${p2.toLowerCase()}`,
      );
      snakeCaseObj[snakeCaseKey] = obj[key];
    }
  }

  return snakeCaseObj;
}
