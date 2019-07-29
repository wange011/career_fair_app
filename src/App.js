import React, { Component } from 'react';
import './App.css';
import TaskBar from './components/TaskBar';
import FavoritesSidebar from './components/FavoritesSidebar';
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

  handleFavorite = (company) => {
    
    var newFavorites = this.state.favorites;
    newFavorites.push(company);
    console.log(newFavorites);
    
    this.setState({
      favorites: newFavorites
    });

  }

  handleUnfavorite = (company) => {
    var newFavorites = this.state.favorites;
  
    newFavorites = newFavorites.filter((favCompany) => {
      return !(favCompany.name === company.name)
    });
    
    this.setState({
      favorites: newFavorites
    });

  }

  render(){
    
    return (
      <div className="App">
        
        <TaskBar onClick={this.handleTaskbarClick} />

        <div className="container">
          <div className="row">
            <FavoritesSidebar favorites={this.state.favorites} onUnfavorite={this.handleUnfavorite}/>
            <MainPage favorites={this.state.favorites} onFavorite={this.handleFavorite} onUnfavorite={this.handleUnfavorite} />
          </div>  
          
        </div>
        

      </div>
    );
  
  }  

}

export default App;
