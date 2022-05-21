import { ParamType } from '../param-type';

export function createOptionalType<T>(innerType: ParamType<T>): ParamType<T> {
  const {validate, parse} = innerType;
  return {
    validate(value: string | string[]): string | undefined {
      if (value == null) return;
      return validate(value);
    },
    parse(value: string | string[]): T | T[] | null {
      const isArray = Array.isArray(value);
      if (value == null || value === '' || (isArray && value.length === 0)) return null;
      return parse(value);
    }
  }
}

