export const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);
export const isArray = Array.isArray;
export const isFunction = (item) => typeof item === 'function';
export const isString = (item) => typeof item === 'string';
export const isNumber = (item) => typeof item === 'number' && !isNaN(item);