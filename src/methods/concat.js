export function concat(values) {
    return new this.constructor(this.items.concat(values));
}
