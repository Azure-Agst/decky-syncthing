import { VFC, useEffect, useState } from "react";

import { Backend } from "../utils/Backend";
import { syncThingFetch } from "../utils/Fetch";
import { 
    SbBadConfigView, SbMainView, 
    SbNotFoundView, SbNotLoadedView
} from "./views";
import { iStPing } from "../types";

export const Sidebar: VFC = ({}) => {

    const [stStatus, setStStatus] = useState<number>(-99)

    useEffect(() => {

        // Send a ping
        // If we get a pong, 0 is correct!
        // If we error out, something is wrong!
        // - Get service status from backend
        syncThingFetch<iStPing>("/rest/system/ping").then(() => {
            setStStatus(5)
        }).catch(() => {
            Backend.getStStatus().then(result => {
                setStStatus(result)     
            })
        })

    }, [])

    // If config is invalid...
    if (stStatus == 0)
        return (<SbBadConfigView />)

    // If service not loaded...
    if (stStatus == 3)
        return (<SbNotLoadedView />)

    // If service not found...
    if (stStatus == 4)
        return (<SbNotFoundView />)
    
    // If loaded successfully...
    if (stStatus == 5) 
        return (<SbMainView />)

    // Default statement
    return (
        <div style={{ margin: "auto" }}>
            <b>Loading...</b>
            <br/>
            (State: {stStatus})
        </div>
    )
};