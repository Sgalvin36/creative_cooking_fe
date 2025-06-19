import { LoginCredentials } from ".";

export type SiteUser = {
  id: number;
  first_name: string;
  last_name: string;
  // user_name: string;
  email: string;
  slug: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  user: SiteUser | null;
  token: string | null;
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => void;
  registerUser: (userData: SiteUser, token: string) => void;
};
