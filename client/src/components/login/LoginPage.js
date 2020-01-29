import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin, login } from '../../redux/actions';
import delIcon from '../../res/images/baseline_clear_black_18dp.png';
import './LoginPage.css';

function LoginPage(props) {

    const handleLogin  = (e) => {
        
        e.preventDefault();

        const inputs = document.getElementsByClassName('LoginContainer')[0].getElementsByTagName('input');
        const username = inputs[0].value;
        const password = inputs[1].value;

        props.login(username, password)

    }

    return(
        <div className="LoginPage">
            
            <div className="LoginContainer">
                <form>
                    <h3>Log In</h3>
                    <p>Username</p>
                    <input></input>
                    <p>Password</p>
                    <input type="password"></input>
                    <button className="loginButton" onClick={(e) => handleLogin(e)}>LOGIN</button>
                </form>
            </div>

            <div className="RegistrationContainer">
                <form>
                    <h3>Sign Up</h3>
                    <p>Username</p>
                    <input></input>
                    <p>Password</p>
                    <input type="password"></input>
                    <p>Access Code (Optional)</p>
                    <input></input>
                </form>
            </div>
        
            <img src={delIcon} onClick={() => props.toggleLogin()}></img>

        </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLogin: () => {
            dispatch(toggleLogin())
        },
        login: (username, password) => {
            dispatch(login(username, password))
        }    
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);