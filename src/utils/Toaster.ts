import { ServerAPI, ToastData } from "decky-frontend-lib"

export class Toaster {
    private static serverAPI: ServerAPI

    static initToaster(server: ServerAPI) {
        this.serverAPI = server
    }

    static sendToast(body: string, data?: ToastData) {
        this.serverAPI.toaster.toast({
            title: "Decky SyncThing",
            body,
            ...data,
        })
    }
}