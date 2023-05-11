import {
    Router,
    ButtonItem,
    PanelSection,
} from "decky-frontend-lib";
import { VFC } from "react";

import { FolderList } from "../components/FolderList";

export const SbMainView: VFC = ({}) => {

    return (
        <div>
            <PanelSection title="Folders">
                <FolderList />
            </PanelSection>
            
            <PanelSection title="Settings">
                <ButtonItem
                    layout="below"
                    onClick={() => {
                        Router.CloseSideMenus();
                        Router.Navigate("/decky-syncthing-settings")
                    }}
                >Open Settings</ButtonItem>
            </PanelSection>
        </div>
    )
}