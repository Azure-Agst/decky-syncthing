import { VFC } from "react"

import { iFolderStatus } from "../../types"

export const FolderCard: VFC<{data: iFolderStatus}> = ({ data }) => {
    return (
        <div style={{color: "white", backgroundColor: "dimgray"}}>
            <h3>{data.folder.label}</h3>
            <p>Status: {data.status.state}</p>
        </div>
    )
}