import { createContext } from "react";

export type AlertStatus = "success" | "warning" | "error";

export interface AlertContextType {
    handleShowAlert: (status: AlertStatus, message: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);