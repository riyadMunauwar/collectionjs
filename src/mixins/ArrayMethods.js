export const ArrayMethods = {
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