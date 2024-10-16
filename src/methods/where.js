import { isFunction } from '../utils/types';

export function where(key, operator, value) {
    if (arguments.length === 2) {
        value = operator;
        operator = '===';
    }

    const callback = (item) => {
        const itemValue = item[key];
        
        switch (operator) {
            case '==': return itemValue == value;
            case '===': return itemValue === value;
            case '!=': return itemValue != value;
            case '!==': return itemValue !== value;
            case '>': return itemValue > value;
            case '>=': return itemValue >= value;
            case '<': return itemValue < value;
            case '<=': return itemValue <= value;
            case 'in': return Array.isArray(value) && value.includes(itemValue);
            case 'not in': return Array.isArray(value) && !value.includes(itemValue);
            default:
                if (isFunction(operator)) {
                    return operator(itemValue, value);
                }
                throw new Error(`Invalid operator: ${operator}`);
        }
    };

    return this.filter(callback);
}