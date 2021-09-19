class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  getKey(id) {
    return id ? `${this.key}_${id}` : this.key;
  }

  get(id) {
    return localStorage.getItem(this.getKey(id));
  }

  set(value, id) {
    localStorage.setItem(this.getKey(id), value);
  }

  remove(id) {
    localStorage.removeItem(this.getKey(id));
  }
}

export const STORAGE_KEYS = {
  THEME_PREFERENCE: 'Pronogeeks_theme_preference',
  GEEKLEAGUE_PREFERENCE: 'Pronogeeks_geekleague_preference',
};

export const preferredTheme = new LocalStorage(STORAGE_KEYS.THEME_PREFERENCE);

export const preferredSeasonGeekleague = new LocalStorage(STORAGE_KEYS.GEEKLEAGUE_PREFERENCE);
