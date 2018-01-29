
export default {
    set(key, data) {
        return localStorage.setItem(key, data);
    },
    get(key) {
        return localStorage.getItem(key);
    },
    remove(key) {
        return localStorage.removeItem(key);
    },
    clear() {
        return localStorage.clear();
    },
    exist(key) {
        return localStorage.hasOwnProperty(key);
      }
}