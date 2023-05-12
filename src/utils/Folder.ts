import { iFolderStatus } from "../types"

export const fullStatus = (data: iFolderStatus) => {
    const statusMap = {
        "paused": "Paused",
        "unknown": "Unknown",
        "unshared": "Unshared",
        "scan-waiting": "Waiting to Scan",
        "cleaning": "Cleaning Versions",
        "clean-waiting": "Waiting to Clean",
        "stopped": "Stopped",
        "scanning": "Scanning",
        "idle": "Up to Date",
        "localadditions": "Local Additions",
        "sync-waiting": "Waiting to Sync",
        "sync-preparing": "Preparing to Sync",
        "syncing": "Syncing",
        "outofsync": "Out of Sync",
        "faileditems": "Failed Items",
        "localunencrypted": "Unexpected Items"
    }

    let status = folderStatus(data)
    if (status in statusMap)
        return statusMap[status]
    return "Unknown"
}

export const folderStatus = (data: iFolderStatus) => {
    // This attempts to mimic the logic used in the official GUI, `folderStatus`
    // REF: https://github.com/syncthing/syncthing/blob/main/gui/default/syncthing/core/syncthingController.js#L917

    if (data.folder.paused)
        return "paused"
    
    if (!data.dbStatus.state)
        return "unknown"

    var state = data.dbStatus.state
    if (state === "error")
        return "stopped"
    if (state !== "idle")
        return state

    if (data.dbStatus.needTotalItems > 0)
        return "outofsync"

    if (data.errors && data.errors.errors && data.errors.errors.length > 0)
        return "failedfiles"

    // I'm not really sure how to parse the gui's logic for this?
    // Potentially a future failure point.
    if (data.dbStatus.receiveOnlyTotalItems > 0) {
        if (data.folder.type == "recieveonly")
            return "localadditions"
        return "localunencrypted"
    }

    if (data.folder.devices.length <= 1)
        return "unshared"

    return state;
}