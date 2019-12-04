import React from 'react';
import Todo from "../Todo/TodoComponent";
import "./style.scss";
import MODE from '../../events/MODE';

/**
 * props:
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodoのindex
 */
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { focusedTodo: 0, enteringTodo: null, selectedTodo: null };
        window.addEventListener('gotoTop', () => this.goTop());
        window.addEventListener('gotoEnd', () => this.goBottom());
        window.addEventListener('selectTodo', () => this.select());
        window.addEventListener('focusNextTodo', () => this.focusNext());
        window.addEventListener('focusPrevTodo', () => this.focusPrev());
        window.addEventListener('switchMode', () => this.switchMode());
    }

    goTop() {
        if (!this.props.focused) return;
        this.setState({ focusedTodo: 0 });
    }

    goBottom() {
        if (!this.props.focused) return;
        const len = this.props.list.length - 1;
        this.setState({ focusedTodo: len });
    }

    focusNext() {
        if (!this.props.focused) return;
        const focused = this.state.focusedTodo;
        const len = this.props.list.length - 1;
        this.setState({ focusedTodo: Math.min(focused + 1, len) });
    }

    focusPrev() {
        if (!this.props.focused) return;
        const focused = this.state.focusedTodo;
        this.setState({ focusedTodo: Math.max(focused - 1, 0) });
    }

    select() {
        if (!this.props.focused) return;
        const curr = this.state.selectedTodo;
        const next = this.props.list[this.state.focusedTodo].id;
        if (curr === next) {
            this.setState({ selectedTodo: null });
        } else {
            this.setState({ selectedTodo: next });
        }
    }

    switchMode() {
        if (this.props.focused && App.mode === MODE.INSERT) {
            this.setState({ enteringTodo: this.state.focusedTodo });
        } else {
            this.setState({ enteringTodo: null });
        }
    }

    getTodoArray() {
        return this.props.list.map(
            (todo, idx) => <Todo
                key={todo.id}
                todo={todo}
                focused={this.state.focusedTodo === idx}
                selected={this.state.selectedTodo === todo.id}
                entering={this.props.focused && this.state.enteringTodo === idx} />
        );
    }

    render() {
        return <div data-key={this.props.dataKey} className={`${this.props.focused ? 'focused' : ''} todo-list`}>
            {this.getTodoArray()}
        </div>
    }
}