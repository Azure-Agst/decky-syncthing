import { VFC, useEffect, useRef, useState } from "react";

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

const getAllFolders = async (): Promise<iFolderStatus[]> => {
    try {

        // Prep array
        var folderList: iFolderStatus[] = []

        // Fetch all folders
        var stFolders = await fetchStFolders()

        // For each folder, get db status
        for (let stFolder of stFolders) {
            var stStatus = await fetchStDbStatus(stFolder.id)
            folderList.push({
                folder: stFolder,
                status: stStatus
            })
        }

        // return formatted array
        return folderList

    } catch (e) {
        return Promise.reject(e)
    }
    return Promise.reject("An undocumented error has occured!");
}

export const FolderList: VFC = ({}) => {

    const [folderArray, setFolderArray] = useState<iFolderStatus[]>([])

    const updateFolders = () => {
        getAllFolders().then(result => {
            setFolderArray(result)
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

    if (folderArray.length == 0) {
        return (
            <div>None!</div>
        )
    }

    return (
        <div>
            {folderArray?.map((f) => (
                <div>Folder: {f.folder.label} - {f.status.state}</div>
            ))}
        </div>
    )

}