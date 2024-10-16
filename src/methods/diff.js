export function diff(values) {
    const otherItems = this._wrap(values).all();
    return new this.constructor(this.items.filter(item => !otherItems.includes(item)));
}