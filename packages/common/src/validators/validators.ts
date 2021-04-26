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

/**
 * Checks whether the given email address looks like an email address.
 */
export const validateEmail = (email: string) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
