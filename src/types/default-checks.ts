export type OneItemCheck = (val: string) => boolean;

export type QueryParamTypes = string | string[];

export const validateItems = (value: QueryParamTypes, isValid: OneItemCheck, message: string): string | undefined => {
  const isArray = Array.isArray(value);
  if (value == null || value === '' || (isArray && value.length === 0)) return 'value missing';
  if (!isArray && !isValid(value)) return message;
  if ((value as string[]).some((x) => !isValid(x))) return message;
};

export type IsValid = (val: QueryParamTypes) => boolean;

export const parseItems = <T>(value: QueryParamTypes, isValid: IsValid, parseItem: (val: string) => T): T | T[] | null => {
  if (!isValid(value)) throw new Error('cannot parse invalid value');
  const isArray = Array.isArray(value);
  if (!isArray) return parseItem(value as string);
  return (value as string[]).map((x) => parseItem(x));
};
