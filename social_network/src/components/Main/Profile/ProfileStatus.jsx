import React from "react";

export class ProfileStatus extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditeMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditeMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (event) => {
        this.setState({
            status: event.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({state: this.props.status})
        }
    }

    render(){
        return(
            <>
                {
                    this.state.editMode 
                    ? <div><input onChange={this.onStatusChange} 
                                  autoFocus={true} 
                                  onBlur={this.deactivateEditeMode} 
                                  value={this.state.status} />
                      </div> 
                    : <div><span onDoubleClick={this.activateEditeMode}>{this.props.status || "---"}</span></div>
                }
            </>
        )
    }
}