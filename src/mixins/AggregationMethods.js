import { sum, average, median } from '../utils/math';

export const AggregationMethods = {
    sum(key) {
        const values = key ? this.pluck(key) : this.items;
        return sum(values);
    },
    avg(key) {
        const values = key ? this.pluck(key) : this.items;
        return average(values);
    },
    median(key) {
        const values = key ? this.pluck(key) : this.items;
        return median(values);
    }
};