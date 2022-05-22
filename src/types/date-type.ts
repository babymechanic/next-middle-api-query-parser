import { ParamType, ParamValues } from '../param-type';
import { DateTime } from 'luxon';
import { parseItem, validateItem } from './default-checks';

const validate = function (value: ParamValues) {
  return validateItem(value, (x) => DateTime.fromISO(x).isValid, 'Not valid date value')
}

const parse = function (value: ParamValues) {
  return parseItem(value, (x) => validate(x) == null, (x) => DateTime.fromISO(x).toJSDate())
}

export const dateType: ParamType<Date> = {
  validate,
  parse
};





