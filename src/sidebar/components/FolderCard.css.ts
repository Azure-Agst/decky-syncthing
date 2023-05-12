import { CSSProperties } from "react"

export const cardDivBase: CSSProperties = {
    color: "white",
    padding: "5px 10px",
    margin: "5px 0px",
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

export const noMargin: CSSProperties = {
    margin: 0
}