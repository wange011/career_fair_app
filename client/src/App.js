import React, { Component } from 'react';
import TaskBar from './components/login/TaskBar';
import FavoritesSidebar from './components/favorite/FavoritesSidebar';
import MainPage from './components/MainPage';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        favorites: []
    };
  }

  handleView = (company) => {

  }

  render(){
    
    return (
      <div className="App">
        
        <TaskBar onClick={this.handleTaskbarClick} />

        <div className="container">
          <div className="row">
            <Router>
              <FavoritesSidebar/>
              <MainPage/>
            </Router>
          </div>  
          
        </div>
        

      </div>
    );
  
  }  

}

export default App;
