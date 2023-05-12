import { Settings } from "./Settings";

export const syncThingFetch = async <T>(endpoint: string): Promise<T> => {
    try {
        
        // Get request
        const result = await fetch(`http://${Settings.host}${endpoint}`, {
            headers: {
                "X-API-Key": Settings.apiKey
            }
        })

        // If ok, return JSON
        if (result.status == 200) return await result.json();

        // If unauthorized, return rejection
        if (result.status == 403) throw new Error("Bad Authorization!");

        // If not found, throw error
        if (result.status == 404) throw new Error("Not Found!");

    } catch (e) {

        // Notably, CORS headers are missing from 403 Forbidden
        // This causes a generic TypeError to be raised, which we can handle
        if (e instanceof TypeError && /Failed to fetch/.test(e.message))
            throw new Error("Bad Authorization!");

        // If it's anything else, raise the error
        throw e
    }
    throw new Error("An undocumented error has occured!");
}