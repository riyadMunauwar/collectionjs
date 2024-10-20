import AggregationMethods from './mixins/AggregationMethods';
import ArrayMethods from './mixins/ArrayMethods';
import CollectionMethods from './mixins/CollectionMethods';
import ObjectMethods from './mixins/ObjectMethods';
import QueryMethods from './mixins/QueryMethods';
import TransformationMethods from './mixins/TransformationMethods';
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

Object.assign(Collection.prototype, ArrayMethods);
Object.assign(Collection.prototype, CollectionMethods);
Object.assign(Collection.prototype, ObjectMethods);
Object.assign(Collection.prototype, AggregationMethods);
Object.assign(Collection.prototype, TransformationMethods);
Object.assign(Collection.prototype, QueryMethods);


export default Collection;