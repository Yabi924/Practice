import { createContext } from "react";
import type { UserData } from "../../../backend/types/UserData";

interface Transaction {
    user?: UserData;
    page: "history" | "charts" | "home";
    showModal: boolean;
    setShowModal?: (show: boolean) => void;
}

export const TransactionContext = createContext<Transaction | undefined>(undefined);