import { VFC, useEffect, useState } from "react";
import { commonBaseButton, commonSbError } from "../../common.css";
import { DialogButton, PanelSection } from "decky-frontend-lib";
import { Backend } from "../../utils/Backend";
import { readmeUrl } from "../../constants";
import { Toaster } from "../../utils/Toaster";

export const SbNotFoundView: VFC = () => {

    const [isInstalled, setIsInstalled] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)
    
    useEffect(() => {
        Backend.getIsStGTKInstalled().then(result => {
            if (result) 
                setIsInstalled(true)
            setLoaded(true)
        })
    }, [])

    if (!loaded)
        return (<div>Loading...</div>)

    if (isInstalled) {
        return (
            <PanelSection>
                <div style={commonSbError}>
                    It looks like SyncThing GTK is installed, but it isn't 
                    configured to start in gaming mode! Would you like to
                    change that?
                </div>
                <DialogButton
                    style={commonBaseButton}
                    onClick={async () => {
                        let res = await Backend.installStSystemd()
                        if (res == 0) {
                            Toaster.sendToast("Started! Close/Reopen Quick Access!")
                        } else {
                            Toaster.sendToast("Failed! Check logs.")
                        }
                    }}
                >Create SyncThing Service</DialogButton>
                <DialogButton
                    style={commonBaseButton}
                    onClick={() => {
                        window.open(`steam://openurl/${readmeUrl}`, "_blank")
                    }}
                >Open README</DialogButton>
            </PanelSection>
        )
    } else {
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
    
}