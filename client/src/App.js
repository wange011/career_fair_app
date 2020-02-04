import React, { Component } from 'react';
import TaskBar from './components/login/TaskBar';
import MainPage from './components/MainPage';
import LoginPage from './components/login/LoginPage';
import { connect } from 'react-redux';
import { getCompanies } from './redux/actions';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

class App extends Component {

<<<<<<< HEAD
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

=======
  // If user is loggedIn and isAdmin, return AdminPage

  componentDidMount() {

    fetch("http://localhost:5000/companies", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( (response) => {
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("");
            }

        }).then( (returnedCompanies) => {

          var companies = [];

          for (let i = 0; i < returnedCompanies.length; i++) {

            let company = returnedCompanies[i];
            let dayNum = parseInt(company.day.charAt(4), 10);
        
            // Ensure that there are enough days added
            while(dayNum > companies.length) {
                companies.push([]);
            }
        
            companies[dayNum - 1].push(company);
        
          }

          this.props.getCompanies(companies);

        }).catch( (error) => {
        
        });
  }

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
>>>>>>> master

        </Router>
      </div>
    );

  }

}

<<<<<<< HEAD
export default App
=======
const mapStateToProps = (state) => {
  return {
      showLogin: state.showLogin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: (companies) => {
      dispatch(getCompanies(companies))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

>>>>>>> master
