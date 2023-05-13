import { Router, DialogButton, PanelSection } from "decky-frontend-lib";
import { VFC } from "react";
import { commonSbError } from "../../common.css";

export const SbBadConfigView: VFC = ({}) => {

    return (
        <PanelSection>
            <div style={commonSbError}>
                SyncThing is running, but your config seems to be invalid!
                Would you like to open Settings to fix it?
            </div>
            <DialogButton
                onClick={() => {
                    Router.CloseSideMenus();
                    Router.Navigate("/decky-syncthing-settings")
                }}
            >Open Settings</DialogButton>
        </PanelSection>
    )
}