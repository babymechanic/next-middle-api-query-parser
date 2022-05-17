export type ValidationResult<Type> = {
  [Property in keyof Partial<Type>]: string | undefined;
}
