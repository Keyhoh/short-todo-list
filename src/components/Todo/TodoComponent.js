import React from 'react';
import "./style.scss";

export default class Todo extends React.Component {
    getClassName() {
        return 'todo'
            + (this.props.todo.checked ? ' checked' : '')
            + (this.props.focused ? ' focused' : '')
            + (this.props.selected ? ' selected':'');
    }
    render() {
        return <div className={this.getClassName()}>
            <div>{this.props.todo.title}</div>
            <input type="text" name="title" id={this.props.todo.id} />
        </div >
    }
}