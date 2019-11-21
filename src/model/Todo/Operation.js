import Todo from "./Todo";
export default class Operation {
    static create(title, priority, details) {
        return new Todo(title, priority, details);
    }
}