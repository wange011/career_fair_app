import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin } from '../../redux/actions';
import './TaskBar.css';

function TaskBar(props) {

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img>
            <button className="loginButton" onClick={() => props.toggleLogin()}>LOGIN</button>

        </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLogin: () => {
            dispatch(toggleLogin())
        }
    }
}

export default connect(null, mapDispatchToProps)(TaskBar);