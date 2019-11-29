import React from 'react';
import "./style.scss";

export default class Todo extends React.Component {
    getClassName() {
        return 'todo' + (this.props.todo.checked ? ' checked' : '');
    }
    render() {
        return <div className={this.getClassName()}>
            <div className='title'>This title is {this.props.todo.title}.</div>
        </div >
    }
}