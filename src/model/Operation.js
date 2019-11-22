import _ from 'lodash';
import Todo from "./Todo/Todo";
export default class Operation {
    static create(title, priority, details) {
        return new Todo(title, priority, details);
    }

    static updateTitle(todo, title) {
        todo.title = title;
        return todo;
    }

    static upPriority(todo){
        todo.up();
    }

    static downPriority(todo){
        todo.down();
    }
}