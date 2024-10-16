export function flatMap(callback) {
    return this.map(callback).collapse();
}