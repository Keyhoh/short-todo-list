import _ from 'lodash';
import React from 'react';
import List from "./List/ListComponent";
import "./style.scss";
import CLASS_NAME from './CLASS_NAME';

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
        if (!_.isNil(targetTodo)) {
            const targetIdx = indexList.indexOf(targetTodo);
            let discardedList = this.state.discardedList;
            discardedList.push(indexList[targetIdx]);
            indexList.splice(targetIdx, 1);
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
            />
            <List
                key='discarded_list'
                dataKey='discarded_list'
                focused={this.state.focusedList === 'discarded_list'}
                list={this.state.discardedList}
                didDiscard={todoId => this.didDiscard(todoId)}
            />
        </div>
    }
}