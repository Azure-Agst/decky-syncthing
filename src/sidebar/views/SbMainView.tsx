import {
    Router,
    DialogButton,
    PanelSection,
    quickAccessMenuClasses
} from "decky-frontend-lib";
import { VFC } from "react";

import { FolderList } from "../components/FolderList";
import { commonBaseButton } from "../../common.css";

export const SbMainView: VFC = ({}) => {

    return (
        <PanelSection>

            <div className={quickAccessMenuClasses.PanelSectionTitle}>Folders</div>
            <FolderList />
            <br/>

            <div className={quickAccessMenuClasses.PanelSectionTitle}>Settings</div>
            <DialogButton
                style={commonBaseButton}
                onClick={() => {
                    window.open("steam://openurl/http://localhost:8384", "_blank")
                }}
            >Open SyncThing</DialogButton>
            <DialogButton
                style={commonBaseButton}
                onClick={() => {
                    Router.CloseSideMenus();
                    Router.Navigate("/decky-syncthing-settings")
                }}
            >Open Settings</DialogButton>
            
        </PanelSection>
    )
}