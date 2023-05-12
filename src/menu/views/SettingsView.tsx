import { 
    TextField, ButtonItem, 
    PanelSectionRow, Focusable,
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { ChangeEvent, VFC, useState } from "react";

import { Toaster } from "../../utils/Toaster";
import { Settings } from "../../utils/Settings";
import { syncThingFetch } from "../../utils/Fetch";

import { iStPing } from "../../types";
import { Backend } from "../../utils/Backend";

export const SettingsView: VFC = ({}) => {

    // Define signals
    const [host, setHost] = useState<string>(Settings.host)
    const [apiKey, setApiKey] = useState<string>(Settings.apiKey)

    // Define UI functions
    const onHostChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHost(e.target.value)
    }
    const onApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setApiKey(e.target.value)
    }
    const onParseButtonPress = async () => {
        try {
            setHost((await Backend.getStHostAddr()).toString())
            setApiKey((await Backend.getStApiKey()).toString())
            Toaster.sendToast("Parsed from config!")
        } catch (e) {
            Toaster.sendToast("Error occurred while parsing!")
        }
    }
    const onTestButtonPress = () => {
        Settings.host = host
        Settings.apiKey = apiKey
        syncThingFetch<iStPing>("/rest/system/ping").then(result => {
            console.debug(`[SyncThing] ${JSON.stringify(result)}`)
            if (result.ping == "pong")
                Toaster.sendToast("Config OK! Go crazy!")
        }).catch(error => {
            console.debug(`[SyncThing] ${error}`)
            Toaster.sendToast(`${error}`)
        })
    }
    const onSaveButtonPress = () => {
        Settings.host = host
        Settings.apiKey = apiKey
        Settings.saveToBackend();
        Toaster.sendToast("Settings Saved!")
    }

    return (
        <Focusable>
            <div className={quickAccessMenuClasses.PanelSectionTitle}>
                SyncThing Settings</div>
            <TextField
                label="SyncThing Host"
                value={host}
                onChange={onHostChange}
            />
            <TextField
                label="SyncThing API Key"
                value={apiKey}
                onChange={onApiKeyChange}
            />

            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={onParseButtonPress}
                >Parse from SyncThing Config</ButtonItem>
                <ButtonItem
                    layout="below"
                    onClick={onTestButtonPress}
                >Test Configuration</ButtonItem>
                <ButtonItem
                    layout="below"
                    onClick={onSaveButtonPress}
                >Save Changes</ButtonItem>
            </PanelSectionRow>
        </Focusable>
    )
}