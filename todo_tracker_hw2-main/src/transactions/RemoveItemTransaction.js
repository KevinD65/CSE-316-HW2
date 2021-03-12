'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR REMOVING AN ITEM FROM A TODO LIST
export class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(itemID, item, pos, removeFunc, addFunc) {
        super();
        this.id = itemID;
        this.item = item;
        this.position = pos;
        this.RI = removeFunc;
        this.AI = addFunc;
    }

    doTransaction() {
        // removes an item
        this.RI(this.id);
    }

    undoTransaction() {
        // adds the item back
        this.AI(this.position, this.item);
    }
    
}