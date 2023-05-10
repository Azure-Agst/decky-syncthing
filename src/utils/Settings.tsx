import { Backend } from "./Backend";

export class Settings {
    public static host: string = ""
    public static apiKey: string = ""

    static async loadFromBackend() {
        console.debug("[SyncThing] Loading settings from backend!")

        // Iterate over keys in this object, and populate if possible
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

        // If required keys are still blank, populate
        if (this.host == "") this.host = (await Backend.getStHostAddr()) as string
        if (this.apiKey == "") this.apiKey = (await Backend.getStApiKey()) as string
    }

    static async saveToBackend() {

        // Create a bunch of promises for each key
        let promises = Object.keys(this).map(key => {
            return Backend.setSetting(key, this[key])
        })

        // Await all promises, then commit & log
        Promise.all(promises).then(async () => {
            await Backend.commitSettings()
            console.debug("[SyncThing] Saved settings to backend!")
        })
    }
}