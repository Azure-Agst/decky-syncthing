import { VFC } from "react"
import { Focusable } from "decky-frontend-lib"

import { iFolderStatus } from "../../types"
import { cardDivStyle, noMargin } from "./FolderCard.css"

export const FolderCard: VFC<{data: iFolderStatus}> = ({ data }) => {
    return (
        <Focusable>
            <div style={cardDivStyle}>
                <h3 style={noMargin}>{data.folder.label}</h3>
                <p style={noMargin}>Status: {data.dbStatus.state}</p>
                { data.stats && 
                    <p style={noMargin}>Last File: {data.stats.lastFile.filename}</p>
                }
            </div>
        </Focusable>
    )
}