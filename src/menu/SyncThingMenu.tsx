import { Focusable, Tabs } from "decky-frontend-lib";
import { VFC, useState } from "react";

import { SettingsView, VersionView, SystemdView } from "./views";

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
                            title: "Systemd",
                            content: <SystemdView />,
                            id: "systemd"
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