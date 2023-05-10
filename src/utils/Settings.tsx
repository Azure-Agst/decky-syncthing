import { Backend } from "./Backend";

export class Settings {
    public static host: string = "localhost"
    public static port: number = 8384
    public static apiKey: string = ""

    static async loadFromBackend() {
        console.debug("[SyncThing] Loading settings from backend!")
        for (let key in this) {
            try {
                if (typeof this[key] == "boolean") {
                    this[key] = (await Backend.getSetting(key, this[key])) as boolean
                } else if (typeof this[key] == "number") {
                    this[key] = (await Backend.getSetting(key, this[key])) as number
                } else if (typeof this[key] == "string") {
                    this[key] = (await Backend.getSetting(key, this[key])) as string
                }
            } catch (error) {
                console.debug(`[SyncThing] Failed to load setting: ${key}`)
            }
        }
    }

    static async saveToBackend() {
        let promises = Object.keys(this).map(key => {
            return Backend.setSetting(key, this[key])
        })
        Promise.all(promises).then(async () => {
            await Backend.commitSettings()
            console.debug("[SyncThing] Saved settings to backend!")
        })
    }
}