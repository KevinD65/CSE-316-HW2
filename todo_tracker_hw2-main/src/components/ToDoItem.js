// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionClicked: false,
            dateClicked: false,
            statusClicked: false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    clickDescription = () => {
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
        if(this.props.toDoListItem.description !== event.target.value){
            let listItem = this.props.toDoListItem;
            this.props.EDC(listItem.id, event.target.value, listItem.description)
        }
    }

    clickDate = () =>{
        this.setState({
            dateClicked: true //set clickedDescription to true
        })
    }

    unClickDate = () => {
        this.setState({
            dateClicked: false //reset dateClicked
        })
    }

    handleEditDate = (event) => {
        this.unClickDate();
        if(this.props.toDoListItem.due_date !== event.target.value){
            let listItem = this.props.toDoListItem;
            this.props.EDDC(listItem.id, event.target.value, listItem.due_date);
        }
    }

    clickStatus = () => {
        this.setState({
            statusClicked: true //set statusClicked to true
        })
    }

    unClickStatus = () => {
        this.setState({
            statusClicked: false //reset statusClicked
        })
    }

    handleEditStatus = (event) => {
        this.unClickStatus();
        if(this.props.toDoListItem.status !== event.target.value){
            let listItem = this.props.toDoListItem;
            this.props.ESC(listItem.id, event.target.value, listItem.status);
        }
    }

    handleUp = () => {
        this.props.UI(this.props.toDoListItem.id);
    }

    handleDown = () => {
        this.props.DI(this.props.toDoListItem.id);
    }

    handleDeleteItem = () => {
        this.props.DELI(this.props.toDoListItem.id);
    }

    handleIsTop = () => {
        let listItem = this.props.toDoListItem;
        return this.props.TOP(listItem.id);
    }

    handleIsBottom = () => {
        let listItem = this.props.toDoListItem;
        return this.props.BOT(listItem.id);
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
                {this.state.descriptionClicked === false
                    ? <div className='item-col task-col' onClick = {this.clickDescription}>{listItem.description}</div>//local event handler
                    : <input type = 'text' autoFocus defaultValue = {listItem.description} onBlur = {this.handleEditDescription}/>//local event handler
                }
                {this.state.dateClicked === false
                    ? <div className='item-col due-date-col' onClick = {this.clickDate}>{listItem.due_date}</div>//local event handler
                    : <input type = 'date' autoFocus defaultValue = {listItem.due_date} onBlur = {this.unClickDate} onChange = {this.handleEditDate}/>//local event handler
                }
                {this.state.statusClicked === false
                    ? <div className='item-col status-col' className={statusType} onClick = {this.clickStatus}>{listItem.status}</div>//local event handler
                    : <select autoFocus defaultValue = {listItem.status} onBlur = {this.unClickStatus} onChange = {this.handleEditStatus}>
                        <option value = "complete">complete</option>
                        <option value = "incomplete">incomplete</option>
                      </select>
                }
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    {this.handleIsTop() === false
                        ? <KeyboardArrowUp className='list-item-control todo-button' onClick = {this.handleUp}/>
                        : <KeyboardArrowUp className='list-item-control todo-button' style = {{color: "grey"}}/>
                    }
                    {this.handleIsBottom() === false
                        ? <KeyboardArrowDown className='list-item-control todo-button' onClick = {this.handleDown}/>
                        : <KeyboardArrowDown className='list-item-control todo-button' style = {{color: "grey"}}/>
                    }
                    <Close className='list-item-control todo-button' onClick = {this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
                    <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}
//ALL EVENT HANDLER FUNCTIONS ARE ARROW

export default ToDoItem;