const sum = arr => arr.reduce((a, b) => a + b, 0);
const average = arr => sum(arr) / arr.length;
const median = arr => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

var AggregationMethods = {
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

var ArrayMethods = {
  push(...items) {
    this.items.push(...items);
    return this;
  },
  pop() {
    return this.items.pop();
  },
  shift() {
    return this.items.shift();
  },
  unshift(...items) {
    this.items.unshift(...items);
    return this;
  }
};

const isFunction = item => typeof item === 'function';

var ObjectMethods = {
  get(key, defaultValue) {
    return key.split('.').reduce((obj, part) => obj && obj[part] !== undefined ? obj[part] : defaultValue, this.items);
  },
  pluck(key) {
    return this.map(item => item[key]);
  },
  only(keys) {
    return this.map(item => keys.reduce((acc, key) => ({
      ...acc,
      [key]: item[key]
    }), {}));
  }
};

var QueryMethods = {
  where(key, operator, value) {
    if (arguments.length === 2) {
      value = operator;
      operator = '===';
    }
    return this.filter(item => {
      const itemValue = item[key];
      switch (operator) {
        case '===':
          return itemValue === value;
        case '!==':
          return itemValue !== value;
        case '>':
          return itemValue > value;
        case '>=':
          return itemValue >= value;
        case '<':
          return itemValue < value;
        case '<=':
          return itemValue <= value;
        default:
          return false;
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

var TransformationMethods = {
  map(callback) {
    return new this.constructor(this.items.map(callback));
  },
  filter(callback) {
    return new this.constructor(this.items.filter(callback));
  },
  reduce(callback, initial) {
    return this.items.reduce(callback, initial);
  },
  flatten(depth = Infinity) {
    return new this.constructor(this.items.flat(depth));
  }
};

function deepClone(item) {
  if (item === null || typeof item !== 'object') {
    return item;
  }
  if (Array.isArray(item)) {
    return item.map(deepClone);
  }
  return Object.fromEntries(Object.entries(item).map(([key, value]) => [key, deepClone(value)]));
}

function after(key) {
  const index = this.items.findIndex(item => item[key] === this.get(key));
  return index >= 0 ? new this.constructor(this.items.slice(index + 1)) : new this.constructor();
}

function chunk(size) {
  const chunks = [];
  for (let i = 0; i < this.items.length; i += size) {
    chunks.push(this.items.slice(i, i + size));
  }
  return new this.constructor(chunks);
}

function collapse() {
  return new this.constructor(this.items.flat());
}

function combine(values) {
  return new this.constructor(this.items.reduce((result, key, index) => {
    result[key] = values[index];
    return result;
  }, {}));
}

function concat(values) {
  return new this.constructor(this.items.concat(values));
}

function contains(item) {
  return this.items.includes(item);
}

function diff(values) {
  const otherItems = this._wrap(values).all();
  return new this.constructor(this.items.filter(item => !otherItems.includes(item)));
}

function every(callback) {
  return this.items.every(callback);
}

function except(keys) {
  const keysArray = Array.isArray(keys) ? keys : [keys];
  return new this.constructor(Object.entries(this.items).filter(([key]) => !keysArray.includes(key)).reduce((obj, [key, val]) => ({
    ...obj,
    [key]: val
  }), {}));
}

function firstWhere(key, operator, value) {
  return this.where(key, operator, value).first();
}

function flatMap(callback) {
  return this.map(callback).collapse();
}

function where(key, operator, value) {
  if (arguments.length === 2) {
    value = operator;
    operator = '===';
  }
  const callback = item => {
    const itemValue = item[key];
    switch (operator) {
      case '==':
        return itemValue == value;
      case '===':
        return itemValue === value;
      case '!=':
        return itemValue != value;
      case '!==':
        return itemValue !== value;
      case '>':
        return itemValue > value;
      case '>=':
        return itemValue >= value;
      case '<':
        return itemValue < value;
      case '<=':
        return itemValue <= value;
      case 'in':
        return Array.isArray(value) && value.includes(itemValue);
      case 'not in':
        return Array.isArray(value) && !value.includes(itemValue);
      default:
        if (isFunction(operator)) {
          return operator(itemValue, value);
        }
        throw new Error(`Invalid operator: ${operator}`);
    }
  };
  return this.filter(callback);
}

// src/Collection.js
class Collection {
  constructor(items = []) {
    this.items = deepClone(items);
  }
  static make(items) {
    return new Collection(items);
  }
  _wrap(value) {
    return value instanceof Collection ? value : new Collection(value);
  }
  all() {
    return deepClone(this.items);
  }
  count() {
    return this.items.length;
  }
  first() {
    return this.items[0];
  }
  last() {
    return this.items[this.count() - 1];
  }
  static macro(name, fn) {
    if (!isFunction(fn)) {
      throw new TypeError('Macro must be a function');
    }
    Collection.prototype[name] = fn;
  }
  toArray() {
    return deepClone(this.items);
  }
  toJson() {
    return JSON.stringify(this.items);
  }
}
Object.assign(Collection.prototype, ArrayMethods);
Object.assign(Collection.prototype, ObjectMethods);
Object.assign(Collection.prototype, AggregationMethods);
Object.assign(Collection.prototype, TransformationMethods);
Object.assign(Collection.prototype, QueryMethods);
Collection.prototype.after = after;
Collection.prototype.chunk = chunk;
Collection.prototype.collapse = collapse;
Collection.prototype.combine = combine;
Collection.prototype.concat = concat;
Collection.prototype.contains = contains;
Collection.prototype.diff = diff;
Collection.prototype.every = every;
Collection.prototype.except = except;
Collection.prototype.firstWhere = firstWhere;
Collection.prototype.flatMap = flatMap;
Collection.prototype.where = where;

export { Collection as default };
