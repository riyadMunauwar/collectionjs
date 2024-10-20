import {
    every
} from 'underscore';

export default {
    every(cb) {
        return every(this.items, cb);
    }
};