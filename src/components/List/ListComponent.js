import React from 'react';
import Todo from "../Todo/TodoComponent";

/**
 * props:
 *      state: todoの状態（破棄されていない・破棄されている）
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodo（Todo.id）
 */
export default class List extends React.Component {
    // TODO: フォーカスしているTodoを強調する
    render() {
        return <div data-key={this.props.dataKey} className={`${this.props.focused ? 'focused' : ''} todo-list`}>
            {this.props.list.map(todo => <Todo key={todo.id} name={todo.title} />)}
        </div>
    }
}