import React, { Component } from 'react';
import TaskBar from './components/login/TaskBar';
import MainPage from './components/MainPage';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="App">

        <TaskBar onClick={this.handleTaskbarClick} />

        <div className="container">
          <div className="row">
            <Router>
              <MainPage />
            </Router>
          </div>

        </div>


      </div>
    );

  }

}

export default App
