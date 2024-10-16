export function combine(values) {
    return new this.constructor(
        this.items.reduce((result, key, index) => {
            result[key] = values[index];
            return result;
        }, {})
    );
}