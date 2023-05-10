import {
    ServerAPI,
    PanelSection,
    PanelSectionRow,
} from "decky-frontend-lib";
import { VFC } from "react";

export const Sidebar: VFC<{ serverAPI: ServerAPI }> = ({}) => {
    return (
        <PanelSection title="Panel Section">
            <PanelSectionRow>
                <div>Hi!</div>
            </PanelSectionRow>
        </PanelSection>
    );
};