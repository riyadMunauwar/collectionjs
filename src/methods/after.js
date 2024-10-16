export function after(key) {
    const index = this.items.findIndex(item => item[key] === this.get(key));
    return index >= 0 ? new this.constructor(this.items.slice(index + 1)) : new this.constructor();
}