import {
    PanelSection,
    PanelSectionRow,
    TextField,
    ButtonItem,
} from "decky-frontend-lib";
import { ChangeEvent, VFC, useEffect, useState } from "react";

import { iStVersion } from "../types.d";
import { Settings } from "../utils/Settings";

export const SettingsMenu: VFC = ({}) => {

    // Define signals
    const [host, setHost] = useState<string>(Settings.host)
    const [apiKey, setApiKey] = useState<string>(Settings.apiKey)
    const [stVersion, setStVersion] = useState<iStVersion>()

    // Define UI functions
    const onHostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHost(e.target.value)
    }
    const onApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value)
    }
    const onSaveButtonPress = () => {
        Settings.host = host
        Settings.apiKey = apiKey
        Settings.saveToBackend();
    }

    // Define fetch functions
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

    // Define Use Effect
    useEffect(() => {
        fetchStVersion().then(result => {
            setStVersion(result)
        });
    })

    // Return Element
    return (
        <div style={{ marginTop: "50px", color: "white" }}>
            <PanelSection title="Settings">
                <TextField
                    label="Host"
                    description="SyncThing's IP, usually localhost"
                    value={host}
                    onChange={onHostChange}
                />
                <TextField
                    label="API Key"
                    description="SyncThing's API Key"
                    value={apiKey}
                    onChange={onApiKeyChange}
                />

                <PanelSectionRow>
                    <ButtonItem
                        layout="below"
                        onClick={onSaveButtonPress}
                    >Save Changes</ButtonItem>
                </PanelSectionRow>
            </PanelSection>
            <hr/>
            <PanelSection title="SyncThing Info">
                <div>Version: {stVersion && stVersion.longVersion}</div>
            </PanelSection>
        </div>
    );
}