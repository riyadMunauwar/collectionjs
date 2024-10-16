export function chunk(size) {
    const chunks = [];
    for (let i = 0; i < this.items.length; i += size) {
        chunks.push(this.items.slice(i, i + size));
    }
    return new this.constructor(chunks);
}