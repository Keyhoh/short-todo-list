import Title from "./Title";
import Priority from "./Priority";

export default class Todo{
    _title;
    _priority;

    constructor(title = 'title', priority = Priority.NORMAL){
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