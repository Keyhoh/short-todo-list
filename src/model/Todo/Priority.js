import _ from 'lodash';

export default class Priority {
    _level;
    static LEVEL = Object.freeze(['LOW', 'NORMAL', 'HIGHT']);

    constructor(p = 1) {
        this._level = Priority.LEVEL[p];
        if (_.isUndefined(this._level)) throw 'Unknown priority';
    }
    static of(p) {
        return new Priority(p);
    }

    get value() {
        return Priority.LEVEL.indexOf(this._level);
    }

    up() {
        const tmp = Priority.LEVEL[this.value + 1];
        if (_.isUndefined(tmp)) return;
        this._level = tmp;
    }

    down() {
        const tmp = Priority.LEVEL[this.value - 1];
        if (_.isUndefined(tmp)) return;
        this._level = tmp;
    }
}