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
        this.addEventListener('gotoTop', () => this.gotoTop());
        this.addEventListener('gotoTop', () => this.gotoTop());
        this.addEventListener('gotoEnd', () => this.gotoEnd());
        this.addEventListener('selectTodo', () => this.select());
        this.addEventListener('focusNextTodo', () =>this.focusNext());
        this.addEventListener('focusPrevTodo', () => this.focusPrev());
        this.addEventListener('switchMode', () => this.switchMode());
        this.addEventListener('switchToNormalMode', () => this.switchToNormalMode());
        this.addEventListener('switchToInsertMode', () => this.switchToInsertMode());
    }

    addEventListener(eventName, action) {
        this.listener[eventName] = () => action();
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