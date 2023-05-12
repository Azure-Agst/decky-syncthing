import { Router, DialogButton } from "decky-frontend-lib";
import { VFC } from "react";

export const SbBadConfigView: VFC = ({}) => {

    return (
        <div>
            <div style={{ margin: "auto" }}>
                SyncThing is running, but your config seems to be invalid!
            </div>
            <DialogButton
                onClick={() => {
                    Router.CloseSideMenus();
                    Router.Navigate("/decky-syncthing-settings")
                }}
            >Open Settings</DialogButton>
        </div>
    )
}