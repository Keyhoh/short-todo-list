import ListComponent from "./ListComponent";
import Operation from "../../operation/Operation";

export default class DiscardedList extends ListComponent {
    constructor(props) {
        super(props);
        this.listener['deleteTodo'] = () => this.delete();
    }

    delete() {
        if (!this.props.focused) return;
        const todo = this.props.list[this.state.focusedTodo];
        Operation.delete(todo.id);
        this.props.splice(this.state.focusedTodo, 1, todo);
    }
}