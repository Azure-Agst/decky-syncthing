import { VFC, useState } from "react"
import { DialogButton, showModal } from "decky-frontend-lib"

import { iFolderStatus } from "../../types"
import { cardDivStyle, noMargin, statusColor } from "./FolderCard.css"
import { FolderCardModal } from "./FolderCardModal"
import { fullStatus } from "../../utils/Folder"

export const FolderCard: VFC<{data: iFolderStatus}> = ({ data }) => {

    const [focus, setFocus] = useState<boolean>(false);

    const showDetailsModal = () => {
        showModal(<FolderCardModal data={data} />)
    }

    return (
        <DialogButton 
            style={focus ? cardDivStyle.focus : cardDivStyle.blur }
            onGamepadFocus={() => setFocus(true)}
            onGamepadBlur={() => setFocus(false)}
            onClick={(_) => showDetailsModal()}
            >
            <h3 style={noMargin}>{data.folder.label}</h3>
            <p style={noMargin}>
                Status: <span style={statusColor(data)}>{fullStatus(data)}</span>
            </p>
        </DialogButton>
    )
}