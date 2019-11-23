import _ from 'lodash';
import Id from "./Id";
import Title from "./Title";
import Priority from "./Priority";

export default class Todo {
    _id;
    _title;
    _priority;
    _checked = false;
    _discarded = false;

    constructor(title = 'title', priority = 1) {
        this._id = Id.new();
        this._title = new Title(title);
        this._priority = Priority.of(priority);
    }

    static reconstruct({ id, title, priority, checked, discarded }) {
        if (_.isNil(id) || _.isNil(title) || _.isNil(priority) || _.isNaN(Number(priority))) throw 'Unexpected todo';
        let todo = new Todo(title, priority);
        todo._id = Id.of(id);
        todo._checked = !!checked;
        todo._discarded = !!discarded;
        return todo;
    }

    get id() {
        return this._id.value;
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

    toJson() {
        return {
            id: this.id,
            title: this.title,
            priority: this.priority,
            checked: this.checked,
            discarded: this.discarded
        };
    }
}