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
    }
    switchFocused() {
        this.setState({ focusedTodo: ++this.state.focusedTodo % this.props.list.length });
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