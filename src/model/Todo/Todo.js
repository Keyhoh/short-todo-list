import _ from 'lodash';

export default class Todo{
    _title;
    constructor(title = 'title'){
        if(_.isEmpty(title)) throw 'Title cannot be empty';
        this._title = title ;
    }

    get title(){
        return this._title;
    }
}