import { ParamType } from './param-type';

type Unpacked<T> = T extends ParamType<infer U> ? U : T;

export type ParamTypes = { [key: string]: ParamType<unknown> };

export type TypeSafeParams<T, TKey extends keyof T> = T extends ParamTypes ? Partial<Record<TKey, Unpacked<T[TKey]>>> : unknown;
export type ValidationErrors<T, TKey extends keyof T> = Partial<Record<TKey, string>>;

export type QueryParams = { [p: string]: string | string[] };


