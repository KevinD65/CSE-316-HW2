// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import {jsTPS} from './common/jsTPS'

//IMPORT ALL TRANSACTION CLASSES
import {AddItem_Transaction} from './transactions/AddItemTransaction.js'
import {EditDescription_Transaction} from './transactions/DescriptionTransaction.js'
import {EditDate_Transaction} from './transactions/DateTransaction.js'
import {EditStatus_Transaction} from './transactions/StatusTransaction.js'
import { RemoveItem_Transaction } from './transactions/RemoveItemTransaction.js';
import { ItemUp_Transaction } from './transactions/ItemUpTransaction.js';
import { ItemDown_Transaction } from './transactions/ItemDownTransaction.js';


// THESE ARE OUR REACT COMPONENTS
import DeletionModal from './components/DeletionModal'
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

    var ctrlFunc = [false, false]; //initializes ctrlFunc to array with only false elements

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      deletionModal: false
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    if(this.state.currentList !== toDoList){ //if already selected list is clicked, tps doesn't reset
      this.tps.clearAllTransactions(); //otherwise clear the transaction stack
    }

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

  isSelectedList = (itemID) => {
    if(this.state.currentList.id == itemID){
      return true;
    }
    return false;
  }

  addNewList = () => {
    if(this.state.currentList == null){

    }

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
      due_date: "No Date",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("toDoLists", toDoListsString); //toDoLists
  }

  addItemTransaction = (itemID) => {
    let newTransaction = new AddItem_Transaction(itemID, this.addDefaultItem, this.removeItem);
    this.tps.addTransaction(newTransaction);
  }

  addDefaultItem = () => {
    let newItem = this.makeNewToDoListItem();
    let updatedItemList = this.state.currentList.items;
    updatedItemList.splice(this.state.currentList.items.length, 0, newItem); //insert new item at the end of the list
    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }
    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);
    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    
    this.afterToDoListsChangeComplete();
  }

  editDescriptionTransaction = (itemID, newVal, oldVal) => {
    let newTransaction = new EditDescription_Transaction(itemID, newVal, oldVal, this.editDescription);
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editDescription = (itemID, textToChangeTo) => {
    console.log(this.state.currentList.items[0]);
    let editedItem = {
      id: itemID,
      description: textToChangeTo,
      due_date: this.state.currentList.items[this.getIndexPosition(itemID)].due_date,
      status: this.state.currentList.items[this.getIndexPosition(itemID)].status
    }
    let updatedItemList = this.state.currentList.items.filter(updateItem => updateItem.id !== itemID); //filter out the item that needs to be updated
    updatedItemList.splice(this.getIndexPosition(itemID), 0, editedItem);
    
    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }

    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);

    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    
    this.afterToDoListsChangeComplete();
  }

  editDueDateTransaction = (itemID, newVal, oldVal) =>{
    let newTransaction = new EditDate_Transaction(itemID, newVal, oldVal, this.editDueDate); //change the due_date of the item
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editDueDate = (itemID, dateToChangeTo) => {
    let editedItem = {
      id: itemID,
      description: this.state.currentList.items[this.getIndexPosition(itemID)].description,
      due_date: dateToChangeTo,
      status: this.state.currentList.items[this.getIndexPosition(itemID)].status
    }
    let updatedItemList = this.state.currentList.items.filter(updateItem => updateItem.id !== itemID); //filter out the item that needs to be updated
    updatedItemList.splice(this.getIndexPosition(itemID), 0, editedItem);
    
    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }

    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);

    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    
    this.afterToDoListsChangeComplete();
  }

  editStatusTransaction = (itemID, newVal, oldVal) => {
    let newTransaction = new EditStatus_Transaction(itemID, newVal, oldVal, this.editStatus); //change the status of the item
    this.tps.addTransaction(newTransaction); //add the transaction to the transaction stack
  }

  editStatus = (itemID, newStatus) => {
    let editedItem = {
      id: itemID,
      description: this.state.currentList.items[this.getIndexPosition(itemID)].description,
      due_date: this.state.currentList.items[this.getIndexPosition(itemID)].due_date,
      status: newStatus
    }
    let updatedItemList = this.state.currentList.items.filter(updateItem => updateItem.id !== itemID); //filter out the item that needs to be updated
    updatedItemList.splice(this.getIndexPosition(itemID), 0, editedItem);
    
    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }

    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);

    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    
    this.afterToDoListsChangeComplete();
  }

  itemUpTransaction = (itemID) =>{
    let newTransaction = new ItemUp_Transaction(itemID, this.itemUp, this.itemDown);
    this.tps.addTransaction(newTransaction);
  }

  itemUp = (itemID) => {
    let updatedItemList = this.state.currentList.items.filter(updateItem => updateItem.id !== itemID); //filters out the item to move up
    updatedItemList.splice(this.getIndexPosition(itemID) - 1, 0, this.state.currentList.items[this.getIndexPosition(itemID)]);

    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }

    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);

    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })

    this.afterToDoListsChangeComplete();
  }

  itemDownTransaction = (itemID) => {
    let newTransaction = new ItemDown_Transaction(itemID, this.itemDown, this.itemUp);
    this.tps.addTransaction(newTransaction);
  }

  itemDown = (itemID) => {
    let updatedItemList = this.state.currentList.items.filter(updateItem => updateItem.id !== itemID); //filters out the item to move up
    updatedItemList.splice(this.getIndexPosition(itemID) + 1, 0, this.state.currentList.items[this.getIndexPosition(itemID)]);

    let editedList = {
      id: this.state.currentList.id,
      name: this.state.currentList.name,
      items: updatedItemList
    }

    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);

    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })

    this.afterToDoListsChangeComplete();
  }

  isTop = (itemID) => {
    if(this.getIndexPosition(itemID) == 0){
      return true;
    }
    return false;
  }

  isBottom = (itemID) => {
    if(this.getIndexPosition(itemID) == this.state.currentList.items.length - 1){
      return true;
    }
    return false;
  }

  removeItemTransaction = (itemID) => {
    let position = this.getIndexPosition(itemID);
    let item = this.state.currentList.items[position];
    let newTransaction = new RemoveItem_Transaction(itemID, item, position, this.removeItem, this.addItemBack);
    this.tps.addTransaction(newTransaction);
  }

  removeItem = (itemID) => {
    let editedList = this.state.currentList;
    editedList.items.splice(this.getIndexPosition(itemID), 1);
    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);
    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    this.afterToDoListsChangeComplete();
    return(this.getIndexPosition(itemID)); //returns the position of the item removed
  }

  addItemBack = (position, item) => {
    let editedList = this.state.currentList;
    editedList.items.splice(position, 0, item);
    let updateToDoLists = this.state.toDoLists.filter(updateList => updateList.id !== this.state.currentList.id) //filter out the list that needs to be updated
    updateToDoLists.splice(0, 0, editedList);
    this.setState({
      toDoLists: updateToDoLists,
      currentList: editedList
    })
    this.afterToDoListsChangeComplete();
  }

  getIndexPosition(itemID){
    for(let i = 0; i < this.state.currentList.items.length; i++){
      if(this.state.currentList.items[i].id === itemID)
        return i;
    }
  }

  toggleDeletionModal = () => {
    if(this.state.deletionModal == false){
      this.setState({
        deletionModal: true
      })
    }
    else{
      this.setState({
        deletionModal: false
      })
    }
  }

  deleteList = () => {
    this.tps.clearAllTransactions();
    let listID = this.state.currentList.id;
    let updateToDoLists = this.state.toDoLists.filter(removeList => removeList.id !== listID); //filter out the list to remove
    this.setState({
      toDoLists: updateToDoLists,
      currentList: {items: []},
      deletionModal: false
    })
  }
  
  closeList = () => {
    this.tps.clearAllTransactions();
    this.setState({
      currentList: {items: []}
    })
  }
  
  undo = () =>{
    if(this.tps.hasTransactionToUndo){
      this.tps.undoTransaction();
    }
  }

  redo = () =>{
    if(this.tps.hasTransactionToRedo){
      this.tps.doTransaction();
    }
  }

  hasUndo = () => {
    return this.tps.hasTransactionToUndo();
  }

  hasRedo = () => {
    return this.tps.hasTransactionToRedo();
  }

