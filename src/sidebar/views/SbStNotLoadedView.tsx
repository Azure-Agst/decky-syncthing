import { VFC } from "react";
import { commonBaseButton, commonSbError } from "../../common.css";
import { DialogButton, PanelSection } from "decky-frontend-lib";
import { readmeUrl } from "../../constants";

export const SbNotLoadedView: VFC = ({}) => {

    return (
        <PanelSection>
            <div style={commonSbError}>
                Your SyncThing service isn't running!
                Would you like to see the README?
            </div>
            <DialogButton
                style={commonBaseButton}
                onClick={() => {
                    window.open(`steam://openurl/${readmeUrl}`, "_blank")
                }}
            >Open README</DialogButton>
        </PanelSection>
    )
}