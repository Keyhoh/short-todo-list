import Title from "./Title";
import Priority from "./Priority";
import Details from "./Details";

export default class Todo {
    _title;
    _priority;
    _details;
    _discarded = false;
    _checked = false;

    constructor(title = 'title', priority = 1, details = '') {
        this._title = new Title(title);
        this._priority = Priority.of(priority);
        this._details = new Details(details);
    }

    get title() {
        return this._title.value;
    }

    set title(title) {
        this._title = new Title(title);
    }

    get priority() {
        return this._priority.value;
    }

    up() {
        this._priority.up();
    }

    down() {
        this._priority.down();
    }

    get details() {
        return this._details.value;
    }

    get checked() {
        return this._checked;
    }

    toggleCheck() {
        this._checked = !this._checked;
    }

    get discarded() {
        return this._discarded;
    }

    discard() {
        this._discarded = true;
    }

    pullUp() {
        this._discarded = false;
    }
}