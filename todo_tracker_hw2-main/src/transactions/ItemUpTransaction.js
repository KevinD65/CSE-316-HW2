'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR MOVING A LIST ITEM UP
export class ItemUp_Transaction extends jsTPS_Transaction {
    constructor(itemID, upFunc, downFunc) {
        super();
        this.id = itemID;
        this.moveUp = upFunc;
        this.moveDown = downFunc;
    }

    doTransaction() {
        // moves an item up
        this.moveUp(this.id);
    }

    undoTransaction() {
        // moves the item back down
        this.moveDown(this.id);
    }
}