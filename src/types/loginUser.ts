import { SiteUser } from ".";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: SiteUser;
}
