export type User = {
    id: string;
    firstName: string;
    lastName: string;
}

export type AuthContextType = {
    isLoggedIn: boolean;
    user: User | null;
    token: string | null;
    logIn: (token: string, userData: User) => void;
    logOut: () => void;
};