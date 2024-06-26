import { createContext } from "react";

export type AccountContextType = {
    switchToSignIn: () => void;
    switchToSignUp: () => void;
}

export const AccountContext = createContext<AccountContextType | null>(null);