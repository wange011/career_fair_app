import React from 'react';
import { connect } from 'react-redux';
import { toggleLogin, logout } from '../../redux/actions';
import profIcon from '../../res/images/baseline_account_circle_black_18dp.png';
import downArrow from '../../res/images/baseline_keyboard_arrow_down_black_18dp.png';
import './TaskBar.css';

function TaskBar(props) {

    const handleDropdown = () => {
        document.getElementById("myDropdown").classList.add("show");
        console.log("clicked")
    }

    const handleLogout = () => {
        props.logout()
    }

    return(
        <div className="TaskBar">
            
            <img src={require('../../res/images/logo.png')} className="appIcon"></img>
            {props.username.length > 0 ?
            
            <div className="profileWrapper dropbtn" onClick={() => handleDropdown()}>
                <div className="dropdown">
                        <div id="myDropdown" class="dropdown-content">
                            <span onClick={() => handleLogout()}>Log Out</span>
                        </div>
                </div>

                <div className="profIconWrapper dropbtn" onClick={() => handleDropdown()}> <img src={profIcon} className="profIcon dropbtn"></img> </div>
                <div className="usernameWrapper dropbtn" onClick={() => handleDropdown()}> <p className="dropbtn">{props.username}</p> </div>
                <div className="downArrowWrapper dropbtn" onClick={() => handleDropdown()}> <img src={downArrow} className="downArrow dropbtn"></img> </div>
                
                <script>
                    {// Close the dropdown if the user clicks outside of it
                    window.onclick = function(event) {
                        if (!event.target.matches('.dropbtn')) {
                            console.log("remove")
                            console.log(event.target)
                            var dropdowns = document.getElementsByClassName("dropdown-content");
                            var i;
                            for (i = 0; i < dropdowns.length; i++) {
                                var openDropdown = dropdowns[i];
                                if (openDropdown.classList.contains('show')) {
                                    openDropdown.classList.remove('show');
                                }
                            }
                        }
                    }}
                </script>
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
        },
        logout: () => {
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);