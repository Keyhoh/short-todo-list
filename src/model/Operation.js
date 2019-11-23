import _ from 'lodash';
import Todo from "./Todo/Todo";
import Store from "./Todo/Store";
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

    static async save(todo){
        await Store.save(todo);
    }

    static find(id){
        return Store.find(id);
    }
}