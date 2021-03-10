'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export class EditDate_Transaction extends jsTPS_Transaction {
    constructor(itemID, newDate, oldDate, editDat) {
        super();
        this.id = itemID;
        this.newValue = newDate;
        this.oldValue = oldDate;
        this.editDate = editDat;
    }

    doTransaction() {
        // edit the date (needs id to identify correct item to alter)
        this.newValue = this.editDate(this.id, this.newValue);
    }

    undoTransaction() {
        //set the date to its previous value (nees id to identify correct item to alter)
        this.editDate(this.id, this.oldValue);
    }
}