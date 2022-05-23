import { ParamType } from './param-type';

type Unpacked<T> = T extends ParamType<infer U> ? U : T;

export type ParamTypes = { [key: string]: ParamType<unknown> };

export type TypeSafeParams<T extends ParamTypes> = Partial<{
  [key in keyof T]: Unpacked<T[key]>
}>;

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export type QueryParams = { [p: string]: string | string[] };

export class InvalidValueError extends Error {

}


