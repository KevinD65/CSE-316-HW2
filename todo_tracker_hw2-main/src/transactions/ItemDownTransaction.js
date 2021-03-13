'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR MOVING A LIST ITEM DOWN
export class ItemDown_Transaction extends jsTPS_Transaction {
    constructor(itemID, downFunc, upFunc) {
        super();
        this.id = itemID;
        this.moveDown = downFunc;
        this.moveUp = upFunc;
    }

    doTransaction() {
        // moves an item down
        this.moveDown(this.id);
    }

    undoTransaction() {
        // moves the item back up
        this.moveUp(this.id);
    }
}