// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import {jsTPS} from './common/jsTPS'

//IMPORT ALL TRANSACTION CLASSES
import {EditDescription_Transaction} from './transactions/DescriptionTransaction.js'
import {EditDate_Transaction} from './transactions/DateTransaction.js'
import {EditStatus_Transaction} from './transactions/StatusTransaction.js'


// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString); //toDoLists
  }

  editDescriptionTransaction = (itemID, newVal, oldVal) => {
    let newTransaction = new EditDescription_Transaction(itemID, newVal, oldVal, this.editDescription);
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editDescription = (itemID, textToChangeTo) => {
    this.state.currentList.items[this.getIndexPosition(itemID)].description = textToChangeTo; //change the description of the item
    this.afterToDoListsChangeComplete();
  }

  editDueDateTransaction = (itemID, newVal, oldVal) =>{
    let newTransaction = new EditDate_Transaction(itemID, newVal, oldVal, this.editDueDate); //change the due_date of the item
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editDueDate = (itemID, dateToChangeTo) => {
    this.state.currentList.items[this.getIndexPosition(itemID)].due_date = dateToChangeTo; //change the due_date of the item
    this.afterToDoListsChangeComplete();
  }

  editStatusTransaction = (itemID, newVal, oldVal) => {
    let newTransaction = new EditStatus_Transaction(itemID, newVal, oldVal, this.editStatus); //change the status of the item
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editStatus = (itemID, newStatus) => {
    this.state.currentList.items[this.getIndexPosition(itemID)].status = newStatus; //change the status of the item
    this.afterToDoListsChangeComplete();
  }

  getIndexPosition(itemID){
    for(let i = 0; i < this.state.currentList.items.length; i++){
      if(this.state.currentList.items[i].id == itemID)
        return i;
    }
  }


  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
        />
        <Workspace 
          toDoListItems={items} 
          editDescriptionCallback={this.editDescriptionTransaction} //callback for editing items
          editDueDateCallback={this.editDueDateTransaction} //callback for editing items
          editStatusCallback={this.editStatusTransaction} //callback for editing items
        />
      </div>
    );
  }
}

export default App;