/*
  detectControl = (event) => {
    if(event.keyCode == 17){
      this.ctrlFunc.splice(0, 1, true);
    }
    else{
      this.ctrlFunc.splice(0, 1, false);
    }
  }

  controlZcontrolY = (event) => {
    if(this.ctrl && event.keyCode == 90){
      this.undo();
    }
    else if(this.ctrl && event.keyCode == 89){
      this.redo();
    }
  }
*/

  getSelected = () => {
    for(let i = 0; i < this.state.toDoLists.length; i++){
      if(this.state.currentList.id == this.state.toDoLists[i].id){
        return true;
      }
    }
    return false;
  }

  render() {
    console.log(this.state.currentList);
    let items = this.state.currentList.items;
    return (
      <div id="root" onKeyDown = {this.detectControl} onKeyUp = {this.detectControl}>
        {this.state.deletionModal == false
          ? <DeletionModal confirmCallback = {this.deleteList} toggleCallback = {this.toggleDeletionModal} showModal = {false}/>
          : <DeletionModal confirmCallback = {this.deleteList} toggleCallback = {this.toggleDeletionModal} showModal = {true}/>
        }
        <Navbar />
        <LeftSidebar
          selected={this.getSelected} 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          isSelectedListCallback={this.isSelectedList}
        />
        <Workspace 
          toDoListItems={items}
          undoCallback={this.undo} //callback for undo
          redoCallback={this.redo} //callback for redo
          addItemCallback={this.addItemTransaction} //callback for add item
          editDescriptionCallback={this.editDescriptionTransaction} //callback for editing items
          editDueDateCallback={this.editDueDateTransaction} //callback for editing items
          editStatusCallback={this.editStatusTransaction} //callback for editing items
          upCallback={this.itemUpTransaction} //callback for moving item up
          downCallback={this.itemDownTransaction}  //callback for moving item down
          isTopCallback={this.isTop}
          isBottomCallback={this.isBottom}
          deleteItemCallback={this.removeItemTransaction} //callback for deleting items
          trashButtonCallback={this.toggleDeletionModal} //callback for deleting a list
          closeButtonCallback={this.closeList}
          selected={this.getSelected}
          hasUndoCallback={this.hasUndo}
          hasRedoCallback={this.hasRedo}
        />
      </div>
    );
  }
}

export default App;