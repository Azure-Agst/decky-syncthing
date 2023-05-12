import { Focusable } from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { FolderCard } from "./FolderCard";
import { syncThingFetch } from "../../utils/Fetch";

import {
    iStFolder, iStDbStatus,
    iStStats, iFolderStatus
} from "../../types";

const getAllFolders = async (): Promise<iFolderStatus[]> => {

    // Prep array
    var folderList: iFolderStatus[] = []

    // Fetch all folders
    var stFolders = await syncThingFetch<iStFolder[]>("/rest/config/folders")

    // Fetch all folder stats
    var stFolderStats = await syncThingFetch<iStStats>("/rest/stats/folder")

    // For each folder, get db status
    for (let stFolder of stFolders) {
        var stStatus = await syncThingFetch<iStDbStatus>(
            `/rest/db/status?folder=${stFolder.id}`
        )
        folderList.push({
            label: stFolder.label,
            folder: stFolder,
            dbStatus: stStatus,
            stats: stFolderStats[stFolder.id]
        })
    }

    // Sort array alphabetically by label
    folderList.sort((a, b) => {
        var al = a.label.toLowerCase()
        var bl = b.label.toLowerCase()
        return (al < bl) ? -1 : (al > bl) ? 1 : 0;
    })

    // return formatted array
    return folderList
}

export const FolderList: VFC = ({}) => {

    const [folderArray, setFolderArray] = useState<iFolderStatus[]>([])
    const [foldersLoaded, setFoldersLoaded] = useState<boolean>()

    const updateFolders = () => {
        getAllFolders().then(result => {
            setFolderArray(result)
            setFoldersLoaded(true)
        }).catch(error => {
            console.log(`[SyncThing] FolderList: ${error}!`)
        })
    }

    useEffect(() => {

        // Initial search
        console.debug(`[SyncThing] Starting Loop!`)
        updateFolders()

        // Set interval
        var loop = setInterval(() => {
            updateFolders()
        }, 1000)

        // Cleanup code / Destructor
        return () => {
            console.debug(`[SyncThing] Stopping Loop!`)
            clearInterval(loop)
        }

    }, [])

    if (!foldersLoaded)
        return (<div>Loading...</div>)

    if (folderArray.length == 0)
        return (<div>No folders found!</div>)

    return (
        <Focusable>
            {folderArray?.map((f) => (
                <FolderCard data={f} />
            ))}
        </Focusable>
    )

}