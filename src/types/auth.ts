export type SiteUser = {
    id: string;
    firstName: string;
    lastName: string;
}

export type AuthContextType = {
    isLoggedIn: boolean;
    user: SiteUser | null;
    token: string | null;
    logIn: (token: string, userData: SiteUser) => void;
    logOut: () => void;
};