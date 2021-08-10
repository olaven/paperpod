export interface User {
  id?: string;
  email: string;
  password_hash?: string;
  subscription: "active" | "inactive";
  subscription_id: string | null
}
