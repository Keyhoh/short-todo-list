import React from 'react';
import Todo from "../Todo/TodoComponent";
import "./style.scss";
import MODE from '../../events/MODE';
import CLASS_NAME from '../CLASS_NAME';

/**
 * props:
 *      list: todoのリスト
 * state:
 *      focusedTodo: フォーカスしているTodoのindex
 */
export default class List extends React.Component {
    /** @type {HTMLElement} */
    element = null;

    constructor(props) {
        super(props);
        this.state = { focusedTodo: 0, enteringTodo: null, selectedTodo: null };
    }

    componentDidMount() {
        this.element.addEventListener('gotoTop', () => this.goTop());
        this.element.addEventListener('gotoEnd', () => this.goBottom());
        this.element.addEventListener('selectTodo', () => this.select());
        this.element.addEventListener('focusNextTodo', () => this.focusNext());
        this.element.addEventListener('focusPrevTodo', () => this.focusPrev());
        this.element.addEventListener('switchMode', () => this.switchMode());
        this.element.addEventListener('switchToNormalMode', () => this.switchToNormalMode());
        this.element.addEventListener('switchToInsertMode', () => this.switchToInsertMode());
    }

    componentWillUnmount() {
        this.element.removeEventListener('gotoTop', () => this.goTop());
        this.element.removeEventListener('gotoEnd', () => this.goBottom());
        this.element.removeEventListener('selectTodo', () => this.select());
        this.element.removeEventListener('focusNextTodo', () => this.focusNext());
        this.element.removeEventListener('focusPrevTodo', () => this.focusPrev());
        this.element.removeEventListener('switchMode', () => this.switchMode());
        this.element.removeEventListener('switchToNormalMode', () => this.switchToNormalMode());
        this.element.removeEventListener('switchToInsertMode', () => this.switchToInsertMode());
    }

    goTop() {
        this.setState({ focusedTodo: 0 });
    }

    goBottom() {
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