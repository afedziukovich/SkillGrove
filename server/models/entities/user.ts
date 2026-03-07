export interface User {
  id: number;
  login: string;
  password_hash: string;
  salt: string;
  experience: number;
  level: number;
}
