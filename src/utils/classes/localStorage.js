class LocalStorage {
    constructor(key) {
        this.key = key
    }

    get() {
        return localStorage.getItem(this.key)
    }

    set(value) {
        localStorage.setItem(this.key, value)
    }
}

export const STORAGE_KEYS = {
    THEME_PREFERENCE: 'Pronogeeks_theme_preference',
    GEEKLEAGUE_PREFERENCE: 'Pronogeeks_geekleague_preference'
}

export const preferredTheme = new LocalStorage(STORAGE_KEYS.THEME_PREFERENCE)

export const preferredGeekleague = new LocalStorage(STORAGE_KEYS.GEEKLEAGUE_PREFERENCE)