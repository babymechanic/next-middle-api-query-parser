import { ParamType } from './param-type';

type Unpacked<T> = T extends ParamType<infer U> ? U : T;

export type ParamTypes = { [key: string]: ParamType<unknown> };

export type TypeSafeParams<T extends ParamTypes, TKey extends keyof T> =  Partial<{
  [key in TKey]: Unpacked<T[key]>
}>;

export type ValidationErrors<T, TKey extends keyof T> = Partial<Record<TKey, string>>;

export type QueryParams = { [p: string]: string | string[] };

export class InvalidValueError extends Error {

}


