import { LoginCredentials } from ".";

export type SiteUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  slug: string;
  cookbook_count: number;
  primary_cookbook_id: number;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  user: SiteUser | null;
  logIn: (credentials: LoginCredentials) => Promise<void>;
  logOut: () => void;
};
