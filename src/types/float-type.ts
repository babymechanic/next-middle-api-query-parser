import { ParamType, ParamValues } from '../param-type';
import { parseItem, validateItem } from './default-checks';
import validator from 'validator';

const validate = function (value: ParamValues) {
  return validateItem(value, (x) => validator.isNumeric(x), 'Not valid float value')
}

const parse = function (value: ParamValues) {
  return parseItem(value, (x) => validate(x) == null, (x) => parseFloat(x))
}

export const floatType: ParamType<Number> = {
  validate,
  parse
};
