import _ from 'lodash';
import Todo from "./Todo/Todo";
import Store from "./Todo/Store";
import ERROR_CODE from "./ERROR_CODE";

export default {
    create: (title, priority) => {
        return new Todo(title, priority);
    },

    updateTitle: (todo, title) => {
        todo.title = title;
        return todo;
    },

    upPriority: todo => {
        todo.up();
    },

    downPriority: todo => {
        todo.down();
    },

    toggleCheck: todo => {
        todo.toggleCheck();
    },

    discard: todo => {
        todo.discard();
    },

    discardAll: async () => {
        await Store.discardAll();
    },

    pullUp: todo => {
        todo.pullUp();
    },

    save: async todo => {
        await Store.save(todo);
    },

    find: id => {
        if (_.isNil(id) || _.toLength(id)) throw new Error(ERROR_CODE.ILLEGAL_TODO_ID);
        return Store.find(id);
    },

    delete: async id => {
        if (_.isNil(id) || _.toLength(id)) throw new Error(ERROR_CODE.ILLEGAL_TODO_ID);
        await Store.delete(id);
    },

    deleteAll: async () => {
        await Store.deleteAll();
    }
}