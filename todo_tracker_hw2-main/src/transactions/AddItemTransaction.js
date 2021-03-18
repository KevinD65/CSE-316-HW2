'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export class AddItem_Transaction extends jsTPS_Transaction {
    constructor(addFunc, removeFunc, decFunc) {
        super();
        this.AI = addFunc;
        this.RI = removeFunc;
        this.DEC = decFunc;
    }

    doTransaction() {
        // adds an item
        this.id = this.AI();
    }

    undoTransaction() {
        // removes the item added
        this.DEC();
        this.RI(this.id);
    }
}