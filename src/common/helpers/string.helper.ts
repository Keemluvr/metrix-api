import { NON_NUMERIC_REGEX } from '../constants/regex';

export function removeNonNumericCharacters(string: string): string {
  return string.replace(NON_NUMERIC_REGEX, '');
}
