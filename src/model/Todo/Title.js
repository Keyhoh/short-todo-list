import _ from 'lodash';
import ERROR_CODE from "../ERROR_CODE";

export default class Title {
    _value;
    constructor(value = 'title') {
        if (_.isEmpty(value)) throw ERROR_CODE.EMPTY_TITLE;
        if (value.length > 64) throw ERROR_CODE.TOO_LONG_TITLE;
        this._value = value;
    }

    get value() {
        return this._value;
    }
}