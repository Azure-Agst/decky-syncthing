import {
    Router,
    DialogButton,
    PanelSection,
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC } from "react";

import { FolderList } from "../components/FolderList";

export const SbMainView: VFC = ({}) => {

    return (
        <PanelSection>

            <FolderList />

            <div className={quickAccessMenuClasses.PanelSectionTitle}>Settings</div>
            <DialogButton
                onClick={() => {
                    Router.CloseSideMenus();
                    Router.Navigate("/decky-syncthing-settings")
                }}
            >Open Settings</DialogButton>
            
        </PanelSection>
    )
}