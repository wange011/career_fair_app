import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin } from '../../redux/actions';
import profIcon from '../../res/images/baseline_account_circle_black_18dp.png';
import downArrow from '../../res/images/baseline_keyboard_arrow_down_black_18dp.png';
import './TaskBar.css';

function TaskBar(props) {

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img>
            {props.username.length > 0 ?
            
            <div className="profileWrapper">
                <div className="profIconWrapper"> <img src={profIcon} className="profIcon"></img> </div>
                <div className="usernameWrapper"> <p>{props.username}</p> </div>
                <div className="downArrowWrapper"> <img src={downArrow} className="downArrow"></img> </div>
            </div> : 
            
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