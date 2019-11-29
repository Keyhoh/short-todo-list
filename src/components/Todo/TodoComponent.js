import React from 'react';
import "./style.scss";

export default class Todo extends React.Component {
    getClassName() {
        return 'todo'
            + (this.props.todo.checked ? ' checked' : '')
            + (this.props.focused ? ' focused' : '');
    }
    render() {
        return <div className={this.getClassName()}>
            This title is {this.props.todo.title}.
        </div >
    }
}