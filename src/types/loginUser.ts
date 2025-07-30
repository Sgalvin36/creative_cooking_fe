import { SiteUser } from ".";

export interface LoginCredentials {
  password: string;
  username?: string;
  email?: string;
}

export interface LoginResponse {
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

export interface graphQLUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  slug: string;
}

export interface RegistrationResponse {
  registerUser: {
    user: graphQLUser;
    errors: string[];
  };
}
