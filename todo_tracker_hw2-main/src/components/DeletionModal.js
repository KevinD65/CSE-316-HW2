import React, { Component } from 'react'

class DeletionModal extends Component{
    constructor(props){
        super(props);
    }

    handleConfirmClick = (event) => {
        this.props.confirmCallback();
    }

    handleCancelClick = (event) => {
        this.props.toggleCallback();
    }

    render(){
        if(this.props.showModal){
            return(
                <div>
                    <div className = "deleteModal" style = {{display: "block"}}>
                        <div className = "box">Do you really want to delete this list?
                            <span className = "confirmModal" onClick = {this.handleConfirmClick}>Confirm</span>
                            <span className = "cancelModal" onClick = {this.handleCancelClick}>Cancel</span>
                        </div>
                    </div>      
                </div>
            );
        }
        else{
            return(
                <div className = "deleteModal" style = {{display: "none"}}>
                        <div className = "box">
                            <span className = "confirmModal" onClick = {this.handleConfirmClick}>Confirm</span>
                            <span className = "cancelModal" onClick = {this.handleCancelClick}>Cancel</span>
                    </div>
                </div>
            );
        }
    }
}
export default DeletionModal;
 