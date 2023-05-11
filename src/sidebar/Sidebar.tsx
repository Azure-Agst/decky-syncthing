import { VFC, useEffect, useState } from "react";

import { Backend } from "../utils/Backend";
import { SbMainView, SbNotFoundView, SbNotLoadedView } from "./views";

export const Sidebar: VFC = ({}) => {

    const [stStatus, setStStatus] = useState<number>(-99)

    useEffect(() => {

        // Get service status from backend
        Backend.getStStatus().then(result => {
            setStStatus(result)
        })
 
    }, [])

    // If loaded successfully...
    if (stStatus == 0) 
        return (<SbMainView />)

    // If service not loaded...
    if (stStatus == 3)
        return (<SbNotLoadedView />)

    // If service not found...
    if (stStatus == 4)
        return (<SbNotFoundView />)

    // Default statement
    return (
        <div style={{ margin: "auto" }}>
            <b>Loading...</b>
            <br/>
            (State: {stStatus})
        </div>
    )
};