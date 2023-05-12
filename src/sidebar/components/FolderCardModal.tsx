import { VFC } from "react"
import { ConfirmModal } from "decky-frontend-lib"

import { iFolderStatus } from "../../types"
import { statusColor } from "./FolderCard.css"
import { fullStatus } from "../../utils/Folder"

export const humanFileSize = (bytes: number): string => {
    let units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB']
    let thresh = 1000; let i = 0;
    while (Math.abs(bytes) >= thresh) {
        bytes /= thresh;
        i++;
    }
    return bytes.toFixed(2) + ' ' + units[i];
}

export const FolderCardModal: VFC<{data: iFolderStatus, closeModal?(): void}> = ({ data, closeModal }) => {
    return (
        <ConfirmModal
            closeModal={closeModal}
            bAlertDialog={true}
            strOKButtonText={"Dismiss"}
            strTitle={<span>
                {data.folder.label} - <span style={statusColor(data)}>{fullStatus(data)}</span>
            </span>}>

            <div>{data.dbStatus.globalFiles} files, {data.dbStatus.globalDirectories} directories, ~{humanFileSize(data.dbStatus.globalBytes)}</div>
            <br/>
            <div><b>Folder ID:</b> {data.folder.id}</div>
            <div><b>Folder Path:</b> {data.folder.path}</div>

            { data.stats && <br/> }
            { data.stats && <div><b>Last Scan:</b> {new Date(data.stats.lastScan).toLocaleString()}</div> }
            { data.stats && data.stats.lastFile.filename != "" &&
                <div><b>Last File:</b> {data.stats.lastFile.filename} @ {new Date(data.stats.lastFile.at).toLocaleString()}</div>
            }

        </ConfirmModal>
    )
}
