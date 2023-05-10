import {
    PanelSection,
    PanelSectionRow,
    TextField,
    ButtonItem,
} from "decky-frontend-lib";
import { ChangeEvent, VFC, useState } from "react";

import { Settings } from "../utils/Settings";

export const SettingsMenu: VFC = ({}) => {

    // Define signals
    const [host, setHost] = useState<string>(Settings.host)
    const [apiKey, setApiKey] = useState<string>(Settings.apiKey)

    // Define functions
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
        </div>
    );
}