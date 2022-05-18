import { ParamType } from '../param-type';
import { parseItems, QueryParamTypes, validateItems } from './default-checks';
import validator from 'validator';

const validate = function (value: QueryParamTypes) {
  return validateItems(value, (x) => validator.isNumeric(x), 'Not valid float value')
}

const parse = function (value: QueryParamTypes) {
  return parseItems(value, (x) => validate(x) == null, (x) => parseInt(x))
}

export const floatType: ParamType<Number> = {
  validate,
  parse
};
