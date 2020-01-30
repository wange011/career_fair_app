import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin } from '../../redux/actions';
import './TaskBar.css';

function TaskBar(props) {

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img>
            {props.username.length > 0 ?
            <div className='usernameWrapper'><p>Welcome {props.username}</p></div> : 
            <button className="loginButton" onClick={() => props.toggleLogin()}>LOGIN</button>}

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLogin: () => {
            dispatch(toggleLogin())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);