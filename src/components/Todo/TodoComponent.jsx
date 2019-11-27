import React from 'react';

export default class Todo extends React.Component{
    render(){
        return <div>This is {this.props.name}-todo.</div>
    }
}