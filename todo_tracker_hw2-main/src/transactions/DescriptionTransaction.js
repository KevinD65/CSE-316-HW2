'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import {jsTPS_Transaction} from '../common/jsTPS'

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export class EditDescription_Transaction extends jsTPS_Transaction {
    constructor(itemID, newText, oldText, editDes) {
        super();
        this.id = itemID;
        this.newValue = newText;
        this.oldValue = oldText;
        this.editDescription = editDes;
    }

    doTransaction() {
        // edit the text (needs id to identify correct item to alter)
        this.editDescription(this.id, this.newValue);
    }

    undoTransaction() {
        //set the text to its previous value (needs id to identify correct item to alter)
        this.editDescription(this.id, this.oldValue);
    }
}