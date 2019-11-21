import Title from './Title';

export default class Todo{
    _title;
    _priority;

    constructor(title = 'title', priority = 0){
        this._title = new Title(title);
        this._priority = priority;
    }

    get title(){
        return this._title.value;
    }

    get priority(){
        return this._priority;
    }
}