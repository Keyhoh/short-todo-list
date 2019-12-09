import ListComponent from "./ListComponent";
import Operation from "../../operation/Operation";

export default class IndexList extends ListComponent {
    constructor(props) {
        super(props);
        this.listener['createTodo'] = () => this.create();
    }

    create() {
        if (!this.props.focused) return;
        const todo = Operation.create();
        this.props.splice(this.props.list.length, 0, todo);
    }
}