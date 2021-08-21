import React from "react";

export class ProfileStatus extends React.Component {
    
    state = {
        editMode: false
    }
    activateEditeMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditeMode = () => {
        this.setState({
            editMode: false
        })
    }

    render(){
        return(
            <>
                {
                    this.state.editMode 
                    ? <div><input autoFocus={true} onBlur={this.deactivateEditeMode.bind(this)} value={this.props.status} /></div> 
                    : <div><span onDoubleClick={this.activateEditeMode.bind(this)}>{this.props.status}</span></div>
                }
            </>
        )
    }
}