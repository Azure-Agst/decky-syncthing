import { VFC } from "react";

export const SbNotLoadedView: VFC = ({}) => {

    return (
        <div style={{ margin: "auto" }}>
            <div>Your SyncThing service isn't loaded!</div>
            <div>Would you like us to start it for you?</div>
        </div>
    )
}