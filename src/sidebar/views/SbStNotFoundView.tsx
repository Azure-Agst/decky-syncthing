import { VFC } from "react";
import { commonBaseButton, commonSbError } from "../../common.css";
import { DialogButton, PanelSection } from "decky-frontend-lib";
import { readmeUrl } from "../../constants";

export const SbNotFoundView: VFC = () => {
    return (
        <PanelSection>
            <div style={commonSbError}>
                It looks like you don't have SyncThing installed properly!
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