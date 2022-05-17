import validator from 'validator';
import { ParamType } from '../param-type';
import { parseItems, QueryParamTypes, validateItems } from './default-checks';

const validate = function (value: QueryParamTypes) {
  return validateItems(value, (x) => validator.isUUID(x), 'Not valid string');
}

const parse = function (value: QueryParamTypes) {
  return parseItems(value, (x) => validate(x) == null, (x) => x)
}

export const uuidType: ParamType<string> = {
  validate,
  parse
}
