import Todo from "./Todo";
export default class Operation{
    static create(title, priority){
        return new Todo(title, priority);
    }
}