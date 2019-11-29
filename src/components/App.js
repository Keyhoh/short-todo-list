import React from 'react';
import List from "./List/ListComponent";
import "./style.scss";

/**
 * state:
 *      focusedList: フォーカスしているList（Listを特定できれば型は問わない）
 */
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedList: 'index_list',
            indexList: this.props.todoList.filter(todo => !todo.discarded),
            discardedList: this.props.todoList.filter(todo => todo.discarded)
        }
        window.addEventListener('focusNextList', () => this.focusDiscardedList());
        window.addEventListener('focusPrevList', () => this.focusIndexList());
    }

    focusIndexList() {
        this.setState({ focusedList: 'index_list' });
    }

    focusDiscardedList() {
        this.setState({ focusedList: 'discarded_list' });
    }

    render() {
        return <div onKeyDown={e => this.switchFocus(e)}>
            <List
                key='index_list'
                dataKey='index_list'
                focused={this.state.focusedList === 'index_list'}
                list={this.state.indexList}
            />
            <List
                key='discarded_list'
                dataKey='discarded_list'
                focused={this.state.focusedList === 'discarded_list'}
                list={this.state.discardedList}
            />
        </div>
    }
}