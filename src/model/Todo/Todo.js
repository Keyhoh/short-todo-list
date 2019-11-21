import _ from 'lodash';

export default class Todo{
    _title;
    constructor(title = 'title'){
        if(_.isEmpty(title)) throw 'Title cannot be empty';
        if(title.length > 64) throw 'Title is too long';
        this._title = title ;
    }

    get title(){
        return this._title;
    }
}