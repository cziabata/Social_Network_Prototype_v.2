import React, { useEffect, useState } from "react";

export const ProfileStatus = (props) => {
    let [editeMode, setEditeMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {setStatus(props.status)}, [props.status] )

    let activateEditeMode = () => {
        setEditeMode(true)
    }
    let deactivateEditeMode = () => {
        setEditeMode(false);
        props.updateStatus(status);
    }
    let onStatusChange = (event) => {
        setStatus(event.currentTarget.value)
    }
    return(
            <>
                {
                    editeMode ? <div><input onChange={onStatusChange} 
                                  autoFocus={true} 
                                  onBlur={deactivateEditeMode} 
                                  value={status} />
                      </div> 
                    : <div><span onDoubleClick={activateEditeMode}>{status || "---"}</span></div>
                }
            </>
    )
}