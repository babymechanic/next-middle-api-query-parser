export type ParamValues = undefined | string | string[];

export interface ParamType<T> {
  validate(value: ParamValues): string | undefined;

  parse(value: ParamValues): T | null;
}
