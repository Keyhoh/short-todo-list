import _ from 'lodash';

export default class Details {
    _value;

    constructor(details = '') {
        details = _.isNull(details) ? '' : details;
        this._value = details;
    }

    get value(){
        return this._value;
    }
}