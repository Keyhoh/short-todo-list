import Title from './Title';

export default class Todo{
    _title;
    constructor(title = 'title'){
        this._title = new Title(title);
    }

    get title(){
        return this._title.value;
    }
}