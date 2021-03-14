// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleIsSelectedList = () => {
        return this.props.SLC(this.props.toDoList.id);
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div>
            {this.handleIsSelectedList()
                ? <div className='todo-list-button' onClick={this.handleLoadList} style = {{background: "rgb(255,200,25)"}}>{this.props.toDoList.name}<br /></div>
                : <div className='todo-list-button' onClick={this.handleLoadList}>{this.props.toDoList.name}<br /></div>
            }
            </div>
        )
    }
}

export default ListLink;