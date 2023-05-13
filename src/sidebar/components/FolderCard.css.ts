import { CSSProperties } from "react"

import { CommonCss, commonBaseButton } from "../../common.css"
import { iFolderStatus } from "../../types"
import { folderStatus } from "../../utils/Folder"

export const cardDivBase: CSSProperties = {
  ...commonBaseButton,
  color: "white",
  padding: "5px 10px",
}

export const cardDivStyle = {
  focus: {
    ...cardDivBase,
    backgroundColor: "#505050"
  },
  blur: {
    ...cardDivBase,
    backgroundColor: "#202020"
  }
}

export const statusColor = (data: iFolderStatus): CSSProperties => {
  var status = folderStatus(data)
  switch (status) {
    case "idle":
    case "localadditions":
      return { color: CommonCss.customSuccess }
    case "paused":
      return { color: CommonCss.customFaded }
    case "syncing":
    case "sync-preparing":
    case "scanning":
    case "cleaning":
      return { color: CommonCss.customPrimary }
    case "unknown":
      return { color: CommonCss.customInfo }
    case "stopped":
    case "outofsync":
    case "error":
    case "faileditems":
    case "localunencrypted":
      return { color: CommonCss.customDanger }
    case "unshared":
    case "scan-waiting":
    case "sync-waiting":
    case "clean-waiting":
      return { color: CommonCss.customWarning }
    default:
      return { color: CommonCss.customInfo }
  }
}

export const noMargin: CSSProperties = {
  margin: 0
}