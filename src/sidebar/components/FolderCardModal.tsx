import { VFC } from "react"
import { ConfirmModal } from "decky-frontend-lib"

import { iFolderStatus } from "../../types"
import { noMargin } from "./FolderCard.css"

export const FolderCardModal: VFC<{data: iFolderStatus, closeModal?(): void}> = ({ data, closeModal }) => {
    return (
        <ConfirmModal
            closeModal={closeModal}
            bAlertDialog={true}
            strOKButtonText={"Dismiss"}
            strTitle={data.folder.label}
            >
            <p style={noMargin}>Status: {data.dbStatus.state}</p>
            { data.stats && 
                <p style={noMargin}>Last File: {data.stats.lastFile.filename}</p>
            }
        </ConfirmModal>
    )
}
