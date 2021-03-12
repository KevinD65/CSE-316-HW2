import React, { Component } from 'react'

class DeletionModal extends Component{
    constructor(props){
        super(props);
    }/*
    toggleShown = () => {
        if(this.state.shown){
            this.setState({
                shown: false
            })
        }
        else{
            this.setState({
                shown: true
            })
        }
    }

    handleConfirmClick = (event) => {
        this.toggleShown();
        this.props.confirmCallback();
    }

    handleCancelClick = (event) => {
        this.toggleShown(); //toggle to false
    }
*/
    render(){
        //console.log(this.props.showModal);
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

/**
 * /*
                    : <div className = "deleteModal" style = {{display: "none"}}>
                        <div className = "box">
                            <span className = "answerModal" onClick = {this.handleConfirmClick}>Confirm</span>
                            <span className = "answerModal" onClick = {this.handleCancelClick}>Cancel</span>
                        </div>
                    </div>*/
 