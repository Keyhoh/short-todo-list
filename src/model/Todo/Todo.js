export default class Todo{
    _title;
    constructor(title = 'title'){
        this._title = title ;
    }

    get title(){
        return this._title;
    }
}