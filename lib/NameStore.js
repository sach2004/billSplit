// src/lib/NameStore.js
class NameStore {
    constructor() {
        this.names = [];
    }

    addName(name) {
        this.names.push(name);
    }

    getNames() {
        return this.names;
    }
}

export default new NameStore();