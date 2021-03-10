// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

            descriptionClicked: false
        }

        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    clickDescription = (event) => {
        this.setState({
            descriptionClicked: true //set clickedDescription to true
        })
    }

    unClickDescription = () => {
        this.setState({
            descriptionClicked: false //reset clickedDescription
        })
    }

    handleEditDescription = (event) => {
        this.unClickDescription();
        let listItem = this.props.toDoListItem;
        //console.log(event.target.value);
        this.props.EDC(listItem.id, event.target.value, listItem.description)
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {this.state.descriptionClicked == false
                    ? <div className='item-col task-col' onClick = {this.clickDescription} onBlur = {this.unClickDescription}>{listItem.description}</div>
                    : <input type = 'text' autoFocus defaultValue = {listItem.description} onBlur = {this.handleEditDescription}/>//local event handler
                }
                <div className='item-col due-date-col'>{listItem.due_date}</div>
                <div className='item-col status-col' className={statusType}>{listItem.status}</div>
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' />
                    <KeyboardArrowDown className='list-item-control todo-button' />
                    <Close className='list-item-control todo-button' />
                    <div className='list-item-control'></div>
                    <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}
//ALL EVENT HANDLER FUNCTIONS ARE ARROW

export default ToDoItem;