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
}