import React from 'react';
import Todo from "../Todo/TodoComponent";

export default class List extends React.Component {
    render() {
        return <div id="todo_list">
            {this.props.list.map(todo => <Todo name={todo}/>)}
        </div>
    }
}