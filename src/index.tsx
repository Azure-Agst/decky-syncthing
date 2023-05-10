import {
    definePlugin,
    ServerAPI,
    staticClasses
} from "decky-frontend-lib";
import { FaShip } from "react-icons/fa";

import { Backend } from "./utils/Backend";
import { Settings } from "./utils/Settings";
import { Sidebar } from "./sidebar/Sidebar";

export default definePlugin((serverApi: ServerAPI) => {

    // Init backend & settings
    Backend.initBackend(serverApi)
    Settings.loadFromBackend()

    // Return Decky menu entry
    return {
        title: <div className={staticClasses.Title}>SyncThing</div>,
        content: <Sidebar serverAPI={serverApi} />,
        icon: <FaShip />,
        onDismount() {
            Settings.saveToBackend()
        },
    };
});