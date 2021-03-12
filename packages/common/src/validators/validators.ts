/**
 * Validates the strenth of a password
 * * Minimum eight characters
 * * At least one uppercase letter
 * * At least one lowercase letter
 * * At least one number
 * @param password
 */
export const validatePassword = (password: string) =>
  password.length >= 8 &&
  [/[a-z]/, /[A-Z]/, /[0-9]/]
    .map((pattern) => pattern.test(password))
    .every((match) => match);
