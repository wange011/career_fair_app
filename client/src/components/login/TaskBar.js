import React from 'react';

function TaskBar() {

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img> 
            <button className="loginButton">LOGIN</button>
        
        </div>
    );

}

export default TaskBar;