// src/LazyCollection.js

import Collection from './Collection';

class LazyCollection extends Collection {
    constructor(items = []) {
        super(items);
        this._lazy = true;
        this._pipeline = [];
    }

    _executePipeline() {
        if (!this._lazy) return;
        this.items = this._pipeline.reduce((items, fn) => fn(items), this.items);
        this._pipeline = [];
        this._lazy = false;
    }

    map(callback) {
        if (this._lazy) {
            this._pipeline.push(items => items.map(callback));
            return this;
        }
        return super.map(callback);
    }

    filter(callback) {
        if (this._lazy) {
            this._pipeline.push(items => items.filter(callback));
            return this;
        }
        return super.filter(callback);
    }

    all() {
        this._executePipeline();
        return super.all();
    }

    count() {
        this._executePipeline();
        return super.count();
    }

    // Override other methods as needed...
}

export default LazyCollection;