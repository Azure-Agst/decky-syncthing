import {
    Router,
    ButtonItem,
    PanelSection,
} from "decky-frontend-lib";
import { VFC } from "react";

export const Sidebar: VFC = ({}) => {
    return (
        <PanelSection title="Panel Section">
            <div>
                Hi!
                <ButtonItem
                    layout="below"
                    onClick={() => {
                        Router.CloseSideMenus();
                        Router.Navigate("/decky-syncthing-settings")
                    }}
                >Open Settings</ButtonItem>
            </div>
        </PanelSection>
    );
};