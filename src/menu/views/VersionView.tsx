import {
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { iStVersion } from "../../types";
import { Settings } from "../../utils/Settings";

import { titleClass, subheadingClass } from "./VersionView.css";

// @ts-ignore
import * as pluginJson from "../../../plugin.json";
// @ts-ignore
import * as packageJson from "../../../package.json"; 
// ^^ I know this is bad behavior but whatever -A

const fetchStVersion = async (): Promise<iStVersion> => {
    try {
        const result = await fetch(`http://${Settings.host}/rest/system/version`, {
            headers: {
                "X-API-Key": Settings.apiKey
            }
        })
        if (result.status == 200) return await result.json();
        if (result.status == 403) return Promise.reject("Bad Authorization!")
    } catch (e) {
        return Promise.reject(e)
    }
    return Promise.reject("An undocumented error has occured!");
}

export const VersionView: VFC = ({}) => {

    // Define state
    const [stVersion, setStVersion] = useState<iStVersion>()

    // Define Effects
    useEffect(() => {
        fetchStVersion().then(result => {
            setStVersion(result)
        });
    })

    return(
        <div>
            <div style={titleClass}>{pluginJson.name} v{packageJson.version}</div>
            <div style={subheadingClass}>{pluginJson.author}</div>
            <div>{pluginJson.publish.description}</div>
            <hr/><br/>

            <div className={quickAccessMenuClasses.PanelSectionTitle}>SyncThing Info</div>
            <div>Version: {stVersion?.version}</div>
            <div>Arch/OS: {stVersion?.arch}/{stVersion?.os}</div>
        </div>
    )
}