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

export default key => new LocalStorage(key)