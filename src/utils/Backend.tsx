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

    static async getStHostAddr(): Promise<string | {}> {
        var output = await this.callMethod("getStHostAddr")
        return output
    }

    static async getStApiKey(): Promise<string | {}> {
        var output = await this.callMethod("getStApiKey")
        return output
    }

    /*
     * Systemd-related calls
     */

    static async getStStatus(): Promise<number> {
        var output = await this.callMethod("getStStatus")
        if (typeof output === 'number') 
            return output
        else 
            console.warn("[SyncThing] getStStatus:", 
                `returned ${typeof output} '${output}'`)
        return -1
    }

    static async installStSystemd(): Promise<number> {
        var output = await this.callMethod("installStSystemd")
        if (typeof output === 'number') 
            return output
        else 
            console.warn("[SyncThing] installStSystemd:", 
                `returned ${typeof output} '${output}'`)
        return -1
    }

    static async uninstallStSystemd(): Promise<number> {
        var output = await this.callMethod("uninstallStSystemd")
        if (typeof output === 'number') 
            return output
        else 
            console.warn("[SyncThing] uninstallStSystemd:",
                `returned ${typeof output} '${output}'`)
        return -1
    }
}