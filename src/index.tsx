import {
    definePlugin,
    ServerAPI,
    staticClasses
} from "decky-frontend-lib";
import { FaShip } from "react-icons/fa";

import { Backend } from "./utils/Backend";
import { Settings } from "./utils/Settings";

import { Sidebar } from "./sidebar/Sidebar";
import { SyncThingMenu } from "./menu/SyncThingMenu";

export default definePlugin((serverApi: ServerAPI) => {

    // Init backend & settings
    Backend.initBackend(serverApi)
    Settings.loadFromBackend()

    // Register Menus
    serverApi.routerHook.addRoute("/decky-syncthing-settings", SyncThingMenu, {
        exact: true
    })

    // Return Decky menu entry
    return {
        title: <div className={staticClasses.Title}>SyncThing</div>,
        content: <Sidebar />,
        icon: <FaShip />,
        onDismount() {
            Settings.saveToBackend()
            serverApi.routerHook.removeRoute("/decky-syncthing-settings")
        },
    };
});