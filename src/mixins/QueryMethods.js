export default {
    where(key, operator, value) {
        if (arguments.length === 2) {
            value = operator;
            operator = '===';
        }
        return this.filter(item => {
            const itemValue = item[key];
            switch (operator) {
                case '===': return itemValue === value;
                case '!==': return itemValue !== value;
                case '>': return itemValue > value;
                case '>=': return itemValue >= value;
                case '<': return itemValue < value;
                case '<=': return itemValue <= value;
                default: return false;
            }
        });
    },
    whereIn(key, values) {
        return this.filter(item => values.includes(item[key]));
    },
    whereNotIn(key, values) {
        return this.filter(item => !values.includes(item[key]));
    }
};