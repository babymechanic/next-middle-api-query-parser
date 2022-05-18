import { ParamType } from '../param-type';
import { parseItems, QueryParamTypes, validateItems } from './default-checks';
import validator from 'validator';

const validate = function (value: QueryParamTypes) {
  return validateItems(value, (x) => validator.isInt(x), 'Not valid int value')
}

const parse = function (value: QueryParamTypes) {
  return parseItems(value, (x) => validate(x) == null, (x) => parseInt(x))
}

export const intType: ParamType<Number> = {
  validate,
  parse
};
