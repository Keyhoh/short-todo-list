import _ from 'lodash';

export default class Title {
    _value;
    constructor(value = 'title') {
        if (_.isEmpty(value)) throw 'Title cannot be empty';
        if (value.length > 64) throw 'Title is too long';
        this._value = value;
    }

    get value() {
        return this._value;
    }
}