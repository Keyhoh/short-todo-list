import React from 'react';
import Todo from "../Todo/TodoComponent";
import "./style.scss";

/**
 * props:
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodoのindex
 */
export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { focusedTodo: 0, selectedTodo: null };
        window.addEventListener('keydown', e => this.handleKeydown(e));
    }

    /**
     * 保持しているtodoに対するキーボードショートカット操作
     * 
     * @param {KeyboardEvent} e 
     */
    handleKeydown(e) {
        // 表示していないリストでは操作しない
        if (!this.props.focused) return;
        switch (e.keyCode) {
            case 77:
                this.select();
                break;
            case 74:
            case 75:
                this.switchFocused(e.keyCode);
                break;
            default:
                break;
        }
    }

    /**
     * フォーカスしているtodoをハイライトする
     * @param {number} keyCode 
     */
    switchFocused(keyCode) {
        const focused = this.state.focusedTodo;
        const len = this.props.list.length - 1;

        if (keyCode === 74) {
            this.setState({ focusedTodo: Math.min(focused + 1, len) });
        } else if (keyCode === 75) {
            this.setState({ focusedTodo: Math.max(focused - 1, 0) });
        }
    }

    select() {
        const curr = this.state.selectedTodo;
        const next = this.props.list[this.state.focusedTodo].id;
        if (curr === next) {
            this.setState({ selectedTodo: null });
        } else {
            this.setState({ selectedTodo: next });
        }
    }

    getTodoArray() {
        return this.props.list.map(
            (todo, idx) => <Todo
                key={todo.id}
                todo={todo}
                focused={this.state.focusedTodo === idx}
                selected={this.state.selectedTodo === todo.id}
            />
        );
    }

    render() {
        return <div data-key={this.props.dataKey} className={`${this.props.focused ? 'focused' : ''} todo-list`}>
            {this.getTodoArray()}
        </div>
    }
}