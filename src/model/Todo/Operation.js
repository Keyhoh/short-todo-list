import Todo from "./Todo";
import { isNull } from "util";

export default class Operation{
    static create(title){
        if(isNull(title)) throw 'Title cannot be null';
        return new Todo(title);
    }
}