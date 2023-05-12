import { Focusable, Tabs } from "decky-frontend-lib";
import { VFC, useState } from "react";

import { SettingsView, VersionView } from "./views";



export const SyncThingMenu: VFC = ({}) => {

    // Define state
    const [currentTab, setCurrentTab] = useState<string>("settings")

    return (
        <Focusable style={{ minWidth: "100%", minHeight: "100%" }}>
            <div style={{ marginTop: "40px", height: "calc(100% - 40px)" }}>
                <Tabs
                    activeTab={currentTab}
                    onShowTab={(tab: string) => {
                        setCurrentTab(tab)
                    }}
                    tabs={[
                        {
                            title: "Settings",
                            content: <SettingsView />,
                            id: "settings"
                        },
                        {
                            title: "Version",
                            content: <VersionView />,
                            id: "version"
                        }
                    ]}
                />
            </div>
        </Focusable>
    );
}