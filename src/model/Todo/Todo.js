import Title from "./Title";
import Priority from "./Priority";
import Details from "./Details";

export default class Todo{
    _title;
    _priority;
    _details;

    constructor(title = 'title', priority = Priority.NORMAL, details = ''){
        this._title = new Title(title);
        this._priority = priority;
        this._details = new Details(details);
    }

    get title(){
        return this._title.value;
    }

    get priority(){
        return this._priority;
    }

    get details(){
        return this._details.value;
    }
}