import { ParamType, ParamValues } from '../param-type';
import { parseItem, validateItem } from './default-checks';
import validator from 'validator';

const validate = function (value: ParamValues) {
  return validateItem(value, (x) => validator.isInt(x), 'Not valid int value')
}

const parse = function (value: ParamValues) {
  return parseItem(value, (x) => validate(x) == null, (x) => parseInt(x))
}

export const intType: ParamType<Number> = {
  validate,
  parse
};
