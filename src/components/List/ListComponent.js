import React from 'react';
import Todo from "../Todo/TodoComponent";
import "./style.scss";

/**
 * props:
 *      state: todoの状態（破棄されていない・破棄されている）
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodo（Todo.id）
 */
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { focusedTodo: 0 }
        window.addEventListener('keydown', e => this.switchFocused(e));
    }
    switchFocused(e) {
        if (!this.props.focused) return;
        const focused = this.state.focusedTodo;
        const len = this.props.list.length - 1;

        if (e.keyCode === 74) {
            this.setState({ focusedTodo: Math.min(focused + 1, len) });
        } else if (e.keyCode === 75) {
            this.setState({ focusedTodo: Math.max(focused - 1, 0) });
        }
    }
    getTodoArray() {
        return this.props.list.map(
            (todo, idx) => <Todo
                key={todo.id}
                todo={todo}
                focused={this.state.focusedTodo === idx}
            />
        );
    }
    // TODO: フォーカスしているTodoを強調する
    render() {
        return <div data-key={this.props.dataKey} className={`${this.props.focused ? 'focused' : ''} todo-list`}>
            {this.getTodoArray()}
        </div>
    }
}