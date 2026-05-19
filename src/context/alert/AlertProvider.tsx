import { useState, type ReactNode } from "react";
import { AlertContext, type AlertStatus, type Display } from "./AlertContext";

export function AlertProvider({ children }: { children: ReactNode }) {

    const [alertStatus, setAlertStatus] = useState<AlertStatus>("success");
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [display, setDisplay] = useState<Display>(false);

    function handleShowAlert(status: AlertStatus, message: string) {
        setAlertStatus(status);
        setAlertMessage(message);
        setDisplay(true);
        setTimeout(() => {
            setDisplay(false);
        }, 2000);
    }

    return (
        <>
            <AlertContext.Provider value={{ status: alertStatus, message: alertMessage, display, handleShowAlert }}>
                {children}
            </AlertContext.Provider>

            {display &&
            <div className="alert-bg">
                <div className="alert-modal">
                    <p>{alertStatus}</p>
                    <p>{alertMessage}</p>
                </div>
            </div>}
        </>
    );
}