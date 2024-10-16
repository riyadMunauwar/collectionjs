export const sum = (arr) => arr.reduce((a, b) => a + b, 0);
export const average = (arr) => sum(arr) / arr.length;
export const median = (arr) => {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};