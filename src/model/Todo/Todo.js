import _ from 'lodash';

export default class Todo{
    _title;
    constructor(title = 'title'){
        if(_.isNil(title)) throw 'Title cannot be null';
        this._title = title ;
    }

    get title(){
        return this._title;
    }
}