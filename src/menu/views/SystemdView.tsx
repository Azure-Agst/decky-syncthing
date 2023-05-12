import { 
    Focusable,
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC, useState, useEffect } from "react";

import { Backend } from "../../utils/Backend";

export const SystemdView: VFC = ({}) => {

    // Define signals
    const [status, setStatus] = useState<string>("Loading...")

    // Define effects
    // There's probably a prettier way to do this...
    useEffect(() => {
        Backend.getStStatus().then(result => {
            switch (result) {
                case 0:
                    setStatus("Running")
                    break;
                case 3:
                    setStatus("Stopped")
                    break;
                case 4:
                    setStatus("Service not installed")
                    break;
                default:
                    setStatus("Unknown")
            }
        })
    }, [])

    return (
        <Focusable>
            <div className={quickAccessMenuClasses.PanelSectionTitle}>
                Systemd Menu</div>
            <div>Status: {status}</div>
        </Focusable>
    )
}