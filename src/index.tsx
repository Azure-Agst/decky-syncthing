import {
    definePlugin,
    ServerAPI,
    staticClasses
} from "decky-frontend-lib";

import { Backend } from "./utils/Backend";
import { Settings } from "./utils/Settings";
import { Toaster } from "./utils/Toaster";

import { MenuIcon } from "./icons/MenuIcon";
import { Sidebar } from "./sidebar/Sidebar";
import { SyncThingMenu } from "./menu/SyncThingMenu";

export default definePlugin((serverApi: ServerAPI) => {

    // Init backend, toaster, & settings
    Backend.initBackend(serverApi)
    Toaster.initToaster(serverApi)
    Settings.loadFromBackend()

    // Register Menus
    serverApi.routerHook.addRoute("/decky-syncthing-settings", SyncThingMenu, {
        exact: true
    })

    // Return Decky menu entry
    return {
        title: <div className={staticClasses.Title}>SyncThing</div>,
        content: <Sidebar />,
        icon: <MenuIcon />,
        onDismount() {
            Settings.saveToBackend()
            serverApi.routerHook.removeRoute("/decky-syncthing-settings")
        },
    };
});