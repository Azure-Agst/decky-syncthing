import {
    Router,
    ButtonItem,
    PanelSection,
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { Backend } from "../utils/Backend";
import { FolderList } from "./components/FolderList";


export const Sidebar: VFC = ({}) => {

    const [stStatus, setStStatus] = useState<number>(-99)

    useEffect(() => {

        // Get service status from backend
        Backend.getStStatus().then(result => {
            setStStatus(result)
        })
 
    }, [])

    if (stStatus == 0) {
        return (
            <div>
                <PanelSection title="Folders">
                    <FolderList />
                </PanelSection>
                
                <PanelSection title="Settings">
                    <ButtonItem
                        layout="below"
                        onClick={() => {
                            Router.CloseSideMenus();
                            Router.Navigate("/decky-syncthing-settings")
                        }}
                    >Open Settings</ButtonItem>
                </PanelSection>
            </div>
        )
    }

    return (
        <div style={{ margin: "auto" }}>
            <b>Loading...</b>
            <br/>
            (State: {stStatus})
        </div>
    )
};