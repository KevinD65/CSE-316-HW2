// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    handleAddItem = () => {
        this.props.addItemCallback();
    }

    handleDelete = () => {
        this.props.trashButtonCallback();
    }

    handleClose = () => {
        this.props.closeButtonCallback();
    }
    handleSelect = () => {
        return this.props.selected();
    }

    render() {
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        {this.handleSelect()
                            ? <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick = {this.handleAddItem}/>
                            : <AddBox id="add-item-button" className="list-item-control material-icons todo-button" style = {{color: "grey"}}/>
                        }   
                        {this.handleSelect()
                            ? <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick = {this.handleDelete}/>
                            : <Delete id="delete-list-button" className="list-item-control material-icons todo-button" style = {{color: "grey"}}/>
                        }
                        {this.handleSelect()
                            ? <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick = {this.handleClose}/>
                            : <Close id="close-list-button" className="list-item-control material-icons todo-button" style = {{color: "grey"}}/>
                        }  
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            EDC={this.props.editDescriptionCallback} //props from App.js
                            EDDC={this.props.editDueDateCallback}   //props from App.js
                            ESC={this.props.editStatusCallback}    //props from App.js
                            UI={this.props.upCallback} //props from App.js
                            DI={this.props.downCallback} //props from App.js
                            DELI={this.props.deleteItemCallback} //props from App.js
                            TOP={this.props.isTopCallback} //props from App.js
                            BOT={this.props.isBottomCallback} //props from App.js
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;