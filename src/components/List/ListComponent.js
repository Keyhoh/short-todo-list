import React from 'react';
import Todo from "../Todo/TodoComponent";
import "./style.scss";
import CLASS_NAME from '../CLASS_NAME';
import Operation from '../../operation/Operation';

/**
 * props:
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodoのindex
 */
export default class List extends React.Component {
    /** @type {HTMLElement} */
    element = null;
    /** @type {Object} */
    listener = {};

    constructor(props) {
        super(props);
        this.state = { focusedTodo: 0, enteringTodo: null, selectedTodo: null };
        this.listener = {
            'createTodo': () => this.create(),
            'deleteTodo': () => this.delete(),
            'gotoTop': () => this.gotoTop(),
            'gotoEnd': () => this.gotoEnd(),
            'selectTodo': () => this.select(),
            'focusNextTodo': () => this.focusNext(),
            'focusPrevTodo': () => this.focusPrev(),
            'switchMode': () => this.switchMode(),
            'switchToNormalMode': () => this.switchToNormalMode(),
            'switchToInsertMode': () => this.switchToInsertMode()
        };
    }

    componentDidMount() {
        Object.entries(this.listener).forEach(([event, operation]) => {
            this.element.addEventListener(event, () => operation());
        });
    }

    componentWillUnmount() {
        Object.entries(this.listener).forEach(([event, operation]) => {
            this.element.removeEventListener(event, () => operation());
        });
    }

    gotoTop() {
        this.setState({ focusedTodo: 0 });
    }

    gotoEnd() {
        const len = this.props.list.length - 1;
        this.setState({ focusedTodo: len });
    }

    focusNext() {
        const focused = this.state.focusedTodo;
        const len = this.props.list.length - 1;
        this.setState({ focusedTodo: Math.min(focused + 1, len) });
    }

    focusPrev() {
        const focused = this.state.focusedTodo;
        this.setState({ focusedTodo: Math.max(focused - 1, 0) });
    }

    select() {
        if (this.props.dataKey !== 'index_list') return;
        const curr = this.state.selectedTodo;
        const next = this.props.list[this.state.focusedTodo].id;
        if (curr === next) {
            this.setState({ selectedTodo: null });
        } else {
            this.setState({ selectedTodo: next });
        }
    }

    switchToNormalMode() {
        this.setState({ enteringTodo: null });
    }

    create() {
        if (!this.props.focused) return;
        const todo = Operation.create();
        this.props.splice(this.props.list.length, 0, todo);
    }

    delete() {
        if (!this.props.focused) return;
        const todo = this.props.list[this.state.focusedTodo];
        Operation.delete(todo.id);
        this.props.splice(this.state.focusedTodo, 1, todo);
    }

    switchToInsertMode() {
        this.setState({ enteringTodo: this.state.focusedTodo });
    }

    getTodoArray() {
        return this.props.list.map(
            (todo, idx) => <Todo
                key={todo.id}
                todo={todo}
                focused={this.state.focusedTodo === idx}
                selected={this.state.selectedTodo === todo.id}
                entering={this.props.focused && this.state.enteringTodo === idx}
                didDiscard={todoId => this.props.didDiscard(todoId)}
                didPullUp={todoId => this.props.didPullUp(todoId)}
            />
        );
    }

    render() {
        return <div
            ref={ele => this.element = ele}
            data-key={this.props.dataKey}
            className={(this.props.focused ? CLASS_NAME.FOCUSED : '') + ' ' + CLASS_NAME.TODO_LIST}
        >
            {this.getTodoArray()}
        </div>
    }
}