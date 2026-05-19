import { createContext } from "react";

export type AlertStatus = "success" | "warning" | "error";
export type Display = true | false;

export interface AlertContextType {
    status: AlertStatus;
    message: string;
    display: Display;
    handleShowAlert: (status: AlertStatus, message: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);