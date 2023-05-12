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

        // Get service status from backend
        Backend.getStStatus().then(result => {

            // If server is live...
            if (result == 0) {

                // Send a ping
                // If we get a pong, 0 is correct!
                // If we error out, bad config!
                syncThingFetch<iStPing>("/rest/system/ping").then(() => {
                    setStStatus(0)
                }).catch(() => {
                    setStStatus(5)
                })
            } else {
                setStStatus(result)
            }
                
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
    
    // If config is invalid...
    if (stStatus == 5)
        return (<SbBadConfigView />)

    // Default statement
    return (
        <div style={{ margin: "auto" }}>
            <b>Loading...</b>
            <br/>
            (State: {stStatus})
        </div>
    )
};