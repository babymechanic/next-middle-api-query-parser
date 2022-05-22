import validator from 'validator';
import { ParamType, ParamValues } from '../param-type';
import { parseItem, validateItem } from './default-checks';

const validate = function (value: ParamValues) {
  return validateItem(value, (x) => validator.isUUID(x), 'Not valid string');
}

const parse = function (value: ParamValues) {
  return parseItem(value, (x) => validate(x) == null, (x) => x)
}

export const uuidType: ParamType<string> = {
  validate,
  parse
}
