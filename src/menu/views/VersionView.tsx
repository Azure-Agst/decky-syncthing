import {
    DialogButton,
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { iStVersion } from "../../types";
import { syncThingFetch } from "../../utils/Fetch";

import { titleClass, subheadingClass } from "./VersionView.css";
import { commonBaseButton } from "../../common.css";

// @ts-ignore
import * as pluginJson from "../../../plugin.json";
// @ts-ignore
import * as packageJson from "../../../package.json"; 
// ^^ I know this is bad behavior but whatever -A

export const VersionView: VFC = ({}) => {

    // Define state
    const [stVersion, setStVersion] = useState<iStVersion>()

    // Define Effects
    useEffect(() => {
        syncThingFetch<iStVersion>("/rest/system/version").then(result => {
            setStVersion(result)
        });
    })

    return(
        <div>
            <div style={titleClass}>{pluginJson.name} v{packageJson.version}</div>
            <div style={subheadingClass}>{pluginJson.author}</div>
            <div>{pluginJson.publish.description}</div>
            <div>
                <DialogButton
                    style={commonBaseButton}
                    onClick={() => {
                        let readme = "https://github.com/Azure-Agst/decky-syncthing/blob/main/README.md#L1"
                        window.open(`steam://openurl/${readme}`, "_blank")
                    }}
                >Open README</DialogButton>
            </div>
            <hr/><br/>

            <div className={quickAccessMenuClasses.PanelSectionTitle}>SyncThing Info</div>
            <div>Version: {stVersion?.version}</div>
            <div>Arch/OS: {stVersion?.arch}/{stVersion?.os}</div>
        </div>
    )
}