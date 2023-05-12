import { Focusable } from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { FolderCard } from "./FolderCard";
import { syncThingFetch } from "../../utils/Fetch";

import {
    iStFolder, iStDbStatus,
    iStStats, iFolderStatus,
    iStFolderErr
} from "../../types";

const getAllFolders = async (): Promise<iFolderStatus[]> => {

    // Prep array
    var folderList: iFolderStatus[] = []

    // Fetch all folders
    var stFolders = await syncThingFetch<iStFolder[]>("/rest/config/folders")

    // Fetch all folder stats
    var stFolderStats = await syncThingFetch<iStStats>("/rest/stats/folder")

    // For each folder...
    for (let stFolder of stFolders) {

        // Get Database Status
        var stStatus = await syncThingFetch<iStDbStatus>(
            `/rest/db/status?folder=${stFolder.id}`
        )

        // Temp object 
        var tempFolder = {
            label: stFolder.label,
            folder: stFolder,
            dbStatus: stStatus
        }

        // if not paused, get error status
        if (!stFolder.paused) {
            var stErrors = await syncThingFetch<iStFolderErr>(
                `/rest/folder/errors?folder=${stFolder.id}`
            )
            tempFolder['errors'] = stErrors
        }

        // If stats exist, append
        if (stFolder.id in stFolderStats)
            tempFolder['stats'] = stFolderStats[stFolder.id]

        // Finally, push!
        folderList.push(tempFolder)
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
            console.error(`[SyncThing] FolderList: ${error}!`)
        })
    }

    useEffect(() => {

        // Initial search
        console.debug(`[SyncThing] Starting Loop!`)
        updateFolders()

        // Set interval
        var loop = setInterval(() => {
            updateFolders()
        }, 5000)

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