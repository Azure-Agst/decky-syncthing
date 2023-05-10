import {
    definePlugin,
    ServerAPI,
    staticClasses,
    PanelSection,
    PanelSectionRow,
} from "decky-frontend-lib";
import { VFC } from "react";
import { FaShip } from "react-icons/fa";

const Content: VFC<{ serverAPI: ServerAPI }> = ({}) => {
    return (
        <PanelSection title="Panel Section">
            <PanelSectionRow>
                <div>Hi!</div>
            </PanelSectionRow>
        </PanelSection>
    );
};

export default definePlugin((serverApi: ServerAPI) => {
    return {
        title: <div className={staticClasses.Title}>SyncThing</div>,
        content: <Content serverAPI={serverApi} />,
        icon: <FaShip />
    };
});