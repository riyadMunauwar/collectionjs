export function deepClone(item) {
    if (item === null || typeof item !== 'object') {
        return item;
    }
    if (Array.isArray(item)) {
        return item.map(deepClone);
    }
    return Object.fromEntries(
        Object.entries(item).map(([key, value]) => [key, deepClone(value)])
    );
}