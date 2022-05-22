import { InvalidValueError } from '../type-definitions';
import { ParamValues } from '../param-type';

export type OneItemCheck = (val: string) => boolean;

export const validateItem = (value: ParamValues, isValid: OneItemCheck, message: string): string | undefined => {
  if (Array.isArray(value)) return 'expected single value';
  if (value == null || value === '') return 'value missing';
  if (!isValid(value)) return message;
};

export type IsValid = (val: ParamValues) => boolean;

export const parseItem = <T>(value: ParamValues, isValid: IsValid, parseItem: (val: string) => T): T | null => {
  if (!isValid(value)) throw new InvalidValueError('cannot parse invalid value');
  return parseItem(value as string);
};




