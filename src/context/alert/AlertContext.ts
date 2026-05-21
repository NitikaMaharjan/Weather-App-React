import { createContext } from "react";

export type AlertStatus = "Success" | "Warning" | "Error";

export interface AlertContextType {
    handleShowAlert: (status: AlertStatus, message: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);