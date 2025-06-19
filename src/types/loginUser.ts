import { SiteUser } from ".";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: SiteUser;
}

export interface RegisterUserVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterFormData extends RegisterUserVariables {
  confirmPassword: string;
}
