// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doubleClicked: false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    doubleClick = () => {
        this.setState({
            doubleClicked: true
        })
    }

    unDoubleClick = () => {
        this.setState({
            doubleClicked: false
        })
    }

    isDoubleClicked = () => {
        return this.state.doubleClicked;
    }

    handleIsSelectedList = () => {
        return this.props.SLC(this.props.toDoList.id);
    }

    handleListNameChange = (event) => {
        this.unDoubleClick();
        if(this.props.toDoList.name !== event.target.value){
            this.props.HLNC(this.props.toDoList.id, event.target.value);
        }
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        let styleColor = this.handleIsSelectedList() ? "highlighted" : "";
        return (
            <div>
            {this.isDoubleClicked() === false
                ? <div className={'todo-list-button ' + styleColor} onClick={this.handleLoadList} onDoubleClick={this.doubleClick}>{this.props.toDoList.name}<br /></div>
                : <input type = 'text' autoFocus defaultValue = {this.props.toDoList.name} onBlur = {this.handleListNameChange}/>
            }
            </div>
        )
    }
}

export default ListLink;