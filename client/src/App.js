import React, { Component } from 'react';
import TaskBar from './components/login/TaskBar';
import MainPage from './components/MainPage';
import LoginPage from './components/login/LoginPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {

  // If user is loggedIn and isAdmin, return AdminPage

  render(){
    
    return (
      <div className="App">
        <Router>
        
          <Switch>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/">
              <TaskBar  />
              <div className="container">
                <div className="row">
                  <MainPage/>
                </div>  
              </div>
            </Route>

          </Switch>

        </Router>

      </div>
    );
  
  }  

}

export default App;
