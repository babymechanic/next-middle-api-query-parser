import { ParamType } from '../param-type';
import { DateTime } from 'luxon';
import { parseItems, QueryParamTypes, validateItems } from './default-checks';

const validate = function (value: QueryParamTypes) {
  return validateItems(value, (x) => DateTime.isDateTime(x), 'Not valid date value')
}

const parse = function (value: QueryParamTypes) {
  return parseItems(value, (x) => validate(x) == null, (x) => DateTime.fromISO(x).toJSDate())
}

export const dateType: ParamType<Date> = {
  validate,
  parse
};
