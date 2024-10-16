export const TransformationMethods = {
    map(callback) {
        return new this.constructor(this.items.map(callback));
    },
    filter(callback) {
        return new this.constructor(this.items.filter(callback));
    },
    reduce(callback, initial) {
        return this.items.reduce(callback, initial);
    },
    flatten(depth = Infinity) {
        return new this.constructor(this.items.flat(depth));
    }
};