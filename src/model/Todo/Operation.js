import Todo from "./Todo";
import { isNull } from "util";

export default class Operation{
    static create(title){
        return new Todo(title);
    }
}