import _ from 'lodash';
import Todo from "./Todo/Todo";
import Store from "./Todo/Store";
import ERROR_CODE from "./ERROR_CODE";
export default class Operation {
    static create(title, priority) {
        return new Todo(title, priority);
    }

    static updateTitle(todo, title) {
        todo.title = title;
        return todo;
    }

    static upPriority(todo) {
        todo.up();
    }

    static downPriority(todo) {
        todo.down();
    }

    static toggleCheck(todo) {
        todo.toggleCheck();
    }

    static discard(todo) {
        todo.discard();
    }

    static pullUp(todo) {
        todo.pullUp();
    }

    static async save(todo) {
        await Store.save(todo);
    }

    static find(id) {
        if (_.isNil(id) || _.toLength(id)) throw ERROR_CODE.ILLEGAL_TODO_ID;
        return Store.find(id);
    }

    static async delete(id) {
        if (_.isNil(id) || _.toLength(id)) throw ERROR_CODE.ILLEGAL_TODO_ID;
        await Store.delete(id);
    }
}