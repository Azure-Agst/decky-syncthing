import { iFolderStatus } from "../types"

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

    // NOTE: Skipping failed files + encrypted stuff for now
    // TODO: Implement required functions & calls for that

    if (data.folder.devices.length <= 1)
        return "unshared"

    return state;
}