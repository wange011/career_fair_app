import React, { Component } from 'react';
import TaskBar from './components/login/TaskBar';
import MainPage from './components/MainPage';
import LoginPage from './components/login/LoginPage';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {

  // If user is loggedIn and isAdmin, return AdminPage

  render(){
    
    return (
      <div className="App">
        <Router>

          <TaskBar/>
          <div className="container">
            <div className="row">
              <MainPage/>
            </div>  
          </div>

          {this.props.showLogin ?
            <LoginPage/> : null
          }

        </Router>
      </div>
    );
  
  }  

}

const mapStateToProps = (state) => {
  return {
      showLogin: state.showLogin
  }
}

export default connect(mapStateToProps)(App);

