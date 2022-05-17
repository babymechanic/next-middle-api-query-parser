import { ParamType } from '../param-type';

const validate = function (value: string | string[]) {
  if (value == null) return;
  if (typeof value !== 'string') return 'expected string';
};

const parse = function (value: string | string[]): string {
  if (validate(value) != null) throw new Error('cannot parse invalid value');
  return value as string;
};

export const stringType: ParamType<string> = {
  validate,
  parse
};
