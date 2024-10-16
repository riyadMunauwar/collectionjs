import { isObject } from '../utils/types';

export const ObjectMethods = {
    get(key, defaultValue) {
        return key.split('.').reduce((obj, part) => 
            (obj && obj[part] !== undefined) ? obj[part] : defaultValue, this.items);
    },
    pluck(key) {
        return this.map(item => item[key]);
    },
    only(keys) {
        return this.map(item => 
            keys.reduce((acc, key) => ({ ...acc, [key]: item[key] }), {})
        );
    }
};