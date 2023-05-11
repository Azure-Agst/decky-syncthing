import { CSSProperties, VFC } from "react"

import { iFolderStatus } from "../../types"

const cardDivStyle: CSSProperties = {
    color: "white",
    backgroundColor: "#202020",
    padding: "5px 10px 5px 10px"
}

const noMargin: CSSProperties = {
    margin: 0
}

export const FolderCard: VFC<{data: iFolderStatus}> = ({ data }) => {
    return (
        <div style={cardDivStyle}>
            <h3 style={noMargin}>{data.folder.label}</h3>
            <p style={noMargin}>Status: {data.status.state}</p>
        </div>
    )
}