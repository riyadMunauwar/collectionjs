export function each(callback) {
    this.items.forEach(callback);
    return this;
}