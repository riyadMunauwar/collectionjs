// src/Collection.js
import AggregationMethods from './mixins/AggregationMethods';
import ArrayMethods from './mixins/ArrayMethods';
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
Object.assign(Collection.prototype, ObjectMethods);
Object.assign(Collection.prototype, AggregationMethods);
Object.assign(Collection.prototype, TransformationMethods);
Object.assign(Collection.prototype, QueryMethods);


import { after } from './methods/after';
import { chunk } from './methods/chunk';
import { collapse } from './methods/collapse';
import { combine } from './methods/combine';
import { concat } from './methods/concat';
import { contains } from './methods/contains';
import { diff } from './methods/diff';
import { every } from './methods/every';
import { except } from './methods/except';
import { firstWhere } from './methods/firstWhere';
import { flatMap } from './methods/flatMap';
import { where } from './methods/where';


Collection.prototype.after = after;
Collection.prototype.chunk = chunk;
Collection.prototype.collapse = collapse;
Collection.prototype.combine = combine;
Collection.prototype.concat = concat;
Collection.prototype.contains = contains;
Collection.prototype.diff = diff;
Collection.prototype.every = every;
Collection.prototype.except = except;
Collection.prototype.firstWhere = firstWhere;
Collection.prototype.flatMap = flatMap;
Collection.prototype.where = where;


export default Collection;