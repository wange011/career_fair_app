import React from 'react';
import { Link } from 'react-router-dom';
import './TaskBar.css';

function TaskBar() {

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img>
            <Link to="/login">
                <button className="loginButton">LOGIN</button>
            </Link>

        </div>
    );

}

export default TaskBar;