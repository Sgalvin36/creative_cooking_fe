import { LoginCredentials } from ".";

export type SiteUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  user: SiteUser | null;
  token: string | null;
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => void;
};
