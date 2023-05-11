import {
    Router,
    ButtonItem,
    PanelSection,
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { iStFolder, iStDbStatus, iFolderStatus } from "../types";
import { Settings } from "../utils/Settings";
import { Backend } from "../utils/Backend";

const fetchStFolders = async (): Promise<iStFolder[]> => {
    try {
        const result = await fetch(`http://${Settings.host}/rest/config/folders`, {
            headers: {
                "X-API-Key": Settings.apiKey
            }
        })
        if (result.status == 200) return await result.json();
        if (result.status == 403) return Promise.reject("Bad Authorization!")
    } catch (e) {
        return Promise.reject(e)
    }
    return Promise.reject("An undocumented error has occured!");
}

const fetchStDbStatus = async (id: string): Promise<iStDbStatus> => {
    try {
        const result = await fetch(`http://${Settings.host}/rest/db/status?` + 
        new URLSearchParams({
            folder: id
        }), {
            headers: {
                "X-API-Key": Settings.apiKey
            }
        })
        if (result.status == 200) return await result.json();
        if (result.status == 403) return Promise.reject("Bad Authorization!")
        if (result.status == 403) return Promise.reject("Folder not found!")
    } catch (e) {
        return Promise.reject(e)
    }
    return Promise.reject("An undocumented error has occured!");
}

export const Sidebar: VFC = ({}) => {

    const [stStatus, setStStatus] = useState<number>(-99)
    const [folderStatus, setFolderStatus] = useState<iFolderStatus[]>([])

    useEffect(() => {

        console.debug(`[SyncThing] Starting Query!`)

        // Get service status from backend
        Backend.getStStatus().then(result => {

            // Save status
            setStStatus(result)

            // If ok: Fetch all folders, then iterate over them
            if (result == 0) {
                fetchStFolders().then(result => {
                    result.forEach((folder) => {
                        console.debug(`[SyncThing] Found folder: ${folder.label}`)

                        // For each folder, get DB status
                        fetchStDbStatus(folder.id).then(result => {
                            console.debug(`[SyncThing] ${folder.label} Status: ${result.state}`)

                            // Now, save each folder and status in list
                            setFolderStatus(prevFolders => [
                                ...prevFolders,
                                {
                                    folder: folder,
                                    status: result
                                }
                            ])
                        })
                    })
                })
            }
        })

        
    }, [])

    if (stStatus == 0) {
        return (
            <div>
                <PanelSection title="Folders">
                    {folderStatus?.map((f) => (
                        <div>Folder: {f.folder.label} - {f.status.state}</div>
                    ))}
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