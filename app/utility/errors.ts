import { validate } from "class-validator";

export const AppValidationError = async (input: any) => {
  const error = await validate(input, { validationError: { target: true } });

  if (error.length) return error;
  return false;
};
