export function collapse() {
    return new this.constructor(this.items.flat());
}