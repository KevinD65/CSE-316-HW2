'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export class AddItem_Transaction extends jsTPS_Transaction {
    constructor(itemID, addFunc, removeFunc) {
        super();
        this.id = itemID;
        this.AI = addFunc;
        this.RI = removeFunc;
    }

    doTransaction() {
        // adds an item
        this.AI();
    }

    undoTransaction() {
        // removes the item added
        this.RI(this.id);
    }
}