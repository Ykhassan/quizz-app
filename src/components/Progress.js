import React from 'react';
import './Progress.css'

function Progress({width}){
    return (
        <div className="status-bar-container">
            <div className="status-bar" style={{width}} ></div>
        </div>
    )
}

export default Progress;