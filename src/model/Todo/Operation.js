import _ from 'lodash';
import Todo from "./Todo";
import Priority from "./Priority";
export default class Operation {
    static create(title, priority, details) {
        return new Todo(
            title,
            _.isUndefined(priority) ? undefined : Priority.of(priority),
            details
        );
    }
}