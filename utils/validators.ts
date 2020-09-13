export namespace ValidatorFunctions {
  export const isRequired = (value: any) => !!value;
  export const isNumber = (value: string) =>
    value && /^\d+$/.test(value);

  export const isMaxLength = (
    value: string | number,
    maxlength: number
  ) => value?.toString().length >= maxlength;

  export const hasPattern = (
    value: string,
    pattern: string
  ) => !!value?.match(pattern);
}

export namespace ValidatorMessages {
  export const isRequired = (name: string) =>
    `Please fill in your ${name}`;
  export const isNumber = (name: string) =>
    `Please enter a valid ${name} number`;
  export const custom = (name: string) =>
    `Please enter a valid ${name}`;
}

export interface Validator {
  fn: (value) => boolean;
  message: string;
}

export const validationNumber = (
  name: string
): Validator => ({
  fn: (value) => ValidatorFunctions.isNumber(value),
  message: ValidatorMessages.isNumber(name),
});

export const validationRequired = (
  name: string
): Validator => ({
  fn: (value) => ValidatorFunctions.isRequired(value),
  message: ValidatorMessages.isRequired(name),
});

export const validationPattern = (
  name: string,
  pattern: string
): Validator => ({
  fn: (value) =>
    ValidatorFunctions.hasPattern(value, pattern),
  message: ValidatorMessages.custom(name),
});

export const validationMaxLength = (
  name: string,
  maxLength: number
): Validator => ({
  fn: (value) =>
    ValidatorFunctions.isMaxLength(value, maxLength),
  message: ValidatorMessages.custom(name),
});
