import { ServerAPI } from "decky-frontend-lib"

export class Backend {
    private static serverAPI: ServerAPI

    static initBackend(server: ServerAPI) {
        this.serverAPI = server
    }

    static async callMethod(functionName: string, namedArgs?: any) {
        namedArgs = (namedArgs) ? namedArgs : {}
        var output = await this.serverAPI.callPluginMethod(functionName, namedArgs)
        return output.result
    }

    /*
     * Settings-related calls
     */

    static async getSetting(key: string, defaults: any) {
        var output = await this.callMethod("getSetting", {key, defaults})
        return output
    }

    static async setSetting(key: string, value: any) {
        var output = await this.callMethod("setSetting", {key, value})
        return output
    }

    static async commitSettings() {
        var output = await this.callMethod("saveSettings")
        return output
    }

    /*
     * SyncThing-related calls
     */

    static async getStHostAddr() {
        var output = await this.callMethod("getStHostAddr")
        return output
    }

    static async getStApiKey() {
        var output = await this.callMethod("getStApiKey")
        return output
    }
}