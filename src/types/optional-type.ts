import { ParamType, ParamValues } from '../param-type';

function isEmpty(value: ParamValues): boolean {
  const isArray = Array.isArray(value);
  if (isArray && value?.length === 0) return true;
  return value == null || value === '';
}

export function createOptionalType<T>(innerType: ParamType<T>): ParamType<T> {
  const {validate, parse} = innerType;
  return {
    validate(value: ParamValues): string | undefined {
      if (isEmpty(value)) return;
      return validate(value);
    },
    parse(value: ParamValues): T | null {
      if (isEmpty(value)) return null;
      return parse(value);
    }
  }
}

