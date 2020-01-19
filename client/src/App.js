import React, { Component } from 'react';
import './App.css';
import TaskBar from './components/login/TaskBar';
import FavoritesSidebar from './components/favorite/FavoritesSidebar';
import MainPage from './components/MainPage';

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
            <FavoritesSidebar/>
            <MainPage/>
          </div>  
          
        </div>
        

      </div>
    );
  
  }  

}

export default App;
