import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin, login } from '../../redux/actions';
import delIcon from '../../res/images/baseline_clear_black_18dp.png';
import './LoginPage.css';

function LoginPage(props) {

    const handleClickOut = (e) => {
        if (e.target.className === "LoginPageContainer") {
            props.toggleLogin();
        }
    }

    const handleLogin  = (e) => {
        
        e.preventDefault();

        const inputs = document.getElementsByClassName('LoginContainer')[0].getElementsByTagName('input');
        
        const user = {
            username: inputs[0].value,
            password: inputs[1].value
        }    

        // Consider using redux-thunk
        fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then( (response) => {
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Username or Password is incorrect");
            }

        }).then( (user) => {

            props.login(user.favorites, user.username, user.id, user.userType);

        }).catch( (error) => {

            props.login();
        
        });

    }

    return(
        <div className="LoginPageContainer" onClick={(e) => handleClickOut(e)}>
            
            <div className="LoginPage">

                <div className="LoginContainer">
                    <form>
                        <h3>Log In</h3>
                        <p>Username</p>
                        <input></input>
                        <p>Password</p>
                        <input type="password"></input>
                        {props.incorrectLogin ? 
                        <p className="incorrectLoginMessage">No such account exists</p> : null}
                        <button onClick={(e) => handleLogin(e)}>LOG IN</button>
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
                        <button onClick={(e) => handleLogin(e)}>SIGN UP</button>
                    </form>
                </div>
            
                <img src={delIcon} onClick={() => props.toggleLogin()}></img>

            </div>

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        incorrectLogin: state.incorrectLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLogin: () => {
            dispatch(toggleLogin())
        },
        login: (favorites, userID, userType) => {
            dispatch(login(favorites, userID, userType))
        }    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);