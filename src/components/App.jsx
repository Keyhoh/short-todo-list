import React from 'react';
import List from "./List/ListComponent";

export default class App extends React.Component{
    render(){
        return <List list={['A', 'B', 'C']}/>;
    }
}