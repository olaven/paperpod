/**
 * This only relevant on signup / login, when the
 * client submits credentials.
 *
 * For the user stored in database and used in application
 * logic, see ./User.ts
 */
export interface UserCredentials {
  email: string;
  password: string;
}
