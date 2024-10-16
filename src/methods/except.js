export function except(keys) {
    const keysArray = Array.isArray(keys) ? keys : [keys];
    return new this.constructor(
        Object.entries(this.items)
            .filter(([key]) => !keysArray.includes(key))
            .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
    );
}