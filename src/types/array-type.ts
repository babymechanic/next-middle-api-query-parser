import { ParamType, ParamValues } from '../param-type';
import { InvalidValueError } from '../type-definitions';


function isNull(value: string | undefined | string[]): value is undefined {
  return value == null;
}

function isEmpty(value: string | string[]): boolean {
  const isArray = Array.isArray(value);
  if (isArray && value?.length === 0) return true;
  return value === '';
}


export function createArrayType<T>(innerType: ParamType<T>): ParamType<T[]> {
  const {validate, parse} = innerType;
  return {
    validate(value: ParamValues): string | undefined {
      if (isNull(value)) return 'value missing';
      if (isEmpty(value)) return 'value missing';
      const itemsToValidate = ([] as string[]).concat(value);
      for (let index = 0; index < itemsToValidate.length; index++) {
        const error = validate(itemsToValidate[index]);
        if (error != null) return error;
      }
    },
    parse(value: ParamValues): T[] | null {
      if (isNull(value)) throw new InvalidValueError('cannot parse invalid value');
      if (isEmpty(value)) throw new InvalidValueError('cannot parse invalid value');
      const arrayOfValues = ([] as string[]).concat(value);
      if (arrayOfValues.some(x => validate(x) != null)) throw new InvalidValueError('cannot parse invalid value');
      const mappedValues = arrayOfValues.map(x => parse(x));
      return mappedValues.filter(x => x != null) as T[];
    }
  }
}

