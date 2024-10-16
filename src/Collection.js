// src/Collection.js

import * as methods from './methods';
import * as mixins from './mixins';
import { isObject, isArray, isFunction } from './utils/types';
import { deepClone } from './utils/clone';

class Collection {
    constructor(items = []) {
        this.items = deepClone(items);
    }

    static make(items) {
        return new Collection(items);
    }

    _wrap(value) {
        return value instanceof Collection ? value : new Collection(value);
    }

    all() {
        return deepClone(this.items);
    }

    count() {
        return this.items.length;
    }

    first() {
        return this.items[0];
    }

    last() {
        return this.items[this.count() - 1];
    }

    static macro(name, fn) {
        if (!isFunction(fn)) {
            throw new TypeError('Macro must be a function');
        }
        Collection.prototype[name] = fn;
    }

    toArray() {
        return deepClone(this.items);
    }

    toJson() {
        return JSON.stringify(this.items);
    }
}

Object.assign(Collection.prototype, mixins.ArrayMethods);
Object.assign(Collection.prototype, mixins.ObjectMethods);
Object.assign(Collection.prototype, mixins.AggregationMethods);
Object.assign(Collection.prototype, mixins.TransformationMethods);
Object.assign(Collection.prototype, mixins.QueryMethods);

Object.keys(methods).forEach(methodName => {
    Collection.prototype[methodName] = methods[methodName];
});

export default Collection;