import { PanelSection } from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { Settings } from "../../utils/Settings";
import { iStFolder, iStDbStatus, iFolderStatus } from "../../types";

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

export const FolderList: VFC = ({}) => {

    const [folderStatus, setFolderStatus] = useState<iFolderStatus[]>([])

    const updateFolders = () => {

        // Reset folder list
        setFolderStatus([])

        // Fetch all folders
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

    useEffect(() => {

        // Start checking status
        console.debug(`[SyncThing] Starting Loop!`)
        updateFolders()
        var loop = setInterval(() => {
            updateFolders()
        }, 1000)

        // Cleanup code / Destructor
        return () => {
            console.debug(`[SyncThing] Stopping Loop!`)
            clearInterval(loop)
        }

    }, [])

    return (
        <div>
            {folderStatus?.map((f) => (
                <div>Folder: {f.folder.label} - {f.status.state}</div>
            ))}
        </div>
    )

}