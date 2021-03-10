'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export class EditStatus_Transaction extends jsTPS_Transaction {
    constructor(itemID, newVal, oldVal, editSta) {
        super();
        this.id = itemID;
        this.newStatus = newVal;
        this.oldStatus = oldVal;
        this.editStatus = editSta;
    }

    doTransaction() {
        // edit the status (needs id to identify correct item to alter)
        this.newValue = this.editStatus(this.id, this.newStatus);
    }

    undoTransaction() {
        //set the status to its previous value (nees id to identify correct item to alter)
        this.editStatus(this.id, this.oldStatus);
    }
}