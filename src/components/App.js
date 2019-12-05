import _ from 'lodash';
import React from 'react';
import List from "./List/ListComponent";
import "./style.scss";
import index from 'uuid-random';

/**
 * state:
 *      focusedList: フォーカスしているList（Listを特定できれば型は問わない）
 */
export default class App extends React.Component {
    /** @type {HTMLElement} */
    element = null;

    constructor(props) {
        super(props);
        this.state = {
            focusedList: 'index_list',
            /** @type {Array} */
            indexList: this.props.todoList.filter(todo => !todo.discarded),
            /** @type {Array} */
            discardedList: this.props.todoList.filter(todo => todo.discarded)
        }
    }

    componentDidMount() {
        this.element.addEventListener('focusNextList', () => this.focusDiscardedList());
        this.element.addEventListener('focusPrevList', () => this.focusIndexList());
    }

    componentWillUnmount() {
        this.element.removeEventListener('focusNextList', () => this.focusDiscardedList());
        this.element.removeEventListener('focusPrevList', () => this.focusIndexList());
    }

    focusIndexList() {
        this.setState({ focusedList: 'index_list' });
    }

    focusDiscardedList() {
        this.setState({ focusedList: 'discarded_list' });
    }

    didDiscard(todoId) {
        let indexList = this.state.indexList;
        const targetTodo = indexList.find(todo => todo.id === todoId);
        if (!_.isUndefined(targetTodo)) {
            let discardedList = this.state.discardedList;
            discardedList.push(targetTodo);
            indexList.splice(indexList.indexOf(targetTodo), 1);
            this.setState({ indexList: indexList, discardedList: discardedList });
        }
    }

    didPullUp(todoId) {
        let discardedList = this.state.discardedList;
        const targetTodo = discardedList.find(todo => todo.id === todoId);
        if (!_.isUndefined(targetTodo)) {
            let indexList = this.state.indexList;
            indexList.push(targetTodo);
            discardedList.splice(discardedList.indexOf(targetTodo), 1);
            this.setState({ indexList: indexList, discardedList: discardedList });
        }
    }

    render() {
        return <div ref={ele => this.element = ele} id='app'>
            <List
                key='index_list'
                dataKey='index_list'
                focused={this.state.focusedList === 'index_list'}
                list={this.state.indexList}
                didDiscard={todoId => this.didDiscard(todoId)}
                didPullUp={todoId => this.didPullUp(todoId)}
            />
            <List
                key='discarded_list'
                dataKey='discarded_list'
                focused={this.state.focusedList === 'discarded_list'}
                list={this.state.discardedList}
                didDiscard={todoId => this.didDiscard(todoId)}
                didPullUp={todoId => this.didPullUp(todoId)}
            />
        </div>
    }
}