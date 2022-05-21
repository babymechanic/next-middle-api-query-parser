export interface ParamType<T> {
  validate(value: undefined | string | string[]): string | undefined;

  parse(value: string | string[]): T | T[] | null;
}
