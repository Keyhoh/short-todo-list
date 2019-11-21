import Todo from "./Todo";
export default class Operation{
    static create(title){
        return new Todo(title);
    }
}