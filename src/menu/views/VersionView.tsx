import {
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC, useEffect, useState } from "react";

import { iStVersion } from "../../types";
import { Settings } from "../../utils/Settings";

import { titleClass, subheadingClass } from "./VersionView.css";

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
            <div style={titleClass}>Decky Syncthing</div>
            <div style={subheadingClass}>By: Andrew Augustine {'<me@azureagst.dev>'}</div>
            <hr/><br/>
            <div className={quickAccessMenuClasses.PanelSectionTitle}>SyncThing Info</div>
            <div>Version: {stVersion?.version}</div>
        </div>
    )
